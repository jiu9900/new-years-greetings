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

    useEffect
    return (<>
    请先登录
    <div>
        <button onClick={()=>setLocation('/login')}>去登录</button>
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
    你的朋友给你送来祝福喽！
    <div>
        <button onClick={receive()}> 接收祝福并查看</button>
    </div>
    </>)
}