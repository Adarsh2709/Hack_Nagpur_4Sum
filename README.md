<h1 align="center">
   BIOKEY_GUARD: Behavioral Biometric Authentication
</h1>

<p align="center">
  A military-grade secure authentication system using Keystroke Dynamics & Real-time Fraud Detection.
  <br>
  Built with React (Neo-Brutalism), Spring Boot, Python (ML), and MongoDB Atlas.
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&duration=3000&pause=1000&color=00FF9D&center=true&vCenter=true&width=600&lines=Behavioral+Biometrics;Keystroke+Dynamics;Real-time+Fraud+Detection;Continuous+Authentication">
</p>

---

## 🚀 Key Features

### 🧠 Behavioral Biometrics
- **Keystroke Dynamics**: Analyzes **Dwell Time** (how long you hold a key) and **Flight Time** (speed between keys) to create a unique user profile.
- **16-Dimensional Vectors**: Converts typing patterns into high-dimensional feature vectors for ML processing.
- **Continuous Verification**: Identity is verified not just by *what* you type, but *how* you type it.

### 🛡️ Advanced Security
- **10-Pass Enrollment**: Users must type their password 10 times during registration to build a robust statistical model.
- **Anti-Autofill & Decoy Inputs**: Prevents browser autofill and bot interactions using hidden trap fields.
- **Strict Confidence Threshold**: ML model enforces an **85% confidence score** to grant access.
- **MongoDB Atlas Vector Store**: Secure, cloud-native storage for biometric profiles.

### 🎨 Neo-Brutalism UI
- **Cyberpunk Aesthetic**: High-contrast, "Soft-Brutalism" design with floating elements and dynamic backgrounds.
- **Visual Feedback**: Real-time typing tracking, green-dot progress bars, and vibration/shake effects for error feedback.

---

## 🏗️ Project Structure

```
Hack_Nagpur_4Sum/
│
├── frontend/             # React + Vite (Neo-Brutalism UI)
│   ├── src/
│   │   ├── components/   # TypingTracker.js, InputBox.jsx
│   │   ├── pages/        # Login, Register, Dashboard
│   │   └── styles/       # neo.css, theme.css
│
├── backend/              # Spring Boot (Java 17)
│   ├── controller/       # Auth & Health Endpoints
│   ├── service/          # Biometric Logic & ML Bridge
│   ├── repository/       # MongoDB Interfaces
│   └── config/           # Security & CORS
│
├── ml-python/            # Python Flask ML Service
│   ├── app.py            # API Gateway for ML
│   └── hmm_svm_pipeline.py # One-Class SVM + HMM Model
│
└── docker-compose.yml    # Container Orchestration
```

---

## 💻 Tech Stack

### Frontend
<p>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/Neo_Brutalism-000000?style=for-the-badge&logo=css3&logoColor=white">
</p>

### Backend
<p>
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white">
  <img src="https://img.shields.io/badge/Java_17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white">
  <img src="https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white">
</p>

### Machine Learning
<p>
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/Scikit_Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white">
  <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white">
</p>

---

## 🔄 System Flow

`User` → `Frontend (Captures Keystrokes)` → `Backend (Validates Creds)` → `ML (Calculates Similarity)` → `Backend (Enforces Threshold)` → `Access Granted/Denied`

1. **Enrollment**: User types password 10 times. Frontend extracts 10 vectors -> Backend stores in MongoDB.
2. **Login**: User types password once. Frontend extracts 1 vector.
3. **Verification**: Backend sends stored vectors + new vector to Python ML Service.
4. **Decision**: ML Model (SVM/HMM) calculates similarity score. If score > 0.85, access is granted.

---

## 🚀 How to Run

### Quick Start (Launcher)
```powershell
./run_presentation.ps1
```

### Manual Setup

**1. Database**
Ensure `application.yml` has valid MongoDB Atlas credentials.

**2. Start ML Service**
```bash
cd ml-python
pip install -r requirements.txt
python app.py
```

**3. Start Backend**
```bash
cd backend
mvn spring-boot:run
```

**4. Start Frontend**
```bash
cd frontend
npm install
npm run dev
```

---
<p align="center">
  Made with ❤️ for Hack Nagpur
</p>
