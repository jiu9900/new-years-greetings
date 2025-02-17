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
        setLocation('/showCase')
    }

    const update = () => {
        Data ={
            nickName:{nickName},
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