import React, { useState, useEffect } from 'react';  
import { Calendar } from 'lucide-react';  
import './BrthdaySelector.css';  

const BirthdaySelector = ({ value, setValue }) => {  
  const currentYear = new Date().getFullYear();  
  const [selection, setSelection] = useState({  
    year: currentYear - 20,  
    month: 1,  
    day: 1  
  });  
  const [daysInMonth, setDaysInMonth] = useState(31);  

  // 生成选择选项的数组  
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);  
  const months = Array.from({ length: 12 }, (_, i) => i + 1);  

  useEffect(() => {  
    const days = new Date(selection.year, selection.month, 0).getDate();  
    setDaysInMonth(days);  
    if (selection.day > days) {  
      setSelection(prev => ({ ...prev, day: days }));  
    }  

    // 将选择的日期传递给外部组件  
    setValue(selection);  
  }, [selection.year, selection.month, selection.day, setValue]); // 添加 selection.day 和 setValue 作为依赖项  

  const handleChange = (field, value) => {  
    setSelection(prev => ({ ...prev, [field]: value }));  
  };  

  const getMonthName = (month) => {  
    return new Date(2000, month - 1, 1).toLocaleString('default', { month: 'long' });  
  };  

  return (  
    <div className="birthday-container">  
      <div className="form-container">  
        <div className="form-group">  
          <label className="form-label">年</label>  
          <select  
            value={selection.year}  
            onChange={(e) => handleChange('year', parseInt(e.target.value))}  
            className="form-select"  
          >  
            {years.map(year => (  
              <option key={year} value={year}>{year}</option>  
            ))}  
          </select>  
        </div>  

        <div className="form-group">  
          <label className="form-label">月</label>  
          <select  
            value={selection.month}  
            onChange={(e) => handleChange('month', parseInt(e.target.value))}  
            className="form-select"  
          >  
            {months.map(month => (  
              <option key={month} value={month}>{getMonthName(month)}</option>  
            ))}  
          </select>  
        </div>  

        <div className="form-group">  
          <label className="form-label">日</label>  
          <select  
            value={selection.day}  
            onChange={(e) => handleChange('day', parseInt(e.target.value))}  
            className="form-select"  
          >  
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (  
              <option key={day} value={day}>{day}</option>  
            ))}  
          </select>  
        </div>  

        <div className="result-display">  
          <p className="result-text">  
            你的生日: {selection.year}-{selection.month}-{selection.day} 
          </p>  
        </div>  
      </div>  
    </div>  
  );  
}  

export default BirthdaySelector;