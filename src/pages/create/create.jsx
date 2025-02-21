import './create.css'
import { useLocation } from 'wouter';
import { useState } from 'react';
import Bless from '../../components/blessing/bless';

export default function create () {

  const [, setLocation] = useLocation();

  const [editing, setEditing] = useState(false);

  const [inputVal, setInputVal] = useState("");
  
  //返回
  function back () {
    if (editing) {
      setEditing(false);
    } else {
      setLocation('/startBlessing');
    }
  }

  //输入监听
  const handleChange = (e) => {
    const value = e.target.value;
    setInputVal(value);
  }

  return(
    <div className='create-center'>
      <div>
        <img src="/src/assets/create/Rectangle 6.png" alt="" />
        <div onClick={() => {back()}} className='create-back'></div>
      </div>
      <img style={{position:'absolute',
                   top: '38px'
                }} 
           src="/src/assets/create/创作中心.png"/>
      <div className='create-main'>
        <input className='create-text' type="text" value={inputVal} onChange={handleChange} disabled={!editing}/>
      </div>

      {!editing && 
      <div>
        <div style={{display: 'flex',
                     flexDirection: 'column'}}>
            <img style={{cursor: 'pointer'}} onClick={() => {setEditing(true)}} src="/src/assets/create/Rectangle 1 (2).png" alt="" />
            <img className='edit' style={{cursor: 'pointer'}} onClick={() => {setEditing(true)}} src="/src/assets/create/编辑.png" alt="" />
        </div>
        <div style={{marginTop: '-40px'}}>
            <img src="/src/assets/create/Rectangle 1 (2).png" alt="" />
            <div className='store' onClick={() => {Bless({inputVal})}}>放入橱窗</div>
        </div>
      </div>}
      {editing &&
      <div style={{marginTop: '30px'}}>
        <img src="/src/assets/create/Rectangle 1 (2).png" alt="" />
        <div onClick={() => {setEditing(false)}} className='store'>保存</div>
      </div>}
    </div>
  );
}