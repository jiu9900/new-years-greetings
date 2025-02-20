import React, { useContext ,useState } from 'react';
import { useLocation } from 'wouter';
import './startBlessing.css';
import { UserContext } from "../../utils/userContext";

const UserProfile = () => {
  const { userData ,setUserData } = useContext(UserContext);
  const [, setLocation] = useLocation();
  const [avatarPreview, setAvatarPreview] = useState(userData?.avatar || '/src/assets/startBlessing/Ellipse 1.png');

  const goBack = () => {
    setLocation('/');
  };

  const goToEdit = () => {
    setLocation('/setMine');
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
          // 自动裁剪图片为正方形（不拉伸）
          const img = new Image();
          img.src = reader.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const size = Math.min(img.width, img.height); // 取最小边长
            canvas.width = canvas.height = size;
            ctx.drawImage(img, (img.width - size) / 2, (img.height - size) / 2, size, size, 0, 0, size, size);
            const croppedImage = canvas.toDataURL();
            setAvatarPreview(croppedImage); // 更新头像预览
            setUserData({ ...userData, avatar: croppedImage }); // 更新用户数据
          };
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="user-profile">
      <div className="header">
        <div onClick={goBack} className="back-btn"></div>
        <h1 className="title">个人中心</h1>
        <div onClick={goToEdit} className="edit-btn"></div>
      </div>

      <div className="avatar" onClick={handleAvatarClick}>
        <img src={avatarPreview} alt="Avatar" />
      </div>
      <h2 className="nickname">{userData?.nickname || '暂无昵称'}</h2>

      <div className="profile-info">
        <div className="info">
          <p><strong>年龄:</strong> {userData?.age || '未知'}</p>
          <p><strong>生日:</strong> {userData?.birthday || 'mm/dd'}</p>
          <p><strong>性别:</strong> {userData?.gender || '未知'}</p>
          <p><strong>兴趣:</strong> {userData?.interests || '未知'}</p>
          <p><strong>状态:</strong> {userData?.status || '未知'}</p>
        </div>
      </div>

      <div className="buttons">
        <button className="my-profile-btn" onClick={()=>{setLocation('/showCase')}}></button>
        <button className="create-profile-btn" onClick={() => {setLocation('/create')}}></button>
      </div>
    </div>
  );
};

export default UserProfile;
