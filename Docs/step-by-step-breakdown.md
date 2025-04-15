# 🪜 STEP-BY-STEP TASK BREAKDOWN

### 1. Planning & Repo Setup

|**Task**           | **Description**                                                 |
|-------------------|-----------------------------------------------------------------|
| ✅ Define MVP     | Core features: Auth, Role-based access, Blog CRUD, Media upload |
| ✅ Repo structure | Two repos: mern-blog-client & mern-blog-server                  |
| ✅ Project board  | Use Trello/Notion: Backlog, In Progress, Done columns           |
| ✅ Branching      | Use Git feature branches: feature/auth, feature/blog-crud, etc. |

---

### 2. Frontend Boilerplate (React + Tailwind)

| **Task**                 | **Description**                               |
|--------------------------|-----------------------------------------------|
| Setup Vite or CRA        | npm create vite@latest mern-blog-client       |
| Install TailwindCSS      | For UI styling                                |
| Setup routing            | react-router-dom                              |
| Create base pages        | Home, Login, Register, Dashboard, Blog Editor |
| Create layout components | Navbar, Sidebar, Footer, PrivateRoute         |

---

### 3. Backend Boilerplate (Node + Express + MongoDB)

| **Task**                 | **Description**                    |
|--------------------------|------------------------------------|
| Init project             | npm init -y, setup structure       |
| Connect MongoDB Atlas    | Using Mongoose                     |
| Create models            | User, BlogPost, optional: Media    |
| Setup routes/controllers | /api/auth, /api/users, /api/posts  |
| Create middleware        | Auth middleware, Role-based access |

---

### 4. Authentication System

| **Task**                   | **Description**                               |
|----------------------------|-----------------------------------------------|
| Register & Login endpoints | POST /api/auth/register, POST /api/auth/login |
| Hash password              | Use bcrypt                                    |
| Generate token             | Use jsonwebtoken                              |
| Create AuthContext/Redux   | Manage user state globally                    |
| Protect frontend routes    | Only allow access based on roles              |

---

### 5. Dashboard Setup (Role-Based)

| **Task**                      | **Description**                          |
|-------------------------------|------------------------------------------|
| Create dashboard layout       | Sidebar + main content                   |
| Conditionally render features | Based on role === 'admin' or author      |
| Add stats (admin only)        | Total posts, pending, published, authors |

---

### 6. Blog CRUD Module

| **Task**             | **Description**                       |
|----------------------|---------------------------------------|
| Blog form            | Use React-Quill or Draft.js           |
| Add status dropdown  | draft, published, pending             |
| Post CRUD endpoints  | /api/posts with proper access control |
| Blog listing page    | Filter by tag/category/status         |
| Individual blog page | GET /api/posts/:slug                  |

---

### 7. Media Upload

| **Task**               | **Description**                  |
|------------------------|----------------------------------|
| Install Multer         | For server-side file handling    |
| Integrate Cloudinary   | Upload image, return URL         |
| Frontend: upload image | Show preview, store URL in state |
| Use in blog post       | Featured image or embedded media |

---

### 8. User Profile

| **Task**                   | **Description**                 |
|----------------------------|---------------------------------|
| User profile page          | Show profile info, edit profile |
| Update profile API         | PUT /api/users/:id              |
| Allow profile image upload | Store in Cloudinary or similar  |

---

### 9. UI Polishing & UX

| **Task**             | **Description**              |
|----------------------|------------------------------|
| Add notifications    | Toasts or modals for actions |
| Add loading spinners | For async calls              |
| Responsive design    | Mobile/tablet support        |
| Form validation      | With Formik + Yup            |

---

### 10. Deployment

| **Task**              | **Description**                     |
|-----------------------|-------------------------------------|
| Deploy backend        | Render / Railway                    |
| Deploy frontend       | Netlify / Vercel                    |
| Setup .env files      | API URLs, Cloudinary keys           |
| Setup CORS & security | Helmet, Rate-limit, sanitize inputs |

## 🧱 PAGE/COMPONENT STRUCTURE (Wireframe Style - Simplified)

### 🏠 Home Page

-   Navbar
-   Featured Blogs section
-   Recent Posts (cards)
-   Footer

### 🔐 Auth Pages

-   Login
-   Register

### 📋 Dashboard (Sidebar + Content)

1.  Admin:
    -   All users
    -   All posts (approve/reject)
    -   Site stats

2.  Author:
    -   My Posts
    -   Create Post
    -   My Profile

### ✍️ Blog Editor

-   Title input
-   Rich editor (React-Quill)
-   Upload media
-   Select status (Draft / Publish)
-   Submit button

### 📄 Single Blog Page

-   Featured Image
-   Title + Author + Date
-   Content
-   Tags
-   Author info

## 🗂 NAMING CONVENTIONS

### ✅ API Routes

| **Action**            | **Route**          | **Method** |
|-----------------------|--------------------|------------|
| Register              | /api/auth/register | POST       |
| Login                 | /api/auth/login    | POST       |
| Get All Posts         | /api/posts         | GET        |
| Get Single Post       | /api/posts/:slug   | GET        |
| Create Post           | /api/posts         | POST       |
| Update Post           | /api/posts/:id     | PUT        |
| Delete Post           | /api/posts/:id     | DELETE     |
| Upload Media          | /api/media/upload  | POST       |
| Get All Users (admin) | /api/users         | GET        |

---

### ✅ Component Naming

-   AuthForm.jsx
-   BlogEditor.jsx
-   BlogCard.jsx
-   DashboardLayout.jsx
-   UserProfile.jsx
-   Sidebar.jsx
-   PostList.jsx