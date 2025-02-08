import React,{ useEffect ,useContext } from "react";
import { useLocation } from "wouter";
import './start.css';
import { UserContext } from "../../utils/userContext";
const Start = () => {
    const [, setLocation] = useLocation();
    const { loadS , setLoadS } = useContext(UserContext)

    useEffect(() => {  
    const handleReadyStateChange = () => {  
      if (document.readyState === 'complete') {  
        setTimeout(() => {
            document.getElementById('loading').style.transform = 'translateY(-100vh)'
            setLoadS(true)
        }, 1000);
        // 页面加载完成后的逻辑  
        console.log('页面加载完成！');  
      }  
    };  

    // 监听 readystatechange 事件  
    document.addEventListener('readystatechange', handleReadyStateChange);  

    return () => {  
      document.removeEventListener('readystatechange', handleReadyStateChange);  
    };  
    }, []);

    const goToLogin = () => {
        setLocation("/login");
    };

    const goToRegister = () => {
        setLocation("/register");
    };
    return (
        <>
        <div id='Ovo'>
            <div id='loading' style={{transform:(loadS ?'translateY(-100vh)':'translateY(0vh)')} }>loading</div>
            <div className='bg' id='visible'>
                <div className='happynewyear'>新年快乐</div>
                <div className='goToLogin' onClick={goToLogin}>
                登录
                </div>
                <div className='goToRegister' onClick={goToRegister}>
                注册
                </div>
            </div>
        </div>
        </>
    )
}

export default Start