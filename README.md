# 🏙️ Smart Community Help Hub

**Report local issues. Get them seen. Get them fixed.**

An AI-powered civic reporting platform that turns scattered community complaints into an organized, trackable public record.

![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase) ![Gemini](https://img.shields.io/badge/Google_Gemini-AI-blueviolet)

🚀 [Live Demo](https://smart-community-help-hub.vercel.app/) · 📂 [GitHub Repository](https://github.com/Eman-Nisar-Ahmad-dev/smart-community-help-hub)

---

## 📖 Table of Contents
- [Overview](#-overview)
- [The Problem It Solves](#-the-problem-it-solves)
- [Live URL](#-live-url)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [The AI Feature](#-the-ai-feature)
- [Tech Stack](#️-tools-services--models-used)
- [Getting Started (Local Setup)](#-how-to-run-this-project-locally)
- [Admin Access](#-admin-access)
- [Author](#-author)

## 📌 Overview
**Smart Community Help Hub** lets residents report local infrastructure issues — broken streetlights, water leaks, garbage overflow, road damage, and electricity faults — in one organized, public platform. Every report is automatically categorized and rewritten into a professional complaint by AI, then made visible to the community for tracking and upvoting.

## 🎯 The Problem It Solves
People regularly notice problems in their neighborhood but have no clear way to report them. Complaints get lost in scattered WhatsApp groups or never reach the right authority, leaving issues unresolved for weeks. This app gives residents a single, transparent place to report, track, and prioritize community issues.

**Built for**: residents of any neighborhood who want to report local civic issues, and community members who want visibility into what's being reported and resolved nearby.

## 🔗 Live URL
**[https://smart-community-help-hub.vercel.app](https://smart-community-help-hub.vercel.app)**

## ✨ Features

| Category | What it does |
|---|---|
| 📝 Report Submission | Title, description, area/location, and photo upload |
| 🤖 AI Categorization | Automatically classifies issues into 6 categories |
| ✍️ AI Complaint Rewriting | Turns informal descriptions into professional complaints |
| 📋 Public Reports Feed | Browse all reports as cards with photo, category, status |
| 🔍 Category Filtering | Filter the feed by issue type |
| ↕️ Sorting | Toggle between Most Recent and Most Upvoted |
| 👍 Community Voting | Upvote issues that matter most |
| 📄 Report Detail Page | Full view with raw + AI-rewritten complaint side by side |
| 🚦 Status Tracking | Pending / In Progress / Resolved badges |
| 🕒 Activity Timeline | Logs status changes with timestamps |
| 🔐 Admin Panel (`/admin`) | Password-protected status management |
| 📊 Insights Dashboard (`/stats`) | Totals, category breakdown chart, status breakdown |
| ℹ️ About Page | Explains the app's purpose and AI feature |
| 🖼️ Image Compression | Client-side compression before upload |
| 🎨 Full Visual Polish | Toasts, skeleton loading, empty states, responsive design |

## 📸 Screenshots

| Home | Reports Feed |
|---|---|
| ![Home](screenshots/home.png) | ![Reports](screenshots/reports.png) |

| Report Detail | Stats Dashboard |
|---|---|
| ![Detail](screenshots/detail.png) | ![Stats](screenshots/stats.png) |

| About  |
|---|---|
| ![About](screenshots/about.png) |

## 🤖 The AI Feature

When a user submits a report, their raw title and description are sent to **Google Gemini AI**, which performs two tasks in a single call:
1. **Categorizes** the issue into one of six fixed categories (Streetlight, Water, Garbage, Road, Electricity, Other)
2. **Rewrites** the informal description into a clear, professional, 2–4 sentence complaint suitable for submission to a local authority

**System prompt used:**
This runs server-side via a Next.js API route (`/api/analyze`), keeping the API key secure and never exposed to the browser.

## 🛠️ Tools, Services & Models Used

| Tool | Usage |
|---|---|
| Next.js (App Router, TypeScript) | Core framework |
| Tailwind CSS | Styling |
| Supabase | Postgres database + Storage (photos) |
| Google Gemini (`gemini-3.5-flash-lite`) | AI categorization & complaint rewriting |
| Vercel | Hosting & deployment |
| Git & GitHub | Version control |

## 🚀 How to Run This Project Locally

### Prerequisites
- Node.js installed
- A Supabase account and project
- A Google Gemini API key

### Setup
```bash
git clone https://github.com/Eman-Nisar-Ahmad-dev/smart-community-help-hub.git
cd smart-community-help-hub
npm install
```

Create a `.env.local` file in the root directory:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_chosen_admin_password

Set up the database — run this SQL in the Supabase SQL Editor:
```sql
create table reports (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  raw_description text not null,
  ai_category text,
  ai_complaint text,
  photo_url text,
  area text,
  status text default 'Pending',
  votes int default 0,
  created_at timestamp default now()
);

create table report_updates (
  id uuid default gen_random_uuid() primary key,
  report_id uuid references reports(id) on delete cascade,
  message text not null,
  created_at timestamp default now()
);
```

Create a public Storage bucket named `report-photos` in Supabase, then run:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## 🔐 Admin Access
The admin panel is available at `/admin`, protected by the password set in `NEXT_PUBLIC_ADMIN_PASSWORD`. It allows updating any report's status (Pending / In Progress / Resolved), which is automatically logged to that report's Activity Timeline.

## 👤 Author
**Eman Nisar Ahmad**
BS Information Technology Student
GitHub: [@Eman-Nisar-Ahmad-dev](https://github.com/Eman-Nisar-Ahmad-dev)

---

*Built as part of a final project — end-to-end designed, built, and deployed independently.*