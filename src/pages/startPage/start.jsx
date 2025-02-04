import React from "react";
import { useLocation } from "wouter";
import './start.css';

const Start = () => {
    const [, setLocation] = useLocation();

    const goToLogin = () => {
        setLocation("/login");
    };

    const goToRegister = () => {
        setLocation("/register");
    };
    return (
        <>
        <div className='bg'>
        <div className='happynewyear'>新年快乐</div>
        <div className='goToLogin' onClick={goToLogin}>
            登录
        </div>
        <div className='goToRegister' onClick={goToRegister}>
            注册
        </div>
        </div>
        </>
    )
}

export default Start