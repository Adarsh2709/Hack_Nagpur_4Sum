<h1 align="center">
   Secure Auth System
</h1>

<p align="center">
  A secure authentication system with fraud detection  
  <br>
  Built using Frontend, Backend, and Machine Learning
</p>

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=18&duration=3000&pause=1000&color=36BCF7&center=true&vCenter=true&width=600&lines=Secure+Authentication;Fraud+Detection+System;Java+%2B+React+%2B+Python+ML">
</p>

---

##  Project Structure

secure-auth-system/
│
├── frontend/ # React / Vite frontend
│
├── backend/ # Spring Boot backend
│ ├── controller/
│ ├── repository/
│ ├── config/
│ ├── test/
│ ├── service/
│ ├── security/
│ ├── model/
│ └── utils/
│
├── ml-python/ # Python ML module
│ ├── hmm_svm_pipeline.py
│ └── example.py
│
└── docker-compose.yml # Docker orchestration


---

##  Frontend

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" width="50">
  <img src="https://vitejs.dev/logo.svg" alt="Vite" width="50">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript" width="45">
  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3d/CSS.3.svg" alt="CSS" width="45">
</p>

### What it does
- Login and Registration pages
- Clean Neo-Brutalism UI
- Reusable components
- Communicates with backend APIs

---

##  Backend

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/79/Spring_Boot.svg" alt="Spring Boot" width="55">
  <img src="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg" alt="Java" width="45">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg" alt="Hibernate" width="50">
</p>

### What it does
- Handles authentication APIs
- Manages database operations
- Applies security rules
- Prepares data for fraud detection

---

##  Machine Learning

<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" alt="Python" width="45">
  <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" alt="Scikit Learn" width="70">
</p>

### What it does
- Uses **Hidden Markov Model (HMM)**
- Uses **One-Class SVM**
- Detects abnormal behavior
- Generates fraud confidence score

---

##  System Flow



User → Frontend → Backend → ML → Backend → Frontend


1. User logs in
2. Backend validates request
3. ML checks for fraud
4. Final result is returned

---

##  Docker & Deployment

<p align="center">
  <img src="https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png" alt="Docker" width="60">
</p>

- Backend and ML run as separate containers
- Managed using Docker Compose
- Easy to run and deploy

---


