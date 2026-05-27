# 🏥 DocAppoint Server (Backend API)

A RESTful backend service for the **DocAppoint Doctor Appointment System**, built with **Node.js, Express.js, and MongoDB (Mongoose)**.  
It handles authentication, doctor management, appointment booking, and user operations for a full healthcare scheduling platform.

🌐 **Live API:** https://assignment-9-doc-appoint-server.vercel.app/

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- CORS
- dotenv
- Vercel (Deployment)

---

## 📁 Project Structure

server/
├── config/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── server.js
└── package.json

---

## 🚀 Features

### 👤 Authentication System
- User registration
- User login
- JWT-based authentication
- Protected routes

### 🩺 Doctor Management
- Add doctors
- Get all doctors
- Get top doctors (limited results)
- Doctor profile handling

### 📅 Appointment System
- Book appointment
- Get user appointments
- Manage appointment data

### 🔐 Security
- Protected API routes
- Environment variable support
- Token verification middleware

---

## 📡 API Endpoints

### Auth
POST /auth/register  
POST /auth/login  

---

### Doctors
GET /doctors  
POST /doctors  
GET /doctors/top  

---

### Appointments
POST /appointments  
GET /appointments/:userId  

---

### Users
GET /users  
GET /users/:id  

---

## ⚙️ Installation & Setup

### 1. Clone repository
git clone https://github.com/shoyon-at-git/assignment-9-server-side  
cd assignment-9-server-side  

---

### 2. Install dependencies
npm install  

---

### 3. Create .env file
PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  

---

### 4. Run project locally
npm run dev  

Server runs at:  
http://localhost:5000  

---

## 🌍 Deployment

Backend deployed on Vercel:

https://assignment-9-doc-appoint-server.vercel.app/

---

## 🔄 System Flow

1. User registers or logs in  
2. Server generates JWT token  
3. Token used for protected requests  
4. User browses doctors  
5. User books appointment  
6. Data stored in MongoDB  
7. Appointments retrieved when needed  

---

## 🧠 What This Project Demonstrates

- REST API design
- MVC architecture
- MongoDB schema modeling
- Authentication system (JWT)
- Serverless deployment (Vercel)
- Scalable backend structure

---

## 🚧 Future Improvements

- Payment integration (bKash / Stripe)
- Email/SMS notifications
- Doctor availability calendar
- Real-time updates
- Admin analytics dashboard

---

## 👨‍💻 Author

MD. Sanowar Hossain Shoyon  
GitHub: https://github.com/shoyon-at-git  

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.