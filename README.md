# Team Task Manager

A production-ready team task manager web app built with React, Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication.

## Project structure

```
EtharaAI assessment/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── roleMiddleware.js
│   ├── models/
│   │   ├── Project.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   └── taskRoutes.js
│   ├── .env.example
│   ├── package.json
│   ├── Procfile
│   ├── railway.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── layout/
│   │   │   ├── project/
│   │   │   ├── task/
│   │   │   └── ui/
│   │   ├── context/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
```

## Backend

### Features

- JWT authentication
- Role-based access control
- Admin-only project and task creation
- Member task view and status updates
- Express API with Mongoose models

### API endpoints

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/projects` (Admin only)
- `GET /api/projects`
- `POST /api/projects/add-member` (Admin only)
- `POST /api/tasks` (Admin only)
- `GET /api/tasks`
- `PUT /api/tasks/:id`

### Backend env variables

Use `backend/.env.example` as a template:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT`

### Run backend locally

```bash
cd backend
npm install
npm start
```

## Frontend

### Features

- React + Vite + Tailwind CSS
- React Router for protected routes
- JWT token persistence in `localStorage`
- Dashboard stats and task management
- Admin/member role UI variations
- Toast notifications and modal forms

### Frontend env variables

Use `frontend/.env.example` as a template:

- `VITE_API_URL`

### Run frontend locally

```bash
cd frontend
npm install
npm run dev
```

## Deployment

### Railway backend deployment

The backend includes Railway-ready config with `Procfile` and `railway.json`.

1. Create a Railway project.
2. Connect repository.
3. Set environment variables from `backend/.env.example`.
4. Deploy the backend service.

### Frontend deployment

The frontend can be deployed via Vercel, Netlify, or any static hosting provider using the Vite build output.

## Notes

- The app uses modern JS and no TypeScript.
- UI components follow shadcn-style patterns with responsive Tailwind utility classes.
- Backend and frontend are separated for clean deployment.
