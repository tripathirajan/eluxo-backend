<p align="center">
  <img src="./assets/eluxo-logo.png" alt="Eluxo Logo" width="200"/>
</p>

# Eluxo Backend
Eluxo is a modern full-stack e-commerce platform. This repository contains the backend service responsible for authentication, product management, order processing, and integrations with Cloudinary and email providers.

---

## 🧰 Installation & Setup

### Prerequisites

- Node.js >= 16
- MongoDB (Atlas or local)
- Cloudinary account
- SMTP credentials for email (Mailtrap, Gmail, etc.)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/eluxo-backend.git
   cd eluxo-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file in the root and configure it**
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   EMAIL_HOST=smtp.mailtrap.io
   EMAIL_PORT=2525
   EMAIL_USER=your_user
   EMAIL_PASS=your_pass
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

---

## ✨ Features

- ✅ JWT-based user authentication
- ✅ Role-based access control (admin/user)
- ✅ Product CRUD operations
- ✅ Image uploads via Cloudinary
- ✅ Order management and history
- ✅ Email support via Nodemailer
- ✅ RESTful API design

---

## 📁 Folder Structure

```
eluxo-backend/
├── config/         # DB and 3rd party service configs
├── controllers/    # API route handlers
├── middleware/     # Auth, error handlers, etc.
├── models/         # MongoDB schema definitions
├── routes/         # Express routes
├── utils/          # Utility/helper functions
├── server.js       # App entry point
└── .env            # Environment variables
```

---

## 📫 API Endpoints Overview

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| POST   | /api/auth/register | Register a new user          |
| POST   | /api/auth/login    | Login existing user          |
| GET    | /api/products      | Fetch all products           |
| POST   | /api/products      | Create product (admin only)  |
| PUT    | /api/products/:id  | Update product (admin only)  |
| DELETE | /api/products/:id  | Delete product (admin only)  |
| GET    | /api/orders        | Get all user orders          |
| POST   | /api/orders        | Create an order              |

---

## 🪪 License

MIT License – feel free to use and contribute.