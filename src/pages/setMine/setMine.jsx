import React,{ useState } from "react";
import './setMine.css'
import { useLocation } from "wouter";
import BirthdaySelector from "../../components/birthdayPicker/BrthdaySelector";
import { Modal } from "antd";

const SetMine = () => {
    const [, setLocation] = useLocation();
    const [birthday ,setBirthday] = useState({})

    const [visiable ,setVisiable] = useState(false)

    const [birth ,setBirth] = useState('')
    const [age,setAge] = useState('')
    const [interest,setInterest] = useState('')
    const [status,setStatus] = useState('')
    const [gender,setGender] = useState('')

    const setList =[
        // {
        //     content:'生日',
        //     value:birth,
        //     event:(e) => setBirth(e.target.value)
        // },{
        //     content:'年龄',
        //     value:age,
        //     event:(e) => setAge(e.target.value)
        // },
        {
            content:'兴趣',
            value:interest,
            event:(e) => setInterest(e.target.value)
        },{
            content:'状态',
            value:status,
            event:(e) => setStatus(e.target.value)
        },
    ]

    const pass = () => {
        setLocation('/')
    }

    const update = () => {
        const Data ={
            age:{age},
            birthday:{birth},
            interests:{interest},
            status:{status}
        }

    }

    const onOk = () => {
        closeModal();
    };
 
    const closeModal = () => {
        setVisiable(false);
    };

    const calculateAge = (birthDate) => {  
        const today = new Date();  
        const birth = new Date(birthDate);  
        let age = today.getFullYear() - birth.getFullYear();  
        const monthDifference = today.getMonth() - birth.getMonth();  

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {  
            age--;  
        }  

        return age;  
    }  

    const open = () => {
        setVisiable(true)
    }

    return (
        <>
        <div className='set-bg'>
            <Modal
                title="选择你的生日"
                open={visiable}
                onOk={onOk}
                onCancel={closeModal}
                afterClose={closeModal}
            >
                <div className="bir-container">
                    <BirthdaySelector 
                    value={birthday}
                    setValue={setBirthday}
                    ></BirthdaySelector>
                </div>
            </Modal>
            <div className="set-fill">
                让我们来填写你的资料卡
            </div>
            <form className="setForm">
                <div className='setGender' value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                    性别：
                    <label><input type='radio' name='gender' value='男'></input>男</label>
                    <label><input type='radio' name='gender' value='女'></input>女</label>
                </div>
                <div className="bir" onClick={open}>
                    年龄：{' '} {typeof(birthday.month) == "undefined" ? '未知(点击设置年龄与生日)':calculateAge(birthday.year+'-'+birthday.month+'-'+birthday.day)}
                </div>
                <div className="bir" onClick={open}>
                    生日：{'        '} {typeof(birthday.month) == "undefined" ? '未知(点击设置年龄与生日)': birthday.month+'-'+birthday.day}
                </div>
                <div className='set-text1'>
                    <div>兴趣</div>
                    <textarea value={interest} onChange={(e)=>{setInterest(e.target.value)}} id="myTextarea"  rows="2" cols="23">
                    </textarea>
                </div>
                 <div className='set-text2'>
                    <div>状态</div>
                    <textarea value={status} onChange={(e)=>{setStatus(e.target.value)}} id="myTextarea"  rows="2" cols="23"></textarea>
                </div>
                <button onClick={update} className='set-b'>添加</button>
                <button onClick={pass} className='set-b'>跳过</button> 
            </form>
        </div>
        </>
    );
}

export default SetMine


const SetNickname = () => {

    const [nickName,SetNickname] = useState('')
    const [,setLocation] = useLocation()


    const comfirm = () => {
        if(check){
            setLocation('/set/info')
        }
    }

    const check = () => {
        return true
    }

    return (
    <>
    <div className='set-Nbg'>
        <div className='set-goback'>返回</div>
        <div className='set-N'>输入一个昵称<br></br>供好友查看</div>
        <input value={nickName} onChange={(e)=>{SetNickname(e.target.value)}} placeholder='输入昵称' type="text" className='set-input'/>
        <div className='set-warn'>冒犯他人的昵称将会被停用</div>
        <button onClick={comfirm} className='set-b'>确认</button>
    </div>
    </>)
}

export {SetNickname}