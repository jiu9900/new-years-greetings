import React,{ useContext } from "react";
import { useLocation } from "wouter";
import './start.css';
import { UserContext } from "../../utils/userContext";
import Loading from "../../components/loading/loading";
const Start = () => {
    const [, setLocation] = useLocation();
    const { loadS , setLoadS } = useContext(UserContext)

    const goToLogin = () => {
        setLocation("/login");
    };

    const goToRegister = () => {
        setLocation("/register");
    };
    return (
        <>

        <Loading
        loadS={loadS}
        setLoadS={setLoadS}
        loadingPage={<>loading</>}
        content={<>
        <div className='happynewyear'>新年快乐</div>
                <div className='goToLogin' onClick={goToLogin}>
                登录
                </div>
                <div className='goToRegister' onClick={goToRegister}>
                注册
                </div>
        </>}
        >
        </Loading>
        </>
    )
}

export default Start