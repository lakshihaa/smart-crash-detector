# Smart Airbag Alert System

A crash simulation web app that sends SMS alerts via Twilio with Google Sign-In via Firebase.

## Folder Structure
```
smart-airbag-alert/
├── backend/
│   ├── server.js        ← Express + Twilio API
│   ├── package.json     ← Dependencies
│   └── .env.example     ← Rename to .env and fill credentials
├── frontend/
│   └── index.html       ← Full UI with Firebase Google Auth
└── README.md
```

## Setup

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env    # Fill in your Twilio credentials
node server.js
```

### 2. Firebase Google Auth
1. Go to https://console.firebase.google.com
2. Create a new project
3. Go to Authentication > Sign-in method > Enable Google
4. Go to Project Settings > Your apps > Add Web App
5. Copy the firebaseConfig and paste it into frontend/index.html

### 3. Frontend
Open `frontend/index.html` in your browser.

## Environment Variables (.env)
| Variable | Description |
|---|---|
| TWILIO_ACCOUNT_SID | From Twilio Console |
| TWILIO_AUTH_TOKEN | From Twilio Console |
| TWILIO_PHONE_NUMBER | Your Twilio number |
| RECIPIENT_PHONE_NUMBER | Number to receive SMS alerts |
| PORT | Server port (default: 3000) |

## How it works
1. User signs in with Google (free Firebase auth)
2. Fills vehicle details in the form
3. Clicks "Simulate Airbag Deployment"
4. Backend sends SMS via Twilio to the recipient number
