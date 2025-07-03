# 🛰️ 校园失物招领平台

<p align="center">
  <img src="https://img.shields.io/badge/React-Vite-blue?logo=react" alt="React & Vite">
  <img src="https://img.shields.io/badge/Node.js-Express-green?logo=nodedotjs" alt="Node.js & Express">
  <img src="https://img.shields.io/badge/Database-SQLite-blueviolet?logo=sqlite" alt="SQLite">
  <img src="https://img.shields.io/badge/License-MIT-lightgrey.svg" alt="License">
</p>


> ✨ 一个为解决校园内物品丢失问题而设计的高效、便捷的在线平台。

---

## 目录

- [项目简介](#-项目简介)
- [主要功能](#-主要功能)
- [项目结构](#-项目结构)
- [技术栈](#-技术栈)
- [项目运行指南](#-项目运行指南)
- [未来展望](#-未来展望)
- [许可证](#-许可证)

---

## 📖 项目简介

本项目旨在解决当前校内失物招领信息不透明、流程繁琐的问题。通过构建一个中心化的信息平台，我们希望帮助同学们更快速地找回失物，同时也让拾物者能够方便地发布招领信息，共同营造一个互帮互助、诚信友爱的校园环境。

---

## ✨ 主要功能

* ✅ **安全的用户系统**
  * 使用 `bcryptjs` 对用户密码进行加密存储，保障账户安全。
  * 通过 `jsonwebtoken` (JWT) 实现无状态的用户认证和会话管理。

* ✅ **便捷的信息发布与管理**
  * 用户可以轻松发布“失物信息”或“拾物信息”，包含标题、描述、分类、时间、地点等关键字段。
  * 支持通过 `multer` 中间件上传多张物品实物图片，信息更直观。
  * 用户可在个人中心集中管理自己发布的所有帖子，并进行**编辑**、**删除**或**标记为“已解决”**。

* ✅ **智能匹配与通知**
  * 在发布新信息时，系统会自动与现有信息进行匹配，并通过**站内信**和**电子邮件** (`nodemailer`) 向可能相关的用户发送提醒。
  * 通过 `redis` 实现节流控制，避免在短时间内对同一用户发送过多的重复通知。

* ✅ **多样化的信息展示与检索**
  * 首页以卡片流的形式，按时间倒序展示最新的失物与拾物信息。
  * 提供强大的多维度**搜索**功能，可根据关键词、分类、地点、类型进行筛选。
  * 集成了 Leaflet 地图服务，允许用户在地图上精确标记物品位置，并提供了独立的“地图墙”页面，直观展示物品的地理分布。

* ✅ **私密的站内信沟通**
  * 支持用户之间针对某件物品发起一对一的**私信沟通**，无需交换个人联系方式，有效保护用户隐私。
* ✅ **私密的站内信沟通**
  * 使用 WebSocket 技术，实现地图上物品标记的实时出现与消失。


---

## 📁 项目结构

项目采用前后端分离的架构，代码组织清晰，易于维护和扩展。

```text
Campus_LostAndFound/
├── backend/        # 后端项目 (Node.js & Express)
│   ├── controllers/  # 控制器：处理业务逻辑
│   ├── middleware/   # 中间件：处理认证、上传等
│   ├── models/       # 数据模型 (Sequelize)
│   ├── routes/       # 路由定义
│   ├── utils/        # 工具函数 (邮件发送、节流等)
│   ├── .env          # 环境变量配置
│   └── server.js     # 服务器入口文件
│
└── frontend/       # 前端项目 (React & Vite)
    └── src/
        ├── components/ # 可复用组件
        ├── pages/      # 页面级组件
        ├── store/      # 状态管理 (Zustand)
        └── ...
```

------

## 💻 技术栈

| 类别         | 技术                            | 描述                                                      |
| ------------ | ------------------------------- | --------------------------------------------------------- |
| **前端**     | React, Vite, React Router       | 构建用户界面、处理页面路由和状态管理。                    |
|              | Tailwind CSS                    | 用于快速构建现代化、响应式的UI样式。                      |
|              | Axios                           | 用于与后端API进行安全、可靠的数据交互。                   |
|              | Leaflet & React-Leaflet         | 实现地图的展示与交互功能。                                |
| **后端**     | Node.js, Express                | 作为核心后端框架，处理HTTP请求和业务逻辑。                |
|              | Sequelize                       | ORM框架，用于与数据库进行对象关系映射。                   |
|              | SQLite (sqlite3)                | 作为项目的轻量级关系型数据库，无需额外安装服务。          |
|              | JSON Web Token (jsonwebtoken)   | 用于生成和验证Token，实现用户认证。                       |
|              | Bcrypt.js                       | 用于密码的哈希加密，保障用户数据安全。                    |
|              | Multer                          | 中间件，专门用于处理 multipart/form-data 类型的文件上传。 |
|              | Nodemailer                      | 用于实现邮件发送功能，为用户提供实时通知。                |
| **开发工具** | Git, GitHub                     | 用于版本控制和团队协作。                                  |
|              | Visual Studio (C++ Build Tools) | (Windows环境下) 编译 `sqlite3` 等原生模块所必需的工具链。 |

------

## 🚀 项目运行指南

在运行本项目前，请确保您的电脑已安装 **Node.js (LTS版)**, **Python** 和 **Git**。

### 第一步：环境准备 (Windows 用户特别注意)

对于 Windows 用户，部分后端依赖（如 `sqlite3`）需要C++编译环境。请务必完成以下步骤：

1. **安装 Visual Studio Installer**: 从 [官网下载](https://visualstudio.microsoft.com/downloads/) 并运行。在“工具”中找到并安装“生成工具 for Visual Studio 2022”。
2. **安装 C++ 构建工具**: 在安装程序的“工作负载”中，勾选 **“使用 C++ 的桌面开发”**。
3. **安装 Windows SDK**: 在“单个组件”中，确保勾选了最新的 **Windows SDK**。
4. **重启电脑**: 安装完成后，务必重启电脑使所有环境变量生效。

### 第二步：初始化数据库

此脚本会为后端创建一个 `campus.db` 的数据库文件并填充模拟数据。

```
# （在项目根目录 D:\Campus_LostAndFound> 下运行）
python initializeDb.py
```

### 第三步：启动后端服务

> **重要提示**: 首次启动或安装依赖时，建议使用 **Developer Command Prompt for VS 2022** (开发者命令提示符) 来替代普通终端，以确保所有编译工具链都已加载。

```
# 1. 打开 "Developer Command Prompt for VS 2022"
# 2. 进入后端项目目录
cd backend

# 3. 安装所有依赖
npm install

# 4. 启动服务（服务将运行在 http://localhost:5000）
npm run start
```

### 第四步：启动前端服务

```
# 1. 打开一个【新的】普通终端窗口
# 2. 进入前端项目目录
cd frontend

# 3. 安装所有依赖
npm install

# 4. 启动服务 (通常会运行在 http://localhost:5173)
npm run dev
```

### 第五步：访问应用

在浏览器中打开前端服务启动后提示的地址 (如 `http://localhost:5173`)，即可开始使用！

------

## 🔭 未来展望

- **高级搜索与排序**: 引入更复杂的搜索算法，支持按日期范围、距离排序等。
- **移动端适配**: 优化移动端浏览器上的用户体验，或考虑开发专门的移动应用 (如使用 React Native)。
- **接入校园统一认证**: 与学校的CAS系统对接，实现真正的校内师生身份认证。
- **Docker化部署**: 将前后端服务打包成 Docker 镜像，实现一键部署，简化生产环境的配置。
- **智能匹配与通知**: 在发布新信息时，系统自动与现有信息进行匹配，通过**站内信**和**电子邮件** (`nodemailer`) 向可能相关的用户发送提醒，并通过 `redis` 实现节流控制，避免在短时间内对同一用户发送过多的重复通知。

------

## 📄 许可证

本项目采用 [MIT License](https://www.google.com/search?q=LICENSE) 开源许可证。
