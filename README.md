# 💉 VaxTrack & Prevent

**VaxTrack & Prevent** is a modern, real-time MERN stack application designed for parents and healthcare providers to manage childhood immunizations. It combines **AI-powered assistance**, **real-time communication**, and **smart vaccine tracking** into a seamless, high-performance experience.  

➡️ **[View Live Demo](https://vaxtrackapp.netlify.app/)**  

➡️ **[View Pitchdeck ](https://gamma.app/docs/VaxTrack-Prevent-0g7zit1ejexm4n7)**

---

## 📖 Project Overview

Childhood immunization management can be complex and overwhelming. **VaxTrack & Prevent** simplifies this process by providing:  

- A **personalized vaccine tracker** that auto-generates schedules based on a child’s DOB.  
- **AI assistant support** for vaccine FAQs and parental guidance.  
- **Real-time chat** with doctors for instant consultation.  
- **Automated reminders** via SMS/Email to ensure no vaccine is missed.  
- A **clinic finder** to locate nearby vaccination centers.  

This project was built to empower families and healthcare providers with **technology-driven preventive care**.

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

| Category          | Technology                                                                 |
|-------------------|------------------------------------------------------------------------------|
| **Frontend**      | React (Vite), React Router, Tailwind CSS, React Query, Socket.io-client     |
| **Backend**       | Node.js, Express, Socket.io, Mongoose                                       |
| **Database**      | MongoDB (MongoDB Atlas)                                                     |
| **Authentication**| Clerk (passwordless auth)                                                   |
| **AI**            | Gemini API                                                                  |
| **Deployment**    | Netlify (Frontend), Render (Backend)                                        |
| **Others**        | Axios, Zod (validation), Winston (logging), Twilio (SMS), SendGrid (Email)  |

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

## 🖼️ Screenshots

### Dashboard & Vaccine Tracker
![Dashboard Screenshot]
<img width="1365" height="767" alt="image" src="https://github.com/user-attachments/assets/bffe6527-53d8-474b-8bda-2dc73ad64fd8" />


### Child Profile Management
![Child Profile Screenshot]
<img width="1365" height="757" alt="image" src="https://github.com/user-attachments/assets/ed9ca5ea-19d5-483e-97db-2b295c675256" />


### Real-time Chat with Doctors
![Chat Screenshot]
<img width="1359" height="767" alt="image" src="https://github.com/user-attachments/assets/2061b1f0-8249-44c3-82e8-52a481848d4c" />


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
