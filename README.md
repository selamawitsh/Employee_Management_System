# 👨‍💼 Employee Management System

A full-stack web application for managing employees, built with the **MERN stack** (MongoDB, Express.js, React, Node.js). This system features secure authentication, role-based access control, and complete CRUD operations for employee records.

---

## Features

-  **User Authentication** – Register and login securely with hashed passwords and JWT tokens.
-  **Role-Based Access** – Admins can manage employees; users can view only.
-  **Employee Management** – Create, read, update, and delete employee records.
-  **Modern UI** – Responsive design using **Tailwind CSS** with a dark/blue theme.
-  **API Integration** – React frontend communicates with Express backend via REST API.

---

##  Tech Stack

### 🖥 Frontend
- React (with Hooks)
- React Router DOM
- Axios
- Tailwind CSS
- Vite

###  Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)
- dotenv + CORS

---

##  Folder Structure

```
employee-management-system/
├── employee-management-backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.js
└── employee-management-frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    └── tailwind.config.js
```

---

##  Getting Started

###  Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

---

###  Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/selamawitsh/Employee_Management_System.git
```

---

#### 2. Setup Backend

```bash
cd employee-management-backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

---

#### 3. Setup Frontend

```bash
cd ../employee-management-frontend
npm install
npm run dev
```

Frontend will be available at:  
 `http://localhost:5173` (default Vite port)

---

##  Usage

1. Register a new **admin** or **user** account.
2. Login to access the dashboard.
3. Admins can:
   -  Add new employees
   -  Edit employee details
   -  Delete employees
4. Users can:
   -  View the employee list

---

##  Authentication & Authorization

- JWT token stored in `localStorage`
- All protected backend routes use `Authorization: Bearer <token>`
- Middleware ensures only **admins** can create/update/delete

---

##  Future Improvements

-  Edit employee with modal form
-  Search & filter functionality
-  Deployment to Netlify + Render
-  Dark/light mode toggle

---

##  Author

[Selamawit Shimeles](https://github.com/selamawitsh)



