# 春节祝福程序

------

## 项目简介

本项目是一个基于 **React + Wouter** 构建的移动端社交应用，用户可以**创建、管理和分享春节祝福**，支持 **用户登录、个人中心、祝福发送、祝福展示、祝福分享** 等功能。

------

## 技术栈

- **前端框架**：React、Wouter（路由）
- **状态管理**：React Context API
- **HTTP 请求**：Axios
- **图片处理**：ReactCrop（头像裁剪）
- **UI 组件**：Radix UI（弹窗）、Lucide-React（图标）

------

## 核心功能

### 1. 用户系统

- **用户中心**：支持用户**编辑昵称、生日、性别、兴趣、状态**等信息。
- **头像裁剪**：使用 `ReactCrop` 进行头像上传与裁剪。
- **用户登录**：通过 `UID` 认证，获取 `token` 进行身份验证。

### 2. 祝福管理

- **创建祝福**：用户可撰写祝福内容，并生成分享链接。
- **祝福展示**：分为**我的创作**和**收到的祝福**，支持滚动浏览。
- **祝福分享**：可生成专属链接或以图片形式分享给好友。

### 3. 交互体验

- **Loading 组件**：在页面加载完成后平滑进入主界面。
- **弹窗交互**：支持 Radix UI 弹窗，提升用户体验。

------

## 项目运行

1. 克隆项目

   ```
   sh复制代码git clone https://github.com/your-repo/spring-festival-blessings.git
   cd spring-festival-blessings
   ```

2. 安装依赖

   ```
   sh
   
   
   复制代码
   npm install
   ```

3. 启动项目

   ```
   sh
   
   
   复制代码
   npm run dev
   ```

------

## 实机展示
![实机演示](C:\Users\gjn09\new-years-greetings\实机演示.png)

## 未来优化

- **优化 UI 设计**，提升用户体验
- **增强个性化设置**，支持自定义祝福模板
- **集成更多社交平台分享**，扩展互动方式


