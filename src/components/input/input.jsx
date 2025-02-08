import React from 'react';
import './input.css';

const MyInput = ({ placeholder, className, value, onChange , type ,warn }) => {
    if(warn===undefined){
        warn=false
    }
  if(warn){
    return (  
    <input
      className='warn'
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      required
    />
    );
  }
  return (
    <input
      className='input'
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default MyInput;