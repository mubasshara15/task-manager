# 📋 Task Manager

A modern full-stack Task Manager application built with **Next.js**, **MongoDB**, and **Tailwind CSS**.

This application allows users to create, update, complete, search, filter, and manage daily tasks through a clean, responsive interface.

---

## ✨ Features

- ✅ Create Tasks
- ✏️ Edit Existing Tasks
- 🗑️ Delete Tasks
- ☑️ Mark Tasks as Completed / Pending
- 🔍 Search Tasks
- 🏷️ Filter Tasks (All / Pending / Completed)
- 📊 Live Dashboard Statistics
- 📈 Progress Tracking
- 🎨 Modern Dark UI
- 📱 Responsive Design
- 🔔 Toast Notifications
- ⚡ Smooth Animations with Framer Motion

---

## 🛠️ Tech Stack

### Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React Icons
- React Hot Toast

### Backend
- Next.js API Routes

### Database
- MongoDB Atlas
- Mongoose

---

## 📁 Project Structure

```
task-manager/
│
├── app/
│   ├── api/tasks/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Stats.tsx
│   ├── Progress.tsx
│   ├── SearchBar.tsx
│   ├── FilterTabs.tsx
│   ├── TaskForm.tsx
│   ├── TaskItem.tsx
│   └── EmptyState.tsx
│
├── lib/
│   └── mongodb.ts
│
├── models/
│   └── Task.ts
│
├── public/
│
└── package.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mubasshara15/task-manager.git
```

### 2. Navigate to the project

```bash
cd task-manager
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the project root.

```env
MONGODB_URI=YOUR_MONGODB_CONNECTION_STRING
```

### 5. Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📸 Application Preview

### Dashboard

- Modern Dark Interface
- Live Statistics
- Progress Tracking
- Search & Filters
- Responsive Layout

> Add screenshots here after deployment.

---

## 🔮 Future Improvements

- User Authentication (Auth.js + bcrypt)
- Task Categories
- Due Dates
- Priority Levels
- Drag & Drop Task Sorting
- PostgreSQL Support
- Email Notifications
- Dashboard Charts
- Light/Dark Theme Toggle

---

## 👩‍💻 Author

**Mubasshara**

Aspiring Full-Stack Software Engineer

GitHub:
https://github.com/mubasshara15

---

## 📄 License

This project was developed for learning and internship evaluation purposes.