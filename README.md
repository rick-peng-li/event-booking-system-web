<!-- 项目 Git 地址：git@github.com:rick-peng-li/event-booking-system-web.git -->

# event-booking-system-web

一个基于 React + Node.js + MongoDB 的活动预订系统，支持普通用户报名活动、组织者创建和维护活动、管理员审批组织者并查看平台数据。

## 项目简介

本项目采用前后端分离架构：

- 前端使用 Vite 构建 React 单页应用
- 后端使用 Express 提供 REST API
- 数据存储使用 MongoDB，并通过 Mongoose 建模
- 登录后基于角色进行页面访问控制，覆盖用户、组织者、管理员三类角色

## 核心功能

### 普通用户

- 浏览活动列表
- 查看活动日期、地点、剩余席位
- 在线预订活动
- 查看我的预订与票据编号

### 组织者

- 注册组织者账号
- 等待管理员审核通过后登录
- 在控制台创建活动
- 编辑、删除自己发布的活动
- 查看自己发布的活动列表

### 管理员

- 审核待批准的组织者账号
- 拒绝并删除组织者账号
- 查看用户、活动、预订数据
- 删除用户和活动

## 项目架构

```text
event-booking-system-web/
├─ client/                        # React 前端
│  ├─ src/components/             # 通用组件，如导航栏、路由守卫
│  ├─ src/pages/                  # 页面模块
│  ├─ src/services/api.js         # Axios 请求封装
│  └─ vite.config.js              # Vite 配置
├─ server/                        # Express 后端
│  ├─ config/db.js                # MongoDB 连接
│  ├─ controllers/                # 业务控制器
│  ├─ models/                     # Mongoose 数据模型
│  ├─ routes/                     # API 路由
│  └─ server.js                   # 服务入口
└─ README.md
```

### 前端结构

前端路由主要定义在 `client/src/App.jsx`，包含以下页面：

- `/`：首页，展示活动列表并支持直接预订
- `/auth`：注册 / 登录统一入口
- `/dashboard`：组织者控制台
- `/my-bookings`：普通用户预订列表
- `/admin`：管理员总览页
- `/approvals`：组织者审核页

路由保护由 `client/src/components/ProtectedRoute.jsx` 负责，登录状态和用户信息保存在浏览器 `localStorage` 中。

### 后端结构

后端采用较清晰的分层方式：

- `routes/`：定义 API 路由
- `controllers/`：处理注册登录、活动管理、预订管理等业务逻辑
- `models/`：定义 `User`、`Event`、`Booking` 三个核心数据模型
- `config/db.js`：统一初始化 MongoDB 连接

默认接口前缀如下：

- `/api/auth`：登录、注册、用户列表、组织者审核
- `/api/events`：活动创建、查询、更新、删除
- `/api/bookings`：活动预订、预订列表查询

## 技术栈

### 前端

- React 19
- Vite 8
- React Router DOM 7
- Axios
- Tailwind CSS 4
- ESLint

### 后端

- Node.js
- Express 5
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken
- cors
- dotenv
- nodemon

## 数据模型

### User

- `name`：用户名
- `email`：邮箱
- `password`：加密后的密码
- `role`：用户角色，支持 `user`、`organizer`、`admin`
- `isApproved`：组织者是否已审核通过

### Event

- `title`：活动标题
- `description`：活动描述
- `date`：活动日期
- `location`：活动地点
- `seats`：剩余座位数
- `organizer`：活动发布者

### Booking

- `user`：预订用户
- `event`：预订活动
- `ticketId`：票据编号

## 本地启动

### 1. 安装依赖

分别安装前后端依赖：

```bash
cd client
npm install
```

```bash
cd server
npm install
```

### 2. 配置后端环境变量

在 `server` 目录创建 `.env` 文件，并至少配置以下内容：

```env
MONGO_URI=mongodb://127.0.0.1:27017/event-booking-system
PORT=5000
```

### 3. 启动后端服务

```bash
cd server
npm run dev
```

开发模式下服务默认运行在：

```text
http://localhost:5000
```

### 4. 启动前端服务

```bash
cd client
npm run dev
```

前端开发服务默认运行在：

```text
http://localhost:5173
```

前端请求地址在 `client/src/services/api.js` 中固定为：

```text
http://localhost:5000/api
```

## 常用命令

### client

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### server

```bash
npm run dev
npm start
```

## 角色说明

- `user`：浏览活动、提交预订、查看个人预订
- `organizer`：创建和维护活动，首次注册后需要管理员审批
- `admin`：管理用户、活动和预订，并审核组织者

## 开发说明

- 前后端目录独立，适合分别部署
- 当前前端通过 `localStorage` 保存登录态与用户信息
- 组织者登录前必须先通过管理员审批
- 活动预订成功后会扣减活动剩余席位并生成票据编号
