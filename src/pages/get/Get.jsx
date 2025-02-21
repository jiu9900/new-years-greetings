import './Get.css'
import { useContext, useEffect } from 'react';
import { UserContext } from '../../utils/userContext';
import { useLocation } from "wouter";
import { getToken } from "../../utils/auth";

import axios from 'axios';


export default function Get () {
    const resource = new URLSearchParams(window.location.search);
    const blessId = resource.get('blessId');
    console.log(blessId);
    
    const { userData } = useContext(UserContext)
    
    if(userData){
        return <GoReceive 
        blessId={blessId}
        />  
    }else{
        return <GoLogin />  
    }
}

const GoLogin = () =>{

    const [, setLocation] = useLocation();

    useEffect(() => {  
        const currentUrl = window.location.href; // 获取当前页面URL  
    }, []);  

    return (<>
    <div className='get-bg'>
        <div className='get-container'>
            <div className='getTitle'>请先登录</div>
            <div className='get-btn' onClick={()=>setLocation('/login')}>去登录</div>
        </div>
    </div>
    </>)
}

const GoReceive = ({blessId}) => {

    var blessData;

    const receive = async() => {
        try {
            const token = getToken(); 
            const res = await axios.get('/blessings/get',{
                id:blessId
            },{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            blessData = res.data
            console.log(blessData)
        }catch(err){
            console.log(err)
        }
    }

    return (<>
    <div className='get-gb'>
        <div className='get-container'>
            <div className='getTitle'>你的朋友给你送来祝福喽！</div>
            <div className='get-btn' onClick={receive()}> 接收祝福并查看</div>
        </div>
    </div>
    </>)
}