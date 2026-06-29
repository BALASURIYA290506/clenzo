# ♻️ CLENZO

> **Report. Reward. Restore.**

An AI-powered Smart Waste Management Platform that enables citizens to report untreated waste using AI image analysis and GPS location while helping municipal authorities resolve issues efficiently through a dedicated admin portal.

---

## 🌍 Problem Statement

Municipal waste management often relies on manual complaints, delayed inspections, and fragmented reporting systems. This leads to:

- Slow waste resolution
- Lack of citizen engagement
- Poor visibility of waste hotspots
- Inefficient municipal workflows
- Environmental pollution

CLENZO bridges the gap between **citizens** and **municipal authorities** using AI and real-time reporting.

---

# 🚀 Solution

CLENZO transforms every citizen into an **AI-powered environmental sensor**.

Users simply upload an image of untreated waste, and the platform:

- 📷 Analyzes the waste using **Google Gemini Vision**
- 📍 Captures GPS location
- 🧠 Identifies waste type & severity
- 🏛 Sends reports to the Municipal Dashboard
- 🎁 Rewards citizens after successful verification and resolution

---

# ✨ Key Features

### 👤 Citizen Portal

- Smart Waste Reporting
- AI Waste Detection
- Live GPS Location
- Personal Dashboard
- Rewards Wallet
- Leaderboard
- Notifications
- Report Tracking

---

### 🏛 Municipal Admin Portal

- Secure Admin Login
- View Submitted Reports
- Verify Reports
- Assign Status
- Resolve Complaints
- Real-time Firestore Updates
- Operational Dashboard
- Waste Analytics

---

### 🤖 AI Powered Features

- Waste Classification
- Severity Detection
- Confidence Score
- Environmental Impact Analysis
- Municipal Department Recommendation
- Cleanup Time Estimation
- AI Recommendations

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

### Backend

- Firebase Firestore
- Firebase Authentication

### Artificial Intelligence

- Google Gemini Vision API

### Other Technologies

- Browser Geolocation API
- React Router
- Recharts

---

# 📌 System Workflow

```text
Citizen Uploads Waste Image
            │
            ▼
Google Gemini Vision Analysis
            │
            ▼
Waste Classification + AI Insights
            │
            ▼
GPS Location Captured
            │
            ▼
Report Stored in Firestore
            │
            ▼
Municipal Admin Dashboard
            │
            ▼
Verification & Resolution
            │
            ▼
Citizen Rewarded
            │
            ▼
Leaderboard Updated
```

---

# 📸 Screenshots

## 🏠 Landing Page

<img width="1532" height="873" alt="image" src="https://github.com/user-attachments/assets/2ddfe6f0-fbe9-45cc-9164-2c6a4bb71592" />


---

## 📊 Citizen Dashboard

<img width="1532" height="872" alt="image" src="https://github.com/user-attachments/assets/ed5ce068-afce-41d1-a42d-abdaeb1f3efb" />

---

## 📷 Report Waste

<img width="1531" height="872" alt="image" src="https://github.com/user-attachments/assets/a6c72996-b9df-476c-b5b0-560f130ef728" />


---

## 🏛 Municipal Dashboard

<img width="1530" height="885" alt="image" src="https://github.com/user-attachments/assets/6ef9c60b-fcab-4434-9ee1-174502138c63" />


---


# 📂 Project Structure

```
CLENZO
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   └── main.tsx
│
├── .env.example
├── package.json
├── vite.config.ts
└── README.md
```

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/BALASURIYA290506/clenzo.git
```

Go into the project

```bash
cd clenzo
```

Install dependencies

```bash
npm install
```

Create a `.env` file using `.env.example`

Start the development server

```bash
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file and configure:

```env
VITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=

VITE_FIREBASE_STORAGE_BUCKET=

VITE_FIREBASE_MESSAGING_SENDER_ID=

VITE_FIREBASE_APP_ID=

VITE_FIREBASE_MEASUREMENT_ID=

VITE_GEMINI_API_KEY=
```

---

# 🌟 Future Scope

- 📱 Mobile Application
- 🌍 Multi-language Support
- 🤖 Predictive Waste Hotspot Analysis
- 🚛 Smart Route Optimization
- 🛰 IoT Smart Bin Integration
- 📊 Advanced Municipal Analytics
- 🏙 Smart City Integration
- 🏆 Enhanced Gamification

---

# 🌱 Sustainable Development Goals

CLENZO contributes towards:

- SDG 11 — Sustainable Cities and Communities
- SDG 12 — Responsible Consumption and Production
- SDG 13 — Climate Action

---

# 👥 Team

**Team Name:** *Team Nexus*

### Team Members

- Balasuriya M

---

# 📬 Contact

**Project:** CLENZO

📧 Email: suriya290506@gmail.com

🌐 GitHub: https://github.com/BALASURIYA290506/clenzo

---

# 📄 License

This project was developed for the **Microsoft Innovation Hub – Vibeathon** hackathon.

It is intended for educational and demonstration purposes.

---

# ⭐ If you found this project interesting...

Give this repository a ⭐ and help us build smarter, cleaner cities together.

## **CLENZO — Report. Reward. Restore. ♻️**
