import { useLocation } from 'wouter';
import { useEffect, useState ,useContext} from 'react';
import axios from 'axios'
import { UserContext } from '../../utils/userContext';
import { getToken } from '../../utils/auth';
import './Showcase.css';
import Bless from '../../components/blessing/bless';

export default function Showcase() {

  const { userData ,setUserData} = useContext(UserContext)

  const [, setLocation] = useLocation();

  const gotocreate = () => {
    setLocation('/create');
  };

  const [isScrolling, setIsScrolling] = useState(false);

  const [ sent ,setSent ] = useState([{
    id:1,
    content:"快来创作吧"
  }])

  const [ receive ,setReceive ] = useState([])

  const notSelectedStyle = {  
    width: '50%',  
    color: '#f4c884',  
    background: 'rgba(128, 16, 12, 0.7)',  
  };  

  const selectedStyle = {  
    boxSizing: 'border-box',  
    width: '30%',  
    color: 'rgb(128, 16, 12)',  
    borderBottom: '10px solid rgba(128,16,12,0.7)',  
    margin: '10px 10% 0 10%',  
  };

  //弹窗控制
  const [isPosting, setIsPosting] = useState(false);

  const [posted, setPosted]=useState(false);

  //创作 or 送的
  const [section, setSection]= useState(1);

  //当前祝福
  const [current, setCurrent] = useState(1);
  
  //
  const [imputVal, setInputVal] = useState('');

  //祝福内容
  let items ;

  const token = getToken()

  useEffect(()=>{
    try{
      const res = axios.get('/blessings/sent',{
        headers :{
          'Authorization': `Bearer ${token}`
        }
      })

      setUserData({
        ...userData,
        sent:res.data.sent_blessings
      })

      setSent(res.data.sent_blessings)

    }catch(err){
      console.log(err)
    }

    try{
      const res = axios.get('/blessings/received',{
        headers :{
          'Authorization': `Bearer ${token}`
        }
      })

      setUserData({
        ...userData,
        receive:res.data.received_blessings
      })

      setReceive(res.data.received_blessings)

    }catch(err){
      console.log(err)
    }

  },[token])

  // console.log(current);
  
  //送出我的祝福

  function postBless() {
    setPosted(true);
  }

  if (section===1) {
    items=sent;
  } else {
    items=receive;
  }

  const postUrl=<input className='Myurl' 
                       onChange={(e) => setInputVal(e.target.value)} 
                       value={`http://localhost:5174/get?blessId=${(items[current-1])?.id}`}/>;


  //切换
  function changeSection(i) {
    setSection(i);
    setCurrent(1);
  }

  //返回按钮
  function back() {
    setLocation('/startBlessing');
  }

  //滚动事件
  function scroll(direction) {

    if(isScrolling) return;
    setIsScrolling(true);

    const container = document.querySelector('.scrollable-content');
    const itemWidth = container.children[0].clientWidth;
    const scrollAmount = direction * itemWidth *1;
    container.scrollLeft += scrollAmount;

    if (current+direction>=1 && current+direction<=items.length) {
      setCurrent(current+direction);
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 500);

    
  }

  //弹窗
  

  return (
    <div className="container">
      <div className="back-button" onClick={() => back()}></div>
      <div className="create-button" onClick={gotocreate}>+</div>

      <div className="middle-box">
        {/* 头部 */}
        <img className='top-section' src="/src/assets/showCase/MyShowcase/Group 6.png" alt="" />
        {/* 中间 */}
        <div className='middle-section'>
          <div className='section1' style={section===1?selectedStyle:notSelectedStyle} onClick={ () => { changeSection(1) }}>我的创作</div>
          <div className='section2' style={section===2?selectedStyle:notSelectedStyle} onClick={ () => { changeSection(2) }}>收到的祝福</div>
        </div>
        {/* 下面 */}
        <div className="bottom-section">
          {/* 视口 */}
          <div className="scrollable-container">
            {section===1 &&
            <Inner items={items} section={section} setNum={setCurrent}></Inner>}
            {section===2 &&
            <Inner items={items} setNum={setCurrent}></Inner>}


            {/* 框架
            <div className="scrollable-content">
              祝福
              {items.map((item, index) => (
                <div className="scrollable-item" key={index}>
                  {item}
                </div>
              ))}
            </div> */}
            {/* 左按钮 */}
            <button className="scroll-button left" onClick={() => scroll(-1)}>
              
            </button>
            {/* 右按钮 */}
            <button className="scroll-button right" onClick={() => scroll(1)}></button>
          </div>
        </div>
      </div>
      {/* 尾部 */}
      <div className="buttons">
      {/* 送祝福按钮 */}
        { section===1 &&
        <img className='share' onClick={() => setIsPosting(true)} src="/src/assets/showCase/Receive/Group 1.png" alt="" />
        }
      </div>
      {/* 弹窗 */}
      {isPosting && 
      <div className='overlay'>
        <div className='jump'>
          <img className='pop-up' src="/src/assets/showCase/Share/Group 19.png" alt="" />
          <div className='clear' onScroll={() => {setIsPosting(false)}} onClick={ () => {setIsPosting(false)}}></div>
          <div className='chart' onClick={() => {alert("还是生成链接吧！")}}></div>
          <div className='link' onClick={() => {postBless()}} type="submit"></div>
        </div>
          
      </div>
      }
      {posted && 
      <div className='blessUrl'>
        <button className='cleared' onClick={ () => {setPosted(false)}}>X</button>
        <div className='success'>祝福已经打包好，快分享给朋友看看吧！</div>
        {postUrl}
        </div>
      }
    </div>
  );
}

function Inner({items, setNum}) {
  
  return (
    <div className="scrollable-content">
              {/* 祝福 */}
              {items.map((item, index) => (
                <div className="scrollable-item" key={index}>
                  <Bless key={index} 
                  content={item?.content}
                  ></Bless>
                </div>
              ))}
            </div>
  );
}