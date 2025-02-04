import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Input from '../../components/input/input';
import './register.css'
const Register = () => {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [submittedData, setSubmittedData] = useState(null);
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
      setSubmittedData({ user, password });
      alert('注册成功！');
      setUser('');
      setPassword('');
      setPassword2('');
      upload();
    }
  };

  const upload = () => {
    // Handle data submission here
    console.log('Submitted data:', submittedData);
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
  };

  return (  
    <>
    <div className='background'>
        <div className='register-top'>
            <div onClick={handleBack} className='register-goback'>返回</div>
            <div onClick={login} className='register-login'>登录</div>
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
            
            <button onClick={handleSubmit} type="submit" className='register'>注册</button>  
            </form>
        </div>
    </div>
    </>
    
  );  
};  

export default Register;