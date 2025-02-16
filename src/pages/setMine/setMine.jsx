import { useState } from "react";
import './setMine.css'
import { useLocation } from "wouter";
import { ChevronLeft } from 'lucide-react';
import axios from "axios";
import { getToken } from "../../utils/auth";
const SetMine = () => {
    const [, setLocation] = useLocation();
    const [birthday ,setBirthday] = useState('')
    const [interest,setInterest] = useState('')
    const [status,setStatus] = useState('')
    const [gender,setGender] = useState('')

    var Data

    const pass = () => {
        setLocation('/')
    }

    const update = () => {
        Data ={
            birthday:{birthday},
            interests:{interest},
            status:{status},
            gender:{gender}
        }
        console.log(Data)
        load()
    }

    const load = async () =>{
        try{
            const res = await axios.put('http://192.168.192.26:8080/profile',{Data})
            console.log(res.msg)   
        }catch(error){
            console.log(error)
        }
    }

    return (
        <>
        <div className='set-bg'>
            <div className="set-fill">
                让我们来填写你的资料卡
            </div>
            <form className="setForm">
                <div className='setGender' value={gender} onChange={(e)=>{setGender(e.target.value)}}>
                    性别：
                    <label><input type='radio' name='gender' value='male'></input>男</label>
                    <label><input type='radio' name='gender' value='female'></input>女</label>
                </div>
               <div className='set-text1'>
                    <div>生日</div>
                    <input value={birthday} onChange={(e)=>{setBirthday(e.target.value)}} className="myTextarea">
                    </input>
                </div>
                <div className='set-text1'>
                    <div>兴趣</div>
                    <input value={interest} onChange={(e)=>{setInterest(e.target.value)}} className="myTextarea">
                    </input>
                </div>
                 <div className='set-text2'>
                    <div>状态</div>
                    <textarea value={status} onChange={(e)=>{setStatus(e.target.value)}} className="myTextarea"  rows="2" cols="23"></textarea>
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

    const [nickName,setNickname] = useState('')
    const [,setLocation] = useLocation()


    const comfirm = () => {
        if(check){
            upload()
        }
    }

    const upload = async () =>{
        try{
            const token = getToken();  
            const res = await axios.put('http://192.168.192.26:8080/profile',{
                nickName:{nickName}},{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(res)
            setLocation('/set/info')
        }catch{
            alert('重新输入')
        }
    }
    const check = () => {
        if(nickName===''){
            alert('昵称不能为空')
        }
        return true
    }

    return (
    <>
    <div className='set-Nbg'>
        <ChevronLeft className='set-goback'></ChevronLeft>
        <div className='set-N'>输入一个昵称<br></br>供好友查看</div>
        <input 
            value={nickName} 
            onChange={(e)=>{
                e.preventDefault() 
                setNickname(e.target.value)}}
            placeholder='输入昵称'
            type="text" 
            className='set-input'/>
        <div className='set-warn'>冒犯他人的昵称将会被停用</div>
        <button onClick={comfirm} className='set-b'>确认</button>
    </div>
    </>)
}

export {SetNickname}