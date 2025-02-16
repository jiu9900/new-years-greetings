import { useState } from 'react';
import { useLocation } from 'wouter';
import MyInput from '../../components/input/input';
import './register.css'
import axios from 'axios';
const Register = () => {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [inputStyle, setInputStyle] = useState({
    warn: false,
    placeholder: '确认密码'
  });

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
    },
    {
      warn: inputStyle.warn,
      placeholder: inputStyle.placeholder,
      type: 'password',
      value: password2,
      onChange: (e) => setPassword2(e.target.value)
    }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    if (check()) {
      upload();    
    }
  };

  const upload = async () => {  
    try {  
      const response = await axios.post('http://192.168.192.26:8080/register', {
        username:user.toString(),
        password:password.toString()
      });
      setUser('');
      setPassword('');
      setPassword2('');
      setLocation('/login');
    } catch (error) {  
      console.error(error);  
    }  
  }; 
  const check = () => {
    if (user === '') {
      alert('账户不能为空');
      return false;
    } else if (password === '') {
      alert('密码不能为空');
      return false;
    }
    if (password === password2) {
      return true;
    } else {
        inputList[2].warn=true
        setInputStyle({
        warn: true,
        placeholder: '请确保与密码一致'
      });
      setPassword2('');
    }
    return false;
  };

  const handleBack = () => {
    setLocation('/')
  };

  const login = () => {
    setLocation('/login')
  };

  return (  
    <>
    <div className='background'>
        <div className='register-top'>
            <div onClick={handleBack} className='register-goback'></div>
        </div>
        <div>
            <form className='reg-form'>
             {inputList.map((item, index) => (
            <div key={index}>
              <MyInput
                className={item.className}
                placeholder={item.placeholder}
                type={item.type}
                value={item.value}
                onChange={item.onChange}
              />
            </div>
          ))}
            <div onClick={handleSubmit} type="submit" className='register'></div>  
            <div className='gotoLogin'><div className='have'>已有账号，去</div><div className='goL' onClick={login}>登录</div></div>
            </form>
        </div>
    </div>
    </>
    
  );  
};  

export default Register;