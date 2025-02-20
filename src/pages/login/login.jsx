import { useState ,useContext ,useEffect ,useCallback}from 'react';  
import axios from 'axios';
import { useLocation } from 'wouter';  
import './login.css'
import { setToken } from '../../utils/auth';
import { UserContext } from '../../utils/userContext';
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {  

  const{ userData ,setUserData , setLoadS } = useContext(UserContext)

  const [, setLocation] = useLocation();
  const [user, setUser] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');
  const [isError ,setIsError] = useState(false);

  const inputList = [
    {
      placeholder: '账户...',
      value: user,
      type: 'text',
      onChange: (e) => setUser(e.target.value)
    },
    {
      placeholder: '密码...',
      type: 'password',
      value: password,
      className:'pas',
      onChange: (e) => setPassword(e.target.value)
    }]

  //方法 
  const login = (event) => {  //提交
    event.preventDefault(); 
    if(check()){
      upload()
    }
  }; 
  

  // 在登录页面处理完成后的代码  
  const handleLoginSuccess = () => {  
      const params = new URLSearchParams(window.location.search);  
      const returnUrl = params.get('returnUrl');  
      if (returnUrl) {  
          window.location.href = decodeURIComponent(returnUrl);  
      } else {  
          // 默认跳转到主页或其他页面  
          setLocation('/startBlessing');  
      }  
  } 

  const upload = async () => {
    try {
      toast.loading('我知道你很急但你先别急∠( ᐛ 」∠)_',{
        position:'top-center'
      })
      const response = await axios.post('http://192.168.192.26:8080/login', {
        username:user.toString(),
        password:password.toString()
      });
      setUser('');  
      setPassword('');
      setToken(response.data.token);
      setUserData(response.data.user);
      handleLoginSuccess()
      console.log(response)
      console.log('Login successful');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Invalid email or password'
      );
      setIsError(true)
    } finally{
      toast.dismiss()
      if(isError){
        toast.error(`失败了捏 ${' '}≡ᕕ( ᐛ )ᕗ`,{
          position:'top-center',
          hideProgressBar:true
        })
      }
    }
  }

const getSetData = useCallback(async () => {  
  try {  
    if (userData && userData.id) {  // 添加空值检查  
      const res = await axios.get('http://192.168.192.26:8080//profile', {  
        userID: userData.id  
      });  
      setUserData({  
        ...userData,  
        setData: res.data  
      });  
    }  
  } catch (err) {  
    console.error(err);  
  }  
}, [userData?.id]); // 将依赖数组修改为`userData?.id`

useEffect(() => {  
  getSetData(); // 在 useEffect 中调用  
}, [getSetData]); // 将 getSetData 添加到依赖数组

  const check = () => {
    if(user===''){
        alert('账户不能为空')
        return false
    }else if(password===''){
        alert('密码不能为空')
        return false
    }
    return true
  }

  const handleBack = () => {  //返回
    setLoadS(true)
    setLocation('/')
  };  

  const forget = () => {//忘记密码

  }

  const register = () => {//注册
    setLocation('/register')
  }

  return (  
    <>
    <div className='login-background' id='visible'>
        <div className='login-top'>
          <div onClick={handleBack} className='login-goback'></div>
        </div>
        <div className='Rform'>
            <form>
                {inputList.map((item, index) => (
            <div key={index}>
              <input
              className={'input'+index}
                placeholder={item.placeholder}
                type={item.type}
                value={item.value}
                onChange={item.onChange}
                required
               />
            </div>
          ))}
            <div onClick={forget} className='forget' >忘记密码 ？</div>
            <button onClick={login} className='login'>登 录</button>
            <div className='loginTurn'><p className='text'>还没有账号 ？ </p><p onClick={register} className='login-register'>立即注册</p></div>
            </form>
        </div>
        <ToastContainer></ToastContainer>
    </div>
    </>
  );  
};  

export default Login;