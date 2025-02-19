// import { useState } from 'react'
// import Blessing from './Blessing.jsx'
// import './App.css'
// import Mainbless from './Mainbless.jsx'

// export default function App() {
//   const [tick, setTick]= useState(0);
//   const [choice, setChoice]= useState(false);
//   console.log(tick);
  
//   function postBless() {
//     if ( tick!==0 ) {
      
//       alert("送出祝福成功！")
//       setChoice(false);
//     } else {
//       alert("你还没有选择祝福哦！");
//     }
//   }
  
//   function back() {
//     //...
//   }
//   return (
//     <div className="container">
      
//       <div className="back-button" onClick={()=>{back()}}>{"<"}</div>
      
//       <div className="middle-box">
//         <div className="top-section">我的橱窗</div>
//         <div className="bottom-section">
//           here
//           <Mainbless/>
//         </div>
//       </div>


//       <div className="buttons">
//         <button className="button" onClick={()=>{choice?postBless():setChoice(true)}}>去送出</button>
//       </div>
//     </div>
//   );
// }


import { useState } from 'react';
import axios from 'axios'
import './Showcase.css';


export default function Showcase() {

  const [isScrolling, setIsScrolling] = useState(false);

  //弹窗控制
  const [isPosting, setIsPosting] = useState(false);

  //创作 or 送的
  const [section, setSection]= useState(1);

  //当前祝福
  const [current, setCurrent] = useState(1);

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
  
  //祝福内容
  let items ;

  console.log(current);
  
  //送出我的祝福


  //没写完
  function postBless() {
    const res = async () => {
      try {
        const result = await axios.post('', )
      } catch(err) {
        console.log(err)
      }
    }
    setIsPosting(true);
  }

  if (section===1) {
    items= [
      1,
      2,
      3,
      4,
      5
    ];
  } else {
    items= [
      6,7,8,9,10,11
    ];
  }

  //切换
  function changeSection(i) {
    setSection(i);
    setCurrent(1);
  }

  //返回按钮
  function back() {
    window.history.back();
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
      <div className='createBless'>+</div>

      <div className="middle-box">
        {/* 头部 */}
        <div className="top-section"></div>
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
              &lt;
            </button>
            {/* 右按钮 */}
            <button className="scroll-button right" onClick={() => scroll(1)}>
              &gt;
            </button>
          </div>
        </div>
      </div>
      {/* 尾部 */}
      <div className="buttons">
      {/* 送祝福按钮 */}
        { section===1 &&
        <img className='share' onClick={() => postBless()} src="/resources/receive/Group 1.png" alt="" />
        }
      </div>
      {/* 弹窗 */}
      {isPosting && 
        <div className='overlay'>
          <div className='blessUrl'>
          <button className='clear' onClick={ () => {setIsPosting(false)}}>X</button>
          <div className='success'>祝福已经打包好，快分享给朋友看看吧！</div>
          <div className='Myurl'>url{current}</div>
          </div>
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
                  {item}
                </div>
              ))}
            </div>
  );
}