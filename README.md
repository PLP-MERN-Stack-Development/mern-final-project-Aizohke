
# 💉 VaxTrack & Prevent

**VaxTrack & Prevent** is a modern, real-time MERN stack application designed for parents and healthcare providers to manage childhood immunizations. It features an AI assistant, real-time chat with doctors, automated reminders, and a smart vaccine tracker — all wrapped in a high-performance UI.

➡️ **[View Live Demo](https://vaxtrackapp.netlify.app/)** 

---

## ✨ Core Features

- 🔐 **Modern Authentication** – Secure sign-up/sign-in powered by Clerk.
- 👶 **Child Profile Management** – Add multiple children with avatars and medical history.
- 🗓️ **Smart Vaccination Tracker** – Auto-generates vaccine schedules based on DOB.
- 💬 **Real-time Chat** – Instant messaging with doctors via Socket.io.
- 🤖 **AI Assistant** – Gemini-powered chatbot for vaccine FAQs and education.
- 🗺️ **Clinic Finder** – Leaflet-based map to locate nearby vaccination centers.
- 🔔 **Automated Reminders** – SMS/Email alerts via Twilio and SendGrid.
- ⚡ **High-Performance UI** – Built with React + Vite, styled with Tailwind, and optimized with React Query.

---

## 🛠️ Tech Stack

| Category        | Technology                                                                 |
|----------------|------------------------------------------------------------------------------|
| **Frontend**    | React (Vite), React Router, Tailwind CSS, React Query, Socket.io-client     |
| **Backend**     | Node.js, Express, Socket.io, Mongoose                                       |
| **Database**    | MongoDB (MongoDB Atlas)                                                     |
| **Authentication** | Clerk (passwordless auth)                                                |
| **AI**          | Gemini API                                                                  |
| **Deployment**  | Netlify (Frontend), Render (Backend)                                        |
| **Others**      | Axios, Zod (validation), Winston (logging), Twilio (SMS), SendGrid (Email)  |

---

## 📂 Project Structure

```
VaxTrack/
├── client/         # React Frontend (Netlify)
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── index.html
│   └── package.json

├── server/         # Node.js/Express Backend (Render)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── socket/
│   │   ├── utils/
│   │   └── server.js
│   └── package.json

├── .env.example
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js (v18.x or higher)
- MongoDB Atlas account (or local MongoDB)
- Clerk account (for auth keys)
- Gemini API key (from Google AI Studio)
- Twilio & SendGrid accounts (for notifications)
- Render & Netlify accounts (for deployment)

### 2. Clone the Repository

```bash
git clone https://github.com/Aizohke/VaxTrack.git
cd VaxTrack
```

### 3. Setup Environment Variables

Create `.env` files for both frontend and backend using the examples below.

#### Backend (`server/.env`)
```env
NODE_ENV=development
PORT=5001
MONGO_URI=mongodb+srv://...
CLIENT_URL=http://localhost:5173
CLERK_SECRET_KEY=sk_...
GEMINI_API_KEY=...
TWILIO_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=...
SENDGRID_API_KEY=...
```

#### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5001
VITE_CLERK_PUBLISHABLE_KEY=pk_...
```

### 4. Install Dependencies

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

### 5. Run the Application

Use two terminals:

```bash
# Terminal 1: Backend
cd server
npm run dev
# Runs on http://localhost:5001

# Terminal 2: Frontend
cd client
npm run dev
# Opens at http://localhost:5173
```

---

## 📌 Future Enhancements

- Role-based access control
- Admin analytics dashboard
- Offline support via service workers
- Mobile-first UI improvements

---

## 📄 License

This project is licensed under the MIT License.

---

```
