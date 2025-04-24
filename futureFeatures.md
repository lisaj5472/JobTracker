# 🛠️ Job Tracker App – Feature Checklist

This is a synthesized list of all the tasks and improvements we've discussed but haven't yet completed for your Job Tracker project.

---

## ✅ Job Tracker App — Remaining Features & Fixes

### 🔄 Frontend Enhancements

- [ ] Turn AddJob into a Modal instead of a full component taking up a section of the page.
- [ ] Implement buttons on the Home page:
  - [ ] "Add a Job" (opens modal)
  - [ ] "Go to Resumes" (navigates to resume dashboard)
- [ ] Responsive Fix for AddJob modal — currently not resizing correctly based on viewport.
- [ ] Complete Resume Page styling to match Home page layout.
- [ ] Create and style Resume cards — none yet exist.

### 📄 Resume Features (In Progress)

- [ ] Create ResumeLibrary component using MongoDB (not localStorage).
- [ ] Allow uploading and parsing of a resume, then editing structured fields.
- [ ] Attach selected resume to job applications, save a copy/version per job.
- [ ] Skills Refactor:
  - [ ] Support resume-specific editable skills
  - [ ] Support a master skills list stored in user profile for reuse

### 🧠 Profile and Data Model Expansion

- [ ] Create `UserProfile` data structure:
  - [ ] Contact info
  - [ ] Education history
  - [ ] Work history (for reuse across resumes)
  - [ ] Skills
- [ ] Allow profile info to autofill parsed resume when resume data is missing or incorrect.

### 🧪 Advanced Resume Builder Logic

- [ ] Refactor `ATSResumeTemplate` to:
  - [ ] Prioritize profile info when available
  - [ ] Fall back to parsed resume text
  - [ ] Allow resume-specific customization before save/export

---

## 🗃️ Backend Features & Enhancements

### 🛠️ Current Needs

- [ ] Add a resumes collection to MongoDB.
- [ ] Add CRUD endpoints for resumes.
- [ ] Add `userId` to jobs and resumes (for multi-user support).

### 🔐 Security & Multi-user Support

- [ ] Add authentication (JWT).
- [ ] Ensure user data isolation and protection in the database.

---

## 🎨 Styling & Branding

- [ ] Finalize visual style (Denver Nuggets palette or retro rainbow).
- [ ] Add full branding: favicon, full-width navbar logo, and project name.
- [ ] Ensure accessibility and mobile responsiveness across the app.

---

## 📄 Documentation

- [ ] Finalize `README.md`:
  - [ ] Include current features.
  - [ ] Include future roadmap.
  - [ ] Add embedded video walkthrough.
  - [ ] Add finalized project branding.
- [ ] (Optional) Add diagrams or flowcharts.

---

## 🧪 Final Touches Before Deploy

- [ ] Final QA pass across desktop and mobile.
- [ ] Populate with sample resume/job data for demo.
- [ ] Setup deployment environment (MongoDB URI, secrets, etc.).
- [ ] Deploy backend to Render and frontend to Netlify.
- [ ] Test error handling and edge cases.

---

Made with ❤️ by Lisa J.

Built with Flask + MongoDB backend and React frontend

--- PRIORITY ADDITIONS ---
~~Auto-fill appliedDate when status is "Applied"~~
~~Auto-fill rejectedDate when status is "Rejection Received"~~
~~Add ability to edit/update existing job entries (status, notes, etc.)~~
~~Add dropdown for status: Saved, Applied, Hiring in Process, Rejection Received~~

--- UI + USABILITY ENHANCEMENTS ---

- Add ability to sort/filter jobs by status
  ~~Responsive layout for mobile use~~
  ~~Track job posting link and open directly from UI~~
  ~~Include resumeVersion field to track tailored resume versions per job~~
  ~~Include notes field for quick reminders or prep info~~

--- INTERVIEW + FOLLOW-UP SUPPORT ---

- Save interview questions and answers per job
- Reflection/journal section for interview debriefs
- Add follow-up reminders (1 week after applying, etc.)
- Track multiple stages of interviews if “Hiring in Process”

--- DATA AUTOMATION + INTEGRATION ---

- Paste job link → auto-parse fields like title, company, and location
- Future scraping support from job boards (LinkedIn, RemoteOK, etc.)
- Optional integration with calendar or email for reminders

--- LONG-TERM IDEAS ---

- Basic analytics dashboard: apps submitted, interview rate, etc.
- Convert app into a PWA for installable mobile experience
