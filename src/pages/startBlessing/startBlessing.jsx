import React, { useContext } from 'react';
import { useLocation } from 'wouter';
import './startBlessing.css';
import { UserContext } from "../../utils/userContext";

const UserProfile = () => {
  const { userData } = useContext(UserContext);
  const [, setLocation] = useLocation();

  const goBack = () => {
    setLocation('/start');
  };

  const goToEdit = () => {
    setLocation('/setMine');
  };

  return (
    <div className="user-profile">
      <div className="header">
        <div onClick={goBack} className="back-btn"></div>
        <h1 className="title">个人中心</h1>
        <div onClick={goToEdit} className="edit-btn"></div>
      </div>

      <div className="avatar">
        <img src={userData?.avatar || '/src/assets/startBlessing/Ellipse 1.png'} alt="Avatar" />
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
        <button className="my-profile-btn"></button>
        <button className="create-profile-btn"></button>
      </div>
    </div>
  );
};

export default UserProfile;
