# RaiseCare — Parent Delegation & Domestic Staff Sync

> A clean, high-clarity, low-cognitive-load Single Page Application (SPA) designed for overwhelmed parents to effortlessly delegate, track, and review daily tasks with household caregivers (nannies, cooks, tutors).

---

## 🎯 Product Mission & UX Philosophy

Parenting with domestic support often introduces a hidden administrative burden: constant texting, unclear task statuses, and missed health or educational routines. 

**RaiseCare** solves this by offering:
- **Low Cognitive Load**: Clean visual hierarchy, zero visual clutter, and reassuring status indicators.
- **Role-Based Delegation**: Instant clarity on whether a task is owned by the **Nanny**, **Cook**, or **Tutor**.
- **Real-Time Progress**: Dynamic completion bars showing how each child's day is progressing at a single glance.
- **Continuous Quality Loop**: 5-star ratings and notes allowing parents to guide staff and preserve positive reinforcement.

---

## 🛠 Tech Stack & Design System

- **React 18** (TypeScript, `useState` reactive state architecture)
- **Material UI (MUI v5)**: Pure Material Design system using `@mui/material` and `@mui/icons-material`
- **Vite**: Ultra-fast development and optimized production bundling
- **Strict Constraint**: Single-file implementation (`App.tsx`) strictly under 200 lines of code (current: **181 lines**).

---

## 🚀 Key Functional Requirements Delivered

### 1. Role & Child Management
- Switch effortlessly between child profiles (**Liam**, 4 yrs and **Maya**, 7 yrs) with dedicated color avatars.
- View distinct role designations (`Nanny`, `Cook`, `Tutor`) styled with contextual Material chips.

### 2. Interactive Checklist & Progress Tracker
- Interactive checklist with strike-through styling and immediate visual feedback.
- Dynamic **progress tracker** automatically calculating `% Complete` and total completed count.
- Filter tasks by role chip (`All`, `Nanny`, `Cook`, `Tutor`).

### 3. Feedback Loop & Improvement Tracker
- Interactive rating component (1–5 Stars) and parent feedback submission.
- Scrollable history of past observations linked to the active child profile for tracking quality over time.

---

## 📁 Repository Structure

```
├── App.tsx             # Canonical single-file SPA (< 200 LOC)
├── src/
│   ├── App.tsx         # Application source (181 lines)
│   └── main.tsx        # React 18 DOM mount point
├── index.html          # HTML5 entry with Roboto typography
├── package.json        # Dependencies & scripts
├── tsconfig.json       # TypeScript strict configuration
├── vite.config.ts      # Vite build configuration
├── README.md           # Product documentation & quickstart
└── JOURNAL.md          # Principal AI Product Engineer build journal
```

---

## ⚡ Quickstart

### Prerequisites
- Node.js 18+ and npm

### Installation
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 📐 Constraint Verification

| Metric | Target | Actual | Status |
|---|---|---|---|
| Single-file App | `App.tsx` | `App.tsx` | ✅ Met |
| Max Line Count | <= 200 lines | **181 lines** | ✅ Met |
| UI Framework | MUI v5 Pure | `@mui/material` | ✅ Met |
| Framework | React 18 + TS | React 18 + TS | ✅ Met |
