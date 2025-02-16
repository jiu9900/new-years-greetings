import {useEffect} from 'react'
import './loading.css'
const Loading = ({loadS ,setLoadS ,loadingPage ,content}) => {

    useEffect(() => {  
        const handleReadyStateChange = () => {  
        if (document.readyState === 'complete') {  
            setTimeout(() => {
                document.getElementById('loading').style.transform = 'translateY(-100vh)'
                setLoadS(true)
            }, 1000);
            // 页面加载完成后的逻辑  
            console.log('页面加载完成！');  
        }  
        };  

        // 监听 readystatechange 事件  
        document.addEventListener('readystatechange', handleReadyStateChange);  

        return () => {  
        document.removeEventListener('readystatechange', handleReadyStateChange);  
        };  
    }, []);

    return (
        <div id='Ovo'>
            <div id='loading' style={{transform:(loadS ?'translateY(-100vh)':'translateY(0vh)')} }>{loadingPage}</div>
            <div className='bg' id='visible'>
              {content}
            </div>
        </div>
    )
}

export default Loading