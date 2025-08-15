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

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/eluxo-backend.git
   cd eluxo-backend
   ```

2. **Install dependencies**

   ```bash
   npm ci
   ```

3. **Create a `.env` file in the root and configure it**

   ```
   NODE_ENV=local
   PORT=3300
   DB_URI=mongodb://<username>:<password>@localhost:27017/eluxo
   APP_SECRET="app-secret"
   CORS_ALLOWED_HEADERS="Content-Type,Authorization,X-Requested-With"
   CORS_ALLOWED_METHODS=GET,POST,PUT,DELETE,OPTIONS
   CORS_ALLOWED_ORIGINS ="http://localhost:9000,http://127.0.0.1:9000"
   ```

4. **Run the development server**

```bash
npm run dev
```

---

## Commits

before pushing any changes please run following command:

```bash
npm run build:test
```

if it is showing lint warnings or error then run following command:

```bash
npm run build:fix
```

## 🪪 License

MIT License – feel free to use and contribute.
