import { useState } from "react";
import './setMine.css'
import { useLocation } from "wouter";
import axios from "axios";
import { getToken } from "../../utils/auth";
const SetMine = () => {
    const [, setLocation] = useLocation();
    const [nickName,setNickname] = useState('')
    const [gender,setGender] = useState('')
    const [birthday ,setBirthday] = useState('')
    const [status,setStatus] = useState('')
    const [interest,setInterest] = useState('')

    
    const warn ={
        placeholder:'不符合规范，请重新填写',
        style:{
            borderColor: 'red',   
        }
    };
    
    var Data

    const setList = [{
       title:"昵称",
       value:nickName,
       placeholder:'Sduers',
       setValue:(e)=>{setNickname(e.target.value)}
    },{
       title:"性别",
       value:gender,
       placeholder:'男/女/未知...',
       setValue:(e)=>{setGender(e.target.value)}
    },{
       title:"生日",
       value:birthday,
       placeholder:'mm/dd',
       setValue:(e)=>{setBirthday(e.target.value)}
    },{
       title:"状态",
       value:status,
       placeholder:'饥饿中/睡觉ing.../困了',
       setValue:(e)=>{setStatus(e.target.value)}
    }]

    const pass = () => {
        setLocation('/startBlessing')
    }

    const update = () => {
        if(check()!==false){
            Data ={
            nickName:{nickName},
            birthday:formatAndValidateDate(birthday.toString()),
            interests:{interest},
            status:{status},
            gender:{gender}
            }
            console.log(Data)
            load()
        }else{
            setBirthday('')
            const item = document.getElementById('生日')
            item.placeholder=warn.placeholder
        }
    }

    const check = () => {
        console.log(formatAndValidateDate(birthday.toString()))
        return formatAndValidateDate(birthday.toString())
    }

    function formatAndValidateDate(input) {  
        const separatorIndex = input.indexOf('/');  
        if (separatorIndex === -1) {  
            return false;  
        }  
        const monthPart = input.slice(0, separatorIndex);  
        const dayPart = input.slice(separatorIndex + 1);  
        const month = parseInt(monthPart.replace(/\D/g, ""), 10);  
        const day = parseInt(dayPart.replace(/\D/g, ""), 10);  

        if (isNaN(month) || isNaN(day)) {  
            return false;  
        }  
        if (month < 1 || month > 12) {  
            return false;  
        }  
        const maxDays = getMaxDays(month);  
        if (day < 1 || day > maxDays) {  
            return false;  
        }  

        const formattedMonth = month.toString().padStart(2, "0");  
        const formattedDay = day.toString().padStart(2, "0");  

        return `${formattedMonth}/${formattedDay}`;  
    }  

     function getMaxDays(month) {  
        if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {  
            return 31;  
        } else if ([4, 6, 9, 11].includes(month)) {  
            return 30;  
        } else if (month === 2) {  
            return 28; // 忽略闰年  
        }  
        return 0; // 这种情况理论上不会发生，因为已经进行了月份有效性检查  
    }

    const load = async () =>{
        try{
            const token = getToken(); 
            const res = await axios.put('http://192.168.192.26:8080/profile',
            {Data},{
                    headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            pass()
            console.log(res)   
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
        <div className='set-background'>
            <div className="set-top">
                <div className="set-top1">注册</div>
                <div onClick={pass} className="set-top2">跳过</div>
            </div>
            <form className="setForm">
                {setList.map((item)=>{
                    return (
                    <div className="set-ctn" key={item.title}>
                        <div className="set-title">{item.title}</div>
                        <input
                        className="set-input"
                        placeholder={item.placeholder}
                        value={item.value}
                        onChange={item.setValue}
                        maxLength={item.title.toString()==="生日"?'5':null}
                        >
                        </input>
                    </div>)
                })}
                <div className='set-text'>
                    <div className="set-title">兴趣</div>
                    <textarea
                    placeholder="跑步/打篮球/阅读/看小说/追剧/追番/..."
                    value={interest}
                    onChange={(e)=>{setInterest(e.target.value)}}
                    className="myTextarea"  
                    rows="3" 
                    cols="26"></textarea>
                </div>
            </form>
            <div onClick={update} className="set-btn"></div>
        </div>
        </>
    );
}

export default SetMine