# Dynamic Role-Based Content Management System (MEAN Stack)

A full-stack CMS application built with MongoDB, Express.js, Angular, and Node.js featuring dynamic role-based access control, JWT authentication, and complete article management.

## Features

- **User Authentication**: Secure registration and login with bcrypt password hashing
- **JWT Token System**: Access tokens (15min) and refresh tokens (7 days)
- **Dynamic Roles & Permissions**: Four roles stored in MongoDB (SuperAdmin, Manager, Contributor, Viewer)
- **Permission-Based Access Control**: Both backend and frontend authorization
- **Article Management**: Full CRUD with image upload, publish/unpublish capabilities
- **Role-Based UI**: Dynamic navigation and components based on user permissions

## Architecture

### Backend (Node.js + Express + MongoDB)
- **Models**: User (bcrypt hashing), Role (dynamic permissions), Article
- **Middleware**: JWT authentication, permission authorization, file upload (multer)
- **Controllers**: Auth, Role, Article with full CRUD operations
- **Routes**: Protected with authentication and permission middleware

### Frontend (Angular)
- **Services**: AuthService, ArticleService, RoleService for API communication
- **Guards**: AuthGuard (login required), PermissionGuard (role-based routing)
- **Interceptors**: Auto-attach JWT tokens, handle 401 responses
- **Components**: Login, Articles, Roles Management

## Installation

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Angular CLI (`npm install -g @angular/cli`)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in `backend/` directory:

```env
MONGO_URI=mongodb://localhost:27017/mean_cms_role_based
JWT_ACCESS_SECRET=your_access_secret_here_change_in_production
JWT_REFRESH_SECRET=your_refresh_secret_here_change_in_production
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_EXPIRES_IN=7d
PORT=4000
```

Start backend server:

```bash
npm run dev
# Server runs on http://localhost:4000
```

### Frontend Setup

```bash
cd frontend
npm install
ng serve
# App runs on http://localhost:4200
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user (returns access + refresh tokens)
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout (invalidate refresh token)
- `POST /api/auth/seed` - Seed database with roles and test users

### Roles (SuperAdmin only)
- `GET /api/roles` - Get all roles
- `POST /api/roles` - Create new role with permissions
- `PUT /api/roles/:id` - Update role permissions
- `DELETE /api/roles/:id` - Delete role

### Articles
- `GET /api/articles` - Get articles (Viewer: published only)
- `POST /api/articles` - Create article (requires 'create' permission)
- `PUT /api/articles/:id` - Update article (requires 'edit' permission)
- `DELETE /api/articles/:id` - Delete article (requires 'delete' permission)
- `PATCH /api/articles/:id/publish` - Publish article (Manager/SuperAdmin)
- `PATCH /api/articles/:id/unpublish` - Unpublish article (Manager/SuperAdmin)

## Pre-Created Test Users

Run `POST /api/auth/seed` to create default roles and test users:

| Role | Email | Password | Permissions |
|------|-------|----------|-------------|
| SuperAdmin | super@demo.com | Password123! | All (create, edit, delete, publish, view) |
| Manager | manager@demo.com | Password123! | create, edit, publish, view |
| Contributor | contrib@demo.com | Password123! | create, edit, view |
| Viewer | viewer@demo.com | Password123! | view |

## Permission System

Each role has five permission flags:
- **create**: Can create articles
- **edit**: Can edit articles
- **delete**: Can delete articles
- **publish**: Can publish/unpublish articles
- **view**: Can view articles

Viewers can only see published articles. Other roles see all articles with action buttons based on permissions.

## Project Structure

```
mean-cms-role-based/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── jwt.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── roleController.js
│   │   │   └── articleController.js
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── uploadMiddleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Role.js
│   │   │   └── Article.js
│   │   └── routes/
│   │       ├── auth.js
│   │       ├── roles.js
│   │       └── articles.js
│   ├── .env
│   └── server.js
├── frontend/
│   └── src/
│       └── app/
│           ├── guards/
│           │   ├── auth.guard.ts
│           │   └── permission.guard.ts
│           ├── services/
│           │   ├── auth.service.ts
│           │   ├── article.service.ts
│           │   └── role.service.ts
│           ├── interceptors/
│           │   └── auth.interceptor.ts
│           └── components/
└── README.md
```

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, Mongoose, bcrypt, jsonwebtoken, multer
- **Frontend**: Angular 14+, RxJS, TypeScript
- **Authentication**: JWT (access + refresh tokens)
- **Security**: bcrypt password hashing, permission-based middleware

## License

MIT
