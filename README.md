# PU Assistant AI — Setup Guide

## Prerequisites

Before running this project, install:

1. **Node.js** v20+ — https://nodejs.org/
2. **MongoDB Community** v7.0 — https://www.mongodb.com/try/download/community
3. **Google Gemini API Key** — https://aistudio.google.com/app/apikey

---

## Quick Start

### Step 1: Configure Environment Variables

Edit `backend/.env` and set your Gemini API key:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/pu-assistant
JWT_SECRET=pu_assistant_jwt_super_secret_2024_poornima
JWT_EXPIRE=7d
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
NODE_ENV=development
```

### Step 2: Start MongoDB

**Windows:**
```powershell
net start MongoDB
```
Or open MongoDB Compass and start the connection.

### Step 3: Install & Seed Backend

```powershell
cd backend
npm install
npm run seed
```

This seeds:
- 15+ knowledge base entries about Poornima University
- 8 sample FAQs
- 5 sample notices
- Demo accounts:
  - **Admin:** admin@poornima.org / Admin@PU2024
  - **Student:** student@poornima.org / Student@123

### Step 4: Start Backend

```powershell
cd backend
npm run dev
```

Backend runs at: http://localhost:5000

### Step 5: Install & Start Frontend

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

---

## Project Structure

```
PU Chatbot/
├── backend/
│   ├── config/          # DB connection
│   ├── controllers/     # Business logic
│   ├── middleware/       # Auth middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── seed/            # Database seed script
│   ├── .env             # Environment variables
│   └── server.js        # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── hooks/       # useAuth context
    │   ├── pages/       # All 6 pages
    │   └── services/    # Axios API service
    └── index.html
```

---

## Pages

| Page | URL | Access |
|------|-----|--------|
| Landing Page | / | Public |
| Login | /login | Public |
| Signup | /signup | Public |
| Dashboard | /dashboard | Auth Required |
| AI Chat | /chat | Auth Required |
| Admin Panel | /admin | Admin Only |

---

## API Endpoints

| Method | Endpoint | Auth |
|--------|----------|------|
| POST | /api/auth/signup | Public |
| POST | /api/auth/login | Public |
| GET | /api/user/profile | User |
| POST | /api/chat/message | User |
| GET | /api/chat/history | User |
| GET | /api/admin/analytics | Admin |
| CRUD | /api/admin/faqs | Admin |
| CRUD | /api/admin/notices | Admin |
| CRUD | /api/admin/knowledge | Admin |

---

## Getting a Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key into `backend/.env` as `GEMINI_API_KEY`

The free tier of Gemini API is sufficient for development and small deployments.

---

## Support

For Poornima University queries: info@poornima.org | +91-141-5160400
