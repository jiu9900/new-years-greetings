import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import './startBlessing.css';
import { UserContext } from "../../utils/userContext";
import Loading from '/src/components/loading/loading'; // 引入 Loading 组件

const UserProfile = () => {
  const { setData, setUserData } = useContext(UserContext);
  const [, setLocation] = useLocation();
  const [avatarPreview, setAvatarPreview] = useState(setData?.avatar || '/src/assets/startBlessing/Ellipse 1.png');
  const [isLoading, setIsLoading] = useState(true); // 加载状态

  // 模拟加载过程
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // 2秒后加载完成
    }, 2000);
    return () => clearTimeout(timer); // 清除定时器
  }, []);

  const goBack = () => {
    setLocation('/start');
  };

  const goToEdit = () => {
    setLocation('/set');
  };

  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const size = Math.min(img.width, img.height);
            canvas.width = canvas.height = size;
            ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
            const croppedImage = canvas.toDataURL();
            setAvatarPreview(croppedImage);
            setUserData({ ...setData, avatar: croppedImage });
          };
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <>
      {/* 添加 Loading 组件 */}
      <Loading
        loadS={!isLoading} // 加载完成后隐藏 Loading
        setLoadS={setIsLoading}
        loadingPage={<div>加载中...</div>} // 自定义加载内容
        content={
          <div className="user-profile">
            <div className="header">
              <div onClick={goBack} className="back-btn"></div>
              <h1 className="title">个人中心</h1>
              <div onClick={goToEdit} className="edit-btn"></div>
            </div>

            <div className="avatar" onClick={handleAvatarClick}>
              <img src={avatarPreview} alt="Avatar" />
            </div>
            <h2 className="nickname">{setData?.nickname || '暂无昵称'}</h2>

            <div className="profile-info">
              <div className="info">
                <p><strong>年龄:</strong> {setData?.setData.age || '未知'}</p>
                <p><strong>生日:</strong> {setData?.setData.birthday || 'mm/dd'}</p>
                <p><strong>性别:</strong> {setData?.setData.gender || '未知'}</p>
                <p><strong>兴趣:</strong> {setData?.setData.interests || '未知'}</p>
                <p><strong>状态:</strong> {setData?.setData.status || '未知'}</p>
              </div>
            </div>

            <div className="buttons">
              <button className="my-profile-btn" onClick={() => { setLocation('/showCase') }}></button>
              <button className="create-profile-btn" onClick={() => { setLocation('/create') }}></button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default UserProfile;