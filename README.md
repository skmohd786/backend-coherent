# 🔗 Coherent Backend

Backend API for **Coherent**, a full-stack developer networking platform where developers can discover other developers, build connections, communicate in real time, and access premium membership features.

🌐 **Live Application:** https://coherent.me

---

## 📌 About

**Coherent Backend** is built using **Node.js**, **Express.js**, and **MongoDB Atlas**. It provides REST APIs for authentication, profile management, developer discovery, connection requests, connections, real-time chat, and premium memberships.

The backend follows a modular architecture and uses **JWT authentication with HTTP-only cookies** for secure authentication and protected API access.

---

## 🛠 Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt.js
- Cookie Parser
- Validator
- CORS
- dotenv

### Real-Time Communication

- Socket.IO

### Deployment & Infrastructure

- AWS EC2
- Ubuntu
- Nginx
- PM2
- Elastic IP
- HTTPS / SSL with Let's Encrypt

---

## ✨ Features

### 🔐 Authentication

- User signup
- User login
- JWT-based authentication
- HTTP-only cookie-based authentication
- Logout
- Protected routes

### 👤 Profile Management

- View profile
- Edit profile
- Update user information
- Developer profile data

### 👨‍💻 Developer Discovery

- Browse suggested developers
- Pagination support
- Filter existing connections
- Filter pending connection requests
- Developer discovery for networking

### 🤝 Connection Requests

- Send connection requests
- Accept requests
- Reject requests
- Manage pending requests

### 🌐 Connections

- View all accepted connections
- Retrieve connected developers

### 💬 Real-Time Chat

- One-to-one real-time messaging
- Socket.IO integration
- Communication between connected developers
- Real-time message delivery
- Chat history stored in MongoDB

### 💎 Premium Membership

Coherent supports Silver and Gold membership plans.

#### Silver Membership

- Unlimited chats with connections
- 100 connection requests per day
- Silver verified badge
- Ad-free experience
- 2-month validity

#### Gold Membership

- Premium membership features
- Unlimited connection requests per day
- Gold verified badge
- Ad-free experience
- 6-month validity

> Voice calling is planned as a future improvement and is not currently implemented.

---

## 🛡️ Security

- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes
- HTTP-only cookies
- Input validation
- CORS configuration
- Environment variables for sensitive configuration

---

## 🧠 Backend Architecture

The backend follows a modular Express.js architecture.

```text
Client

 │
 ├── REST API ───────────────┐
 │                           ▼
 │                      Express.js
 │                           │
 │                    Authentication
 │                    & Middleware
 │                           │
 │              ┌────────────┼────────────┐
 │              ▼            ▼            ▼
 │           Routes        Models        Utils
 │              │            │
 │              ▼            ▼
 │          API Logic    MongoDB Atlas
 │
 └── Socket.IO ─────────► Real-Time Chat