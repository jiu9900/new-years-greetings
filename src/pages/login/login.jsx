import React,{ useState }from 'react';  
import axios from 'axios';
import { useLocation } from 'wouter';  
import Input from '../../components/input/input';
import './login.css'
import { setToken } from '../../utils/auth';

const Login = () => {  
  const [, setLocation] = useLocation();
  const [user, setUser] = useState('');  
  const [password, setPassword] = useState('');  
  const [submittedData, setSubmittedData] = useState(null); 
  const [error, setError] = useState('');

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
      onChange: (e) => setPassword(e.target.value)
    }]


  //方法 
  const login = (event) => {  //提交
    event.preventDefault(); 
    if(check())  {
        setSubmittedData({ user, password }); // 更新提交的数据  
        setUser(''); // 清空表单  
        setPassword('');
        upload()
    }
  }; 
  
  const upload = async () => {
    try {
      const response = await axios.post('url', submittedData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      setToken(response.data.token);
      console.log('Login successful');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        'Invalid email or password'
      );
      alert({error})
    }
  }

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
    setLocation('/')
  };  

  const forget = () => {//忘记密码

  }

  const register = () => {//注册

  }

  return (  
    <>
    <div className='login-background'>
        <div className='login-top'>
            <div onClick={handleBack} className='login-goback'>返回</div>
        </div>
        <div className='welcome'>
            <b>
                欢迎登录春节祝福小程序
            </b>
        </div>
        <div className='Rform'>
            <form>
                {inputList.map((item, index) => (
            <div key={index}>
              <Input
                className={item.className}
                placeholder={item.placeholder}
                type={item.type}
                value={item.value}
                onChange={item.onChange}
              />
            </div>
          ))}
          <div onClick={forget} className='forget' >忘记密码</div>
            <button onClick={login} className='login'>登录</button>
            <div><p className='text'>您还不是会员，请<div onClick={login-register} className='login-register'>注册</div></p></div>
            </form>
        </div>
    </div>
    </>
  );  
};  

export default Login;