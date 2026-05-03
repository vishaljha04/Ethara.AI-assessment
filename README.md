# 🚀 Team Task Manager

A **modern, production-ready Team Task Manager** built with a full-stack JavaScript architecture.
This app enables teams to collaborate efficiently by managing projects, assigning tasks, and tracking progress with **role-based access control**.

---

## ✨ Live Demo

🔗 **Live App:** *[Add your deployed URL here]*
📂 **GitHub Repository:** *[Add repo link here]*

---

## 📌 Overview

This application is designed to simulate a real-world team collaboration tool (similar to Jira/Notion-lite), featuring:

* 🔐 Secure authentication (JWT-based)
* 👥 Role-based access (Admin / Member)
* 📁 Project and team management
* ✅ Task creation, assignment & tracking
* 📊 Dashboard insights (status + overdue tasks)
* 🎨 Clean and responsive modern UI

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ React (Vite)
* 🎨 Tailwind CSS
* 🧩 shadcn/ui components
* 🔄 React Router
* 📦 Axios

### Backend

* 🟢 Node.js
* 🚂 Express.js
* 🍃 MongoDB (Mongoose)
* 🔑 JWT Authentication

### Deployment

* 🚀 Railway (Backend)
* ▲ Vercel / Netlify (Frontend)

---

## 🧱 Project Structure

```
EtharaAI assessment/
├── backend/     # Express API + MongoDB
├── frontend/    # React + Tailwind UI
```

---

## 🔐 Authentication & Authorization

* Secure login/signup using **JWT**
* Token stored in `localStorage`
* Middleware-protected routes
* Role-based access:

  * **Admin**

    * Create projects
    * Add members
    * Assign tasks
  * **Member**

    * View assigned tasks
    * Update task status

---

## 📦 Core Features

### 👤 User Authentication

* Signup & Login
* Persistent sessions using JWT

---

### 📁 Project Management

* Create and manage projects (Admin)
* Add team members
* View assigned projects

---

### ✅ Task Management

* Create tasks (Admin only)
* Assign tasks to members
* Track status:

  * `Todo`
  * `In Progress`
  * `Done`
* Update task progress
* Due date tracking

---

### 📊 Dashboard

* Overview of:

  * Total tasks
  * Completed tasks
  * Pending tasks
  * Overdue tasks
* Visual and structured layout

---

### 🎨 UI/UX Highlights

* Modern SaaS-style interface
* Responsive design (mobile + desktop)
* Reusable UI components
* Toast notifications
* Modal-based forms
* Clean layout with sidebar navigation

---

## 🔌 API Endpoints

### Auth

```
POST /api/auth/signup
POST /api/auth/login
```

### Projects

```
POST /api/projects              (Admin only)
GET /api/projects
POST /api/projects/add-member  (Admin only)
```

### Tasks

```
POST /api/tasks                (Admin only)
GET /api/tasks
PUT /api/tasks/:id             (Update status)
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend (`frontend/.env`)

```
VITE_API_URL=http://localhost:5000
```

---

## 🧪 Run Locally

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

---

### 2️⃣ Setup Backend

```bash
cd backend
npm install
npm start
```

---

### 3️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Deployment Guide

### Backend (Railway)

1. Create a project on Railway
2. Connect your GitHub repo
3. Add environment variables
4. Deploy

---

### Frontend (Vercel / Netlify)

```bash
npm run build
```

* Upload `/dist` folder or connect repo for auto-deploy

---

## 📸 Demo Walkthrough (Recommended)

Include a short 2–5 minute video showing:

* User authentication
* Admin creating project
* Assigning tasks
* Member updating task status
* Dashboard updates

---

## 💡 Future Improvements

* 🧲 Drag & drop Kanban board
* 📈 Advanced analytics (charts)
* 🔔 Notifications system
* 🔍 Global search
* 📅 Calendar view for tasks
* 🌙 Dark mode toggle

---

## 🧠 Key Learnings

* Designing scalable REST APIs
* Implementing role-based access control
* Managing full-stack state and data flow
* Building responsive, reusable UI components
* Deploying production-ready applications

---

## 📄 License

This project is for assessment and educational purposes.

---

## 🙌 Author

**Vishal Jha**
Final Year IT Student | Full Stack Developer

---

⭐ If you like this project, consider giving it a star!
