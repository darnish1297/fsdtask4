# 🎓 Student Internship Portal

A full-stack MERN application for browsing internships and submitting applications.

## Tech Stack

- **Frontend:** React 18, React Router v6, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Styling:** Custom CSS (no external UI library)

## Features

- 📋 Browse available internships
- 🔍 View detailed internship information
- 📝 Apply with validated application form (name, email, roll number, internship)
- ✅ Client-side and server-side input validation
- 🔄 fetch() API for form submission
- 📨 Success / error message display
- 🛡️ Duplicate application detection
- 🗂️ REST API with async/await and error handling

## Project Structure

```
my-project/
├── index.js                  # Express server entry point
├── models/
│   └── Application.js        # Mongoose schema for applications
├── routes/
│   └── api.js                # REST API endpoints
├── client/
│   ├── src/
│   │   ├── App.jsx           # React Router setup
│   │   ├── components/
│   │   │   ├── InternshipList.jsx      # List all internships
│   │   │   ├── InternshipDetails.jsx   # Single internship details
│   │   │   └── ApplicationForm.jsx     # Application form with validation
│   │   └── ...
│   └── ...
├── .env                      # Environment variables (MONGO_DB_URI)
└── package.json
```

## API Endpoints

| Method | Endpoint              | Description                 |
|--------|-----------------------|-----------------------------|
| GET    | `/api/internships`    | Get all internships         |
| GET    | `/api/internships/:id`| Get internship by ID        |
| POST   | `/api/applications`   | Submit an application       |
| GET    | `/api/applications`   | Get all submitted applications |

## Environment Variables

| Variable       | Description              |
|----------------|--------------------------|
| `MONGO_DB_URI` | MongoDB connection string|
| `PORT`         | Server port (default 5000)|
| `VITE_API_URL` | Backend API URL (for deployed frontend) |

## Local Development

```bash
# Install dependencies
npm run setup

# Run both frontend and backend
npm run dev
```

## Deployment

- **Frontend:** Deploy the `client/` folder to Vercel. Set `VITE_API_URL` env variable to your backend URL.
- **Backend:** Deploy to Render / Railway / Cyclic. Set `MONGO_DB_URI` env variable.

## Git Workflow

```bash
git checkout -b rollno_v1
git add -A && git commit -m "feat: Student Internship Portal"
git checkout main && git merge rollno_v1
git push origin main
```
