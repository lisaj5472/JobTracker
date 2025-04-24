# 🎯 Job Tracker

**Built independently by Lisa Jorgensen**

This is a full-stack job tracking application designed to help job seekers organize their applications, monitor progress, and maintain a history of applied positions. It’s fully custom-built using modern tools and thoughtful design to prioritize usability, accessibility, and scalability.

---

## 🚀 Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS + Custom CSS (with an Art Deco-inspired theme)
- **Backend**: Flask (Python) + MongoDB
- **Database**: MongoDB Atlas (connected via `pymongo`)
- **Deployment**: Local dev only (for now) — backend port `5000`, frontend port `5173`

---

## ✅ Current Features

### 🌐 Frontend

- Fully responsive layout (desktop/mobile)
- Add new job applications via a clean, accessible form
- Edit existing job entries in a modal
- Delete job records with confirmation feedback
- Real-time updates via refreshable job table
- Auto-formatting of links
- Auto-population of applied/rejected dates based on status
- Success/error messages for user actions
- Styled with a unique palette inspired by the Denver Nuggets retro look 💛💙🌈

### 🔧 Backend

- Full CRUD operations for jobs (`GET`, `POST`, `PUT`, `DELETE`)
- Validation and default field logic for clean data
- MongoDB document handling with `ObjectId` conversions
- Flask + CORS configuration for local dev API access

---

## 📌 Fields Tracked Per Job

- Job Title _(required)_
- Company _(required)_
- Posting Link _(optional)_
- Application Status (dropdown: applied, interviewing, withdrawn, rejected, no response)
- Applied Date (auto-fills when status is "applied")
- Rejected Date (auto-fills when status is "rejected")
- Resume Version Used
- Notes

---

## 🛠️ Planned Features (Future Roadmap)

### 🎓 Resume Library (In Progress)

- Upload base resume files
- Select resume version per application
- Customize and save job-specific resumes
- Future export options (PDF, DOCX)

### 👤 User Profiles

- Store long-term user data (contact info, education, skills)
- Reuse data across resumes and applications
- Secure login and user-based job filtering

### 🧠 Smart Autofill

- Parse job links to auto-suggest titles/companies
- Extract metadata or prefill fields from job board pages

### 🕵️‍♀️ Application Insights

- Visual dashboard with stats (applied vs. rejected, etc.)
- Weekly reminders to follow up

---

## ✨ About the Creator

I'm Lisa J., a former global program manager turned full-stack developer. I built this app to support my own job search and help others streamline theirs. I love blending beautiful design with practical functionality — and everything in this repo is handcrafted by me.

---

## 📸 Screenshots

_(To be added once deployed or hosted online)_

---

## 📦 Running Locally

1. Clone this repo
2. Install frontend dependencies: `npm install`
3. Start frontend dev server: `npm run dev`
4. Start backend (Flask) in a separate terminal
5. Make sure your `.env` file contains `MONGO_URI` and `DB_NAME`
6. Visit `http://localhost:5173` to use the app
