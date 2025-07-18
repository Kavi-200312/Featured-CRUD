# 👥 MERN User Management App

A full-featured **User Management Application** built with the **MERN stack**, designed to handle CRUD operations with robust features like:

- 🔁 Redux for state management  
- 🔍 Debounced Search (without external libraries)  
- 📄 Server-Side Pagination  
- ✅ React Hook Form for validation  
- ⚡ Toast Notifications for UX  
- 🧠 Clean and scalable codebase

---

## 📸 Preview

![App Screenshot](https://via.placeholder.com/800x400.png?text=Your+App+Screenshot+Here)

---

## 🚀 Features

- ➕ Create users with name, email, phone, and address
- 🔄 Edit and update user details
- ❌ Delete users
- 🔍 Live debounced search with optimized performance
- 🗃️ Paginated data from server
- 🎯 Form validation using `react-hook-form`
- 🔔 User-friendly toast alerts using `react-hot-toast`

---

## 🧰 Tech Stack

### 🔷 Frontend
- React
- Redux Toolkit
- React Hook Form
- React Hot Toast
- React Paginate
- Tailwind CSS or Custom CSS

### 🔶 Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)

---

## 📦 Getting Started

### 🔧 Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 💻 Install dependencies

```bash
# for frontend
cd client
npm install

# for backend
cd ../server
npm install
```

### 🚀 Start the development server

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm start
```

---

## 🔁 API Endpoints (Backend)

| Method | Endpoint       | Description           |
|--------|----------------|-----------------------|
| GET    | `/users`       | Get users (with pagination & search) |
| POST   | `/users`       | Create a new user     |
| PUT    | `/users/:id`   | Update a user         |
| DELETE | `/users/:id`   | Delete a user         |

---

## 📂 Folder Structure

```
/client
  /src
    /features
      /user      ← Redux slice & API logic
    App.jsx
    index.js
/server
  /models
  /routes
  /controllers
  server.js
```

---

## 📜 License

This project is open-source and free to use under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Kaviyarasu M**  
Full Stack Developer | MERN | Zustand | Redux  
[GitHub](https://github.com/kaviyarasu1312) • [LinkedIn](https://linkedin.com)