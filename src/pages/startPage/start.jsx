import { useContext } from "react";
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
        loadingPage={<></>}
        content={<>
            <div className='happynewyear'></div>
            <div className='goToLogin' onClick={goToLogin}></div>
            <div className='goToRegister' onClick={goToRegister}></div>
        </>}
        >
        </Loading>
        </>
    )
}

export default Start