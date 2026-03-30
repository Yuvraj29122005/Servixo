<p align="center">
  <img src="src/assets/logo.png" alt="Servixo Logo" width="220" />
</p>

<h1 align="center">🚗 Servixo — Smart Vehicle Service Management System</h1>

<p align="center">
  <strong>A full-stack MERN application that brings real-time transparency to vehicle service centers.</strong><br/>
  Track repairs live · Manage job cards digitally · Streamline mechanic workflows · Generate instant invoices
</p>

<p align="center">
  <a href="https://www.linkedin.com/posts/yuvraj-dhadhal-876a57356_hackathon-ai-fullstackdevelopment-ugcPost-7444029092368150528-i1mM?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFjJ4RoBh8Yw-uG2eBXggJaXKbzA1eDoUmY" target="_blank">
    <img src="https://img.shields.io/badge/🎥%20View%20Demo%20Video-LinkedIn-blue?style=for-the-badge&logo=linkedin" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Hackathon-2026-FF6B6B?style=for-the-badge" />
</p>

---

## ✨ Overview

**Servixo** is a next-generation vehicle service management platform designed to digitize and automate service center workflows.

It eliminates manual tracking and introduces **real-time visibility**, **role-based control**, and **automated billing systems**.

---

## 🎯 Why Servixo?

Traditional service centers suffer from:

- ❌ No transparency  
- ❌ Paper-based job tracking  
- ❌ Poor communication  
- ❌ Billing confusion  

### ✅ Servixo Solves It:

- Real-time job tracking for customers  
- Fully digital job card system  
- Dedicated dashboards for admin & mechanics  
- Automated billing with invoice generation  

---

## 🔥 Key Features

- 🚀 Real-time vehicle tracking (7-stage pipeline)
- 📋 Smart digital job cards
- 🔧 Mechanic dashboard with updates
- 💰 Automated billing system (PDF support)
- 🔐 Secure JWT authentication
- 📊 Admin analytics & reports
- ⚙️ Centralized system settings

---

## 🛠️ Tech Stack

### Frontend
- React 19 + Vite
- React Router DOM
- Context API
- jsPDF
- Vanilla CSS

### Backend
- Node.js + Express
- MongoDB Atlas
- Mongoose ODM
- JWT Authentication
- bcryptjs


## 📂 Project Structure

```
Servixo/
├── 📁 server/                          # 🔧 Backend (Express + MongoDB)
│   ├── .env                            # Environment variables (gitignored)
│   ├── .env.example                    # Template for environment setup
│   ├── package.json                    # Server dependencies
│   └── 📁 src/
│       ├── index.js                    # Express app entry point
│       ├── 📁 config/
│       │   └── db.js                   # MongoDB Atlas connection
│       ├── 📁 middleware/
│       │   └── auth.js                 # JWT verification & role guards
│       ├── 📁 models/
│       │   ├── User.js                 # User schema (admin, mechanic)
│       │   ├── Job.js                  # Job card schema with billing
│       │   ├── Notification.js         # Notification schema
│       │   └── AppSettings.js          # System settings schema
│       ├── 📁 routes/
│       │   ├── auth.js                 # Login & token generation
│       │   ├── jobs.js                 # CRUD for job cards
│       │   ├── users.js               # User management endpoints
│       │   ├── notifications.js        # Notification endpoints
│       │   └── settings.js             # App settings endpoints
│       └── 📁 seed/
│           ├── seedAdmin.js            # Seed default admin user
│           └── migrateJobs.js          # Job data migration script
│
├── 📁 src/                             # 🎨 Frontend (React + Vite)
│   ├── main.jsx                        # React entry point
│   ├── App.jsx                         # Route definitions
│   ├── App.css                         # App-level styles
│   ├── index.css                       # Design system tokens & globals
│   │
│   ├── 📁 assets/                      # Static assets
│   │   ├── logo.png                    # Servixo brand logo
│   │   └── hero.png                    # Landing page hero image
│   │
│   ├── 📁 data/                        # State Management
│   │   ├── AuthContext.jsx             # Authentication context (JWT)
│   │   └── DataContext.jsx             # Global data context (jobs, users)
│   │
│   ├── 📁 components/                  # Shared Components
│   │   ├── Header.jsx / Header.css     # Top navigation bar
│   │   ├── Sidebar.jsx / Sidebar.css   # Role-based sidebar navigation
│   │   └── ProtectedRoute.jsx          # Auth guard for private routes
│   │
│   ├── 📁 layouts/                     # Page Layouts
│   │   ├── DashboardLayout.jsx         # Admin layout (sidebar + header)
│   │   ├── MechanicLayout.jsx          # Mechanic layout (header only)
│   │   └── MechanicLayout.css
│   │
│   ├── 📁 home/                        # 🏠 Public Landing Page
│   │   ├── 📁 css/
│   │   │   └── LandingPage.css
│   │   └── 📁 pages/
│   │       └── LandingPage.jsx         # Homepage with vehicle tracker
│   │
│   ├── 📁 authentication/             # 🔐 Login Module
│   │   ├── 📁 css/
│   │   │   └── LoginPage.css
│   │   └── 📁 pages/
│   │       └── LoginPage.jsx           # Role-based login page
│   │
│   ├── 📁 admin/                       # 👨‍💼 Admin Dashboard Module
│   │   ├── 📁 css/
│   │   │   └── AdminDashboard.css
│   │   └── 📁 pages/
│   │       ├── AdminDashboard.jsx      # Overview & statistics
│   │       ├── JobCards.jsx             # Job card management
│   │       ├── JobDetail.jsx           # Individual job details
│   │       ├── ServiceWorkflow.jsx     # Visual service pipeline
│   │       ├── Mechanics.jsx           # Mechanic management
│   │       ├── BillManagement.jsx      # Bill approval & tracking
│   │       ├── Reports.jsx             # Revenue & analytics reports
│   │       └── Settings.jsx            # System configuration
│   │
│   └── 📁 mechanic/                    # 🔧 Mechanic Dashboard Module
│       ├── 📁 css/
│       │   ├── MechanicDashboard.css
│       │   └── MechanicProfile.css
│       └── 📁 pages/
│           ├── MechanicDashboard.jsx   # Job workspace & status updates
│           ├── MechanicNotifications.jsx # Mechanic notifications
│           └── MechanicProfile.jsx     # Mechanic profile management
│
├── index.html                          # HTML entry point
├── vite.config.js                      # Vite configuration
├── package.json                        # Frontend dependencies
├── .gitignore
└── README.md                           # 📖 You are here!
```

---

## 🚀 Getting Started

Follow these steps to get Servixo running on your local machine.

### Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | v18 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | v9 or higher | Comes with Node.js |
| **MongoDB Atlas** account | Free tier works | [mongodb.com/atlas](https://www.mongodb.com/atlas) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

---

### 1. Clone the Repository

```bash
git clone https://github.com/Yuvraj29122005/Servixo.git
cd Servixo
```

---

### 2. Setup the Backend Server

```bash
# Navigate to the server directory
cd server

# Install server dependencies
npm install
```

#### Configure Environment Variables

Create a `.env` file inside the `server/` directory:

```bash
# Copy the example env file
cp .env.example .env
```

Now edit `server/.env` with your own values:

```env
# MongoDB Atlas connection string
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# Database name
MONGODB_DB_NAME=servixo

# Server port
PORT=4000
```

> 💡 **How to get your MongoDB URI:**
> 1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and create a free account
> 2. Create a new cluster (free M0 tier is fine)
> 3. Click **"Connect"** → **"Connect your application"**
> 4. Copy the connection string and replace `<username>`, `<password>`, and `<cluster>` with your details
> 5. Make sure to whitelist your IP address in **Network Access** (or use `0.0.0.0/0` for development)

#### Start the Backend Server

```bash
# Development mode (auto-restart on changes)
npm run dev

# OR production mode
npm start
```

You should see:
```
🚗 Servixo API listening on port 4000
✅ Connected to MongoDB Atlas
```

#### Verify the Server

Open your browser and navigate to:
```
http://localhost:4000/api/health
```

You should see:
```json
{ "status": "ok", "message": "Servixo API is running" }
```

---

### 3. Setup the Frontend Client

Open a **new terminal** and navigate to the project root:

```bash
# Make sure you're in the project root (not server/)
cd Servixo

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start at:
```
http://localhost:5173
```

---

### 4. Seed the Database

Before logging in for the first time, you need to create the default admin user:

```bash
# From the server/ directory
cd server

# Seed the admin account
npm run seed:admin
```

This creates:
| Field | Value |
|-------|-------|
| **Email** | `admin@servixo.com` |
| **Password** | `servixo@123` |
| **Role** | `admin` |

---

### 5. Access the Application

Once both servers are running, open your browser:

| Service | URL | Description |
|---------|-----|-------------|
| 🌐 **Frontend** | [http://localhost:5173](http://localhost:5173) | Main application |
| 🔧 **Backend API** | [http://localhost:4000](http://localhost:4000) | REST API server |
| 💚 **Health Check** | [http://localhost:4000/api/health](http://localhost:4000/api/health) | API status |

---

### 📦 Build for Production

```bash
# From the project root
npm run build
npm run preview
```

---

## 🔑 Environment Variables

### Server (`server/.env`)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | ✅ Yes | — | MongoDB Atlas connection string |
| `MONGODB_DB_NAME` | ❌ No | `servixo` | Database name |
| `PORT` | ❌ No | `4000` | API server port |
| `JWT_SECRET` | ❌ No | `dev-secret-servixo` | Secret key for JWT signing (change in production!) |

---

## 🗺️ Application Routes

### Public Routes (No Login Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `LandingPage` | Public homepage with live vehicle tracker, service info, and booking |
| `/login` | `LoginPage` | Role-based login (Admin / Mechanic) |

### Admin Routes (🔒 Admin Only)

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin` | `AdminDashboard` | Overview with stats, recent jobs, and quick actions |
| `/admin/jobs` | `JobCards` | Full job card management (create, edit, delete, assign) |
| `/admin/workflow` | `ServiceWorkflow` | Visual pipeline of all jobs across service stages |
| `/admin/workflow/:jobId` | `JobDetail` | Detailed view of a specific job card |
| `/admin/mechanics` | `Mechanics` | Manage mechanics (add, edit, generate credentials) |
| `/admin/bills` | `BillManagement` | Review and approve mechanic-submitted bills |
| `/admin/reports` | `Reports` | Revenue charts, job analytics, and trend reports |
| `/admin/settings` | `Settings` | System configuration and preferences |

### Mechanic Routes (🔒 Mechanic Only)

| Route | Component | Description |
|-------|-----------|-------------|
| `/mechanic` | `MechanicDashboard` | Assigned jobs workspace with status stepper |
| `/mechanic/notifications` | `MechanicNotifications` | Job assignment and system notifications |
| `/mechanic/profile` | `MechanicProfile` | Personal profile management |

---

## 🧩 Features by Role

### 🏠 Public Landing Page

<table>
<tr>
<td width="50%">

**Vehicle Tracker**
- Enter Job Card Number + Mobile to view status
- 7-step visual progress stepper
- View assigned mechanic details
- View itemized bill and payment status

</td>
<td width="50%">

**Public Info**
- Hero section with branding
- Feature highlight cards
- Service center contact details
- Responsive design (mobile/tablet/desktop)

</td>
</tr>
</table>

### 👨‍💼 Admin Dashboard

<table>
<tr>
<td width="33%">

**📋 Job Management**
- Create new job cards
- Assign mechanics to jobs
- Track all job statuses
- Delete job cards

</td>
<td width="33%">

**👷 Mechanic Management**
- Add new mechanics
- Generate login credentials
- View mechanic workload
- Edit mechanic details

</td>
<td width="33%">

**💰 Billing & Reports**
- Approve/reject bills
- View revenue analytics
- Generate visual reports
- Track payment status

</td>
</tr>
</table>

### 🔧 Mechanic Dashboard

<table>
<tr>
<td width="50%">

**Job Workspace**
- View assigned job cards
- Step-by-step status updates
- Progress backtracking support
- Add repair notes and observations

</td>
<td width="50%">

**Profile & Billing**
- Submit itemized bills
- View notification alerts
- Manage personal profile
- Track completed jobs

</td>
</tr>
</table>

---

## 🔌 API Endpoints

Base URL: `http://localhost:4000/api`

### 🔐 Authentication

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/login` | Login and receive JWT token | ❌ |

### 📋 Jobs

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/jobs` | Get all job cards | ✅ |
| `POST` | `/api/jobs` | Create a new job card | ✅ Admin |
| `PATCH` | `/api/jobs/:id` | Update job (status, notes, bill) | ✅ |
| `DELETE` | `/api/jobs/:id` | Delete a job card | ✅ Admin |

### 👤 Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/users` | Get all users | ✅ |
| `POST` | `/api/users` | Add a new user/mechanic | ✅ Admin |
| `PATCH` | `/api/users/:id` | Update user details | ✅ |

### 🔔 Notifications

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/notifications` | Get notifications | ✅ |
| `POST` | `/api/notifications` | Create notification | ✅ |

### ⚙️ Settings

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/settings` | Get app settings | ✅ |
| `PUT` | `/api/settings` | Update app settings | ✅ Admin |

### 💚 Health

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/health` | Server health check | ❌ |

---

## 📊 Database Models

### User Schema

```javascript
{
  id: String,              // Unique identifier (e.g., "1", "2")
  name: String,            // Full name
  email: String,           // Login email (unique)
  passwordHash: String,    // bcrypt hashed password
  role: String,            // 'admin' | 'mechanic' | 'customer' | 'manager'
  credentials: Boolean,    // Whether login is active
  phone: String,           // Contact number
  mechanicId: String,      // Mechanic-specific ID
  specialization: String,  // Area of expertise
  timestamps: true         // createdAt, updatedAt
}
```

### Job Schema

```javascript
{
  id: String,              // Job identifier (e.g., "JOB-2024-001")
  vehicle: String,         // Vehicle make & model
  vehicleNumber: String,   // Registration/license plate
  customer: String,        // Customer name
  customerPhone: String,   // Customer contact
  mechanic: String,        // Assigned mechanic name
  status: String,          // Current state in pipeline (see below)
  date: String,            // Display date
  time: String,            // Display time
  delivery: String,        // Estimated delivery date
  issues: [String],        // List of reported problems
  serviceType: String,     // Type of service requested
  notes: [{                // Communication log
    sender: String,
    text: String,
    time: String
  }],
  bill: {                  // Billing data
    items: [{
      desc: String,
      price: Number
    }],
    subtotal: Number,
    approved: Boolean,     // Admin approval
    paid: Boolean          // Payment status
  },
  timestamps: true         // createdAt, updatedAt
}
```

### Service Status Pipeline

```
┌──────────┐    ┌────────────┐    ┌───────────┐    ┌───────────────┐    ┌───────┐    ┌───────────┐
│ RECEIVED │───▶│ INSPECTION │───▶│ REPAIRING │───▶│ QUALITY_CHECK │───▶│ READY │───▶│ DELIVERED │
└──────────┘    └────────────┘    └───────────┘    └───────────────┘    └───────┘    └───────────┘
     📥              🔍               🔧                ✅                🏁             🚗
```

---

## 🏗️ Architecture Overview

```
┌───────────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                         │
│                        http://localhost:5173                          │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────┐    ┌──────────────────────────────────────────────┐  │
│  │   React     │    │          Route-Based Page Rendering          │  │
│  │   Router    │───▶│  Public | Admin | Mechanic | Auth Pages     │  │
│  └─────────────┘    └──────────────────────────────────────────────┘  │
│                                    │                                  │
│          ┌─────────────────────────┼────────────────┐                 │
│          │                         │                │                 │
│   ┌──────▼──────┐   ┌─────────────▼─────┐   ┌──────▼──────┐         │
│   │  Landing    │   │  Admin Dashboard  │   │  Mechanic   │         │
│   │  Page       │   │  (8 sub-pages)    │   │  Workspace  │         │
│   └─────────────┘   └───────────────────┘   └─────────────┘         │
│                                                                       │
│   ┌───────────────────────────────────────────────────────────────┐   │
│   │              Context API (Global State)                       │   │
│   │  AuthContext: JWT token, user session, login/logout           │   │
│   │  DataContext: jobs[], users[], CRUD operations                │   │
│   └───────────────────────────────────────────────────────────────┘   │
│                              │ HTTP (fetch)                           │
└──────────────────────────────┼────────────────────────────────────────┘
                               │
                               ▼
┌───────────────────────────────────────────────────────────────────────┐
│                     SERVER (Express + Node.js)                        │
│                      http://localhost:4000                            │
├───────────────────────────────────────────────────────────────────────┤
│                                                                       │
│   ┌────────────────┐     ┌──────────────┐     ┌───────────────────┐  │
│   │  CORS + JSON   │────▶│  JWT Auth    │────▶│  Route Handlers   │  │
│   │  Middleware     │     │  Middleware  │     │  (5 modules)      │  │
│   └────────────────┘     └──────────────┘     └───────────────────┘  │
│                                                        │              │
│   Routes: /api/auth  /api/jobs  /api/users  /api/notifications       │
│           /api/settings  /api/health                                  │
│                                                        │              │
│   ┌────────────────────────────────────────────────────▼──────────┐   │
│   │                    Mongoose ODM Layer                          │   │
│   │   Models: User · Job · Notification · AppSettings            │   │
│   └────────────────────────────────────────────────────┬──────────┘   │
│                                                        │              │
└────────────────────────────────────────────────────────┼──────────────┘
                                                         │
                                                         ▼
                               ┌─────────────────────────────────────┐
                               │         MongoDB Atlas (Cloud)        │
                               │       Database: servixo              │
                               │  Collections: users, jobs,           │
                               │  notifications, appsettings          │
                               └─────────────────────────────────────┘
```

---

## 🎨 Design System

Servixo uses a custom CSS design system with consistent tokens defined in `src/index.css`:

### Color Palette

| Token | Value | Preview | Usage |
|-------|-------|---------|-------|
| `--primary-blue` | `#2563eb` | 🔵 | Primary actions & links |
| `--primary-blue-hover` | `#1d4ed8` | 🔷 | Button hover states |
| `--primary-blue-light` | `#eff6ff` | 🔹 | Light blue backgrounds |
| `--primary-green` | `#16a34a` | 🟢 | Success & completed states |
| `--bg-main` | `#f9fafb` | ⬜ | Page background |
| `--bg-card` | `#ffffff` | ◻️ | Card backgrounds |
| `--text-main` | `#111827` | ⬛ | Primary text |
| `--text-muted` | `#6b7280` | 🔘 | Secondary text |
| `--border-light` | `#e5e7eb` | ▫️ | Borders & dividers |

### Status Badge Colors

| Status | Background | Text | Meaning |
|--------|-----------|------|---------|
| `RECEIVED` | `#f3f4f6` | `#374151` | Job received, awaiting assignment |
| `INSPECTION` | `#fef3c7` | `#92400e` | Vehicle under inspection |
| `REPAIRING` | `#e0e7ff` | `#3730a3` | Active repair in progress |
| `QUALITY_CHECK` | `#fce7f3` | `#9d174d` | Post-repair quality verification |
| `READY` | `#dcfce7` | `#166534` | Vehicle ready for pickup |
| `DELIVERED` | `#d1fae5` | `#065f46` | Vehicle delivered to customer |

---

## 🧪 Demo Credentials

### Admin Login

| Field | Value |
|-------|-------|
| **Email** | `admin@servixo.com` |
| **Password** | `servixo@123` |
| **Role Tab** | Select **"Manager"** |

> ⚠️ You must run `npm run seed:admin` in the server directory first!

### Mechanic Login

Mechanic accounts are created by the admin through the **Admin Dashboard → Mechanics** page.  
Once credentials are generated, mechanics can login with their assigned email and password.

### Public Vehicle Tracker

On the landing page, use any valid job card number and associated mobile number to track a vehicle.

---

## 🖼️ Screenshots

> 📸 _Screenshots can be added here after deployment. Capture the following pages:_
> - Landing Page with Vehicle Tracker
> - Admin Dashboard Overview
> - Job Card Management
> - Mechanic Workspace
> - Bill Generation & PDF Export
> - Login Page

---

## 🧑‍💻 Quick Command Reference

| Command | Location | Description |
|---------|----------|-------------|
| `npm install` | `/` (root) | Install frontend dependencies |
| `npm run dev` | `/` (root) | Start frontend dev server (port 5173) |
| `npm run build` | `/` (root) | Build frontend for production |
| `npm run preview` | `/` (root) | Preview production build locally |
| `npm install` | `/server` | Install backend dependencies |
| `npm run dev` | `/server` | Start backend with nodemon (port 4000) |
| `npm start` | `/server` | Start backend in production mode |
| `npm run seed:admin` | `/server` | Create default admin user in database |
| `npm run migrate:jobs` | `/server` | Run job data migration script |

---

## 🔧 Troubleshooting

<details>
<summary><strong>❌ MongoDB Connection Failed</strong></summary>

- Verify your `MONGODB_URI` in `server/.env` is correct
- Ensure your IP is whitelisted in MongoDB Atlas → **Network Access**
- Check that your cluster is **active** (not paused) in MongoDB Atlas
- Try using `0.0.0.0/0` in Network Access for development
</details>

<details>
<summary><strong>❌ CORS Errors in Browser</strong></summary>

- Make sure the backend server is running on port `4000`
- The server allows all origins by default (`origin: '*'`)
- Check if any browser extensions are blocking requests
</details>

<details>
<summary><strong>❌ Login Fails with "Invalid credentials"</strong></summary>

- Run `npm run seed:admin` in the `server/` directory to create the default admin
- Use `admin@servixo.com` / `servixo@123` with the **Manager** tab selected
- Mechanic accounts must be created via the admin panel first
</details>

<details>
<summary><strong>❌ Frontend shows blank page</strong></summary>

- Ensure both frontend (`npm run dev` in root) and backend (`npm run dev` in server/) are running
- Check browser console for JavaScript errors
- Verify `http://localhost:4000/api/health` returns a valid response
</details>

---

## 👥 Team

<table>
<tr>
<td align="center">
  <strong>Yuvraj Dhadhal</strong><br/>
  <sub>Full-Stack Developer</sub><br/>
  <a href="https://github.com/Yuvraj29122005">GitHub</a>
</td>
</tr>
</table>

---

## 📜 License

This project was built for **Hackathon 2026**. All rights reserved.

---

<p align="center">
  <strong>⭐ If you liked this project, give it a star on GitHub! ⭐</strong>
</p>

<p align="center">
  Made with ❤️ by <a href="https://github.com/Yuvraj29122005">Yuvraj Dhadhal</a>
</p>
