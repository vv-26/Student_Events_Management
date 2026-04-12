# 🎓 Student Event Manager — Frontend

A modern, premium SaaS-style frontend for faculty registration and login.

## ✨ Features
- Faculty Registration with floating labels, password strength meter, department selector
- Faculty Login with Remember Me, Forgot Password modal, error handling
- Toast notifications (success / error / info / warning)
- Glassmorphism card design with purple gradient theme
- Split-screen layout (branding panel + form)
- Fully responsive (mobile + desktop)
- Backend integration stubs for Java Servlet REST API

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 16  →  https://nodejs.org
- npm (comes with Node) or yarn

### 1. Install dependencies
```bash
cd student-event-manager
npm install
```

### 2. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Start the dev server
```bash
npm start
```
Opens at **http://localhost:3000**

---

## 📁 Folder Structure
```
src/
├── components/
│   ├── FloatInput.jsx          ← Reusable animated input
│   ├── GradientButton.jsx      ← Gradient button with loading state
│   ├── Toast.jsx               ← Toast notification system
│   ├── ForgotPasswordModal.jsx ← Password reset modal
│   └── BrandPanel.jsx          ← Left branding panel
├── pages/
│   ├── Register.jsx            ← Faculty registration page
│   ├── Login.jsx               ← Faculty login page
│   └── Dashboard.jsx           ← Post-login placeholder
├── utils/
│   ├── validate.js             ← Form validation helpers
│   └── api.js                  ← Backend REST API helpers
├── App.jsx                     ← Routes
├── index.js                    ← Entry point
└── index.css                   ← Tailwind + global styles
```

---

## 🔌 Backend Integration (Java Servlet)

In `src/utils/api.js`, update the base URL:
```js
const BASE_URL = "http://localhost:8080/StudentEventManager";
```

### Register endpoint
In `src/pages/Register.jsx`, uncomment the API block:
```js
const result = await registerFaculty({
  name: form.name,
  email: form.email,
  password: form.password,
  department: form.department,
});
```

### Login endpoint
In `src/pages/Login.jsx`, uncomment the API block:
```js
const result = await loginFaculty({ email: form.email, password: form.password });
if (result.ok) saveToken(result.data.token);
```

### Expected API responses
```json
// POST /register  → 201
{ "message": "Faculty registered successfully" }

// POST /login     → 200
{ "token": "jwt-token-here", "faculty": { "id": 1, "name": "Dr. Smith", "email": "..." } }

// Error responses → 4xx
{ "message": "Email already in use" }
```

---

## 🎨 Customization

| Thing to change | File |
|---|---|
| Primary color (#5B2EFF) | `tailwind.config.js` → `brand.DEFAULT` |
| Departments list | `src/pages/Register.jsx` → `DEPARTMENTS` array |
| API base URL | `src/utils/api.js` → `BASE_URL` |
| Logo / branding | `src/components/BrandPanel.jsx` |

---

## 🛠 Tech Stack
- React 18 (functional components + hooks)
- React Router v6
- Tailwind CSS v3
- Google Fonts: Syne (display) + DM Sans (body)
