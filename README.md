# 🚗 Servixo — Smart Vehicle Service Management System

> **The #1 Service Center Manager** — A real-time vehicle service tracking platform that brings full transparency between service centers, mechanics, and customers.

---

## 📌 Domain

**Automobile / Service Center Management**

## 🎯 Problem Statement

Traditional vehicle service centers lack transparency. Customers have no visibility into repair progress, mechanics lack a streamlined workflow, and admins struggle to manage jobs efficiently. **Servixo** solves this by providing a unified platform where:

- **Customers** can track their vehicle's repair status in real-time
- **Mechanics** can update job progress with a simple interface
- **Admins** can manage all jobs, mechanics, and billing in one dashboard
- **Managers** can oversee operations and performance

---

## 🛠️ Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| **Frontend** | React 19 + Vite 8                  |
| **Routing**  | React Router DOM v7                |
| **Icons**    | Lucide React                       |
| **Styling**  | Vanilla CSS (design system tokens) |
| **State**    | React Context API                  |
| **Language** | JavaScript (ES Modules)            |
| **Build**    | Vite                               |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ installed
- npm v9+

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/your-team/Servixo.git
cd Servixo

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📂 Project Structure

```
Servixo/
├── public/                        # Static assets
├── src/
│   ├── assets/                    # Images & logos (logo.png)
│   ├── authentication/            # Auth module
│   │   ├── css/
│   │   └── pages/
│   │       └── LoginPage.jsx      # Login page (role-based routing)
│   ├── admin/                     # Admin dashboard module
│   │   ├── css/
│   │   │   └── AdminDashboard.css
│   │   └── pages/
│   │       └── AdminDashboard.jsx # Admin overview & job management
│   ├── mechanic/                  # Mechanic dashboard module
│   │   ├── css/
│   │   │   └── MechanicDashboard.css
│   │   └── pages/
│   │       └── MechanicDashboard.jsx  # Mechanic job workspace
│   ├── manager/                   # Manager dashboard module
│   │   └── pages/
│   │       └── ManagerDashboard.jsx   # Manager overview panel
│   ├── customer/                  # Customer dashboard module
│   │   └── pages/
│   │       └── CustomerDashboard.jsx  # Customer vehicle tracking
│   ├── home/                      # Public landing page module
│   │   ├── css/
│   │   │   └── LandingPage.css
│   │   └── pages/
│   │       └── LandingPage.jsx    # Public homepage with tracker
│   ├── components/                # Shared UI components
│   │   ├── Header.jsx             # Top navigation header
│   │   ├── Header.css
│   │   ├── Sidebar.jsx            # Role-based sidebar navigation
│   │   └── Sidebar.css
│   ├── layouts/
│   │   └── DashboardLayout.jsx    # Shared dashboard layout wrapper
│   ├── context/
│   │   └── DataContext.jsx        # Global state (jobs, users, actions)
│   ├── App.jsx                    # Route definitions
│   ├── App.css                    # App-level styles
│   ├── index.css                  # Design system tokens & globals
│   └── main.jsx                   # React entry point
├── index.html                     # HTML template
├── package.json
├── vite.config.js
└── README.md
```

---

## 🗺️ Routes / Screens

| Route         | Page Component       | Role     | Description                              |
|---------------|----------------------|----------|------------------------------------------|
| `/`           | LandingPage          | Public   | Homepage with live vehicle tracker        |
| `/login`      | LoginPage            | Public   | Role-based login (admin/mechanic/mgr)    |
| `/admin`      | AdminDashboard       | Admin    | Job management, billing, mechanic mgmt   |
| `/mechanic`   | MechanicDashboard    | Mechanic | Update job status, add notes              |
| `/manager`    | ManagerDashboard     | Manager  | Operational overview & analytics          |
| `/customer`   | CustomerDashboard    | Customer | View vehicle status & history             |

---

## 🧩 Features by Role

### 🏠 Public Landing Page (`/`)
- Hero section with branding and tagline
- **Live Vehicle Tracker** — Enter Job Card Number + Mobile to trace status
- 7-step progress stepper (Received → Inspection → Repairing → Quality Check → Ready → Payment → Delivered)
- **Mechanic Details** — Shows assigned mechanic info (name, phone, email, certification, experience)
- **Payment & Bill Summary** — Itemized bill table with subtotal, tax, total
- **Download Bill PDF** button
- **Pay Now** button
- 4 feature highlight cards (Real-time Tracking, Transparent Flow, Expert Mechanics, Digital Job Card)
- Contact footer with address, phone, email, legal links
- Responsive design (mobile/tablet/desktop)

### 🔐 Login Page (`/login`)
- Role-based authentication
- Routes to respective dashboards based on role
- Demo credentials support

### 👨‍💼 Admin Dashboard (`/admin`)
- View all active job cards
- Create new job cards
- Assign mechanics to jobs
- Track job statuses across all stages
- Manage mechanic credentials
- Approve/Review bills submitted by mechanics
- Sidebar navigation with role-based links

### 🔧 Mechanic Dashboard (`/mechanic`)
- View assigned job cards
- Update job status step-by-step
- Add repair notes and observations
- Submit itemized bill for completed work
- Real-time job workspace

### 📊 Manager Dashboard (`/manager`)
- Operational overview of all jobs
- Performance monitoring
- Cross-role visibility

### 👤 Customer Dashboard (`/customer`)
- View personal vehicle service status
- Track repair progress
- View assigned mechanic details

---

## 📊 Data Models

### Job Card

```javascript
{
  id: 'JOB-2024-001',           // Unique identifier
  vehicle: 'Toyota Camry 2021',  // Vehicle details
  customer: 'yuvraj dhadhal',    // Customer name
  mechanic: 'prince viradiya',   // Assigned mechanic
  status: 'REPAIRING',           // Current status enum
  date: 'May 10',                // Job creation date
  time: '2:30 PM',               // Job creation time
  delivery: 'May 12',            // Estimated delivery
  issues: [                      // List of reported issues
    'Brake pads worn',
    'Oil change needed'
  ],
  notes: [                       // Communication log
    {
      sender: 'prince viradiya',
      text: 'Started working on brakes',
      time: '10:30 AM'
    }
  ],
  bill: {                        // Billing data (null until generated)
    items: [
      { desc: 'Oil filter', price: 20 },
      { desc: 'Labor', price: 100 }
    ],
    subtotal: 120,
    approved: true,
    paid: false
  }
}
```

**Status Flow:**
```
RECEIVED → INSPECTION → REPAIRING → QUALITY_CHECK → READY → PAYMENT → DELIVERED
```

### User

```javascript
{
  id: '2',
  name: 'prince viradiya',
  role: 'mechanic',          // Enum: admin | mechanic | customer | manager
  credentials: true          // Whether login credentials are generated
}
```

### Bill (nested in Job)

```javascript
{
  items: [
    { desc: 'Engine Oil Change', price: 45 },
    { desc: 'Brake Pad Replacement', price: 65 },
    { desc: 'Labor Charges', price: 120 }
  ],
  subtotal: 230,
  approved: false,   // Admin approval status
  paid: false        // Customer payment status
}
```

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                    React App (Vite)                  │
├─────────────────────────────────────────────────────┤
│                                                     │
│   ┌──────────┐    ┌──────────────────────────────┐  │
│   │  Router   │───▶│  Route-Based Page Rendering  │  │
│   └──────────┘    └──────────────────────────────┘  │
│                              │                      │
│          ┌───────────────────┼──────────────┐       │
│          │                   │              │       │
│   ┌──────▼──────┐  ┌────────▼────┐  ┌──────▼──┐   │
│   │   Public    │  │  Dashboard  │  │  Auth   │    │
│   │ LandingPage │  │   Layout    │  │ Login   │    │
│   └─────────────┘  └─────┬──────┘  └─────────┘    │
│                          │                          │
│            ┌─────────────┼─────────────┐            │
│            │             │             │            │
│     ┌──────▼──┐  ┌───────▼───┐  ┌─────▼─────┐     │
│     │  Admin  │  │ Mechanic  │  │ Customer  │      │
│     │Dashboard│  │ Dashboard │  │ Dashboard │      │
│     └─────────┘  └───────────┘  └───────────┘      │
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │         DataContext (Global State)           │   │
│   │  jobs[] · users[] · addJob · updateStatus   │   │
│   │  sendMessage · submitBill · approveBill     │   │
│   │  makePayment · addMechanic · genCredentials │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │        Shared Components                    │   │
│   │   Header · Sidebar · DashboardLayout        │   │
│   └─────────────────────────────────────────────┘   │
│                                                     │
│   ┌─────────────────────────────────────────────┐   │
│   │     Design System (index.css)               │   │
│   │  CSS Variables · Buttons · Forms · Cards    │   │
│   │  Badges · Sidebar · Dashboard Layout        │   │
│   └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🎨 Design System

All colors and tokens are defined in `src/index.css`:

| Token                    | Value     | Usage                    |
|--------------------------|-----------|--------------------------|
| `--primary-blue`         | `#2563eb` | Primary actions & links  |
| `--primary-blue-hover`   | `#1d4ed8` | Button hover states      |
| `--primary-blue-light`   | `#eff6ff` | Light blue backgrounds   |
| `--primary-green`        | `#16a34a` | Success / completed      |
| `--bg-main`              | `#f9fafb` | Page background          |
| `--bg-card`              | `#ffffff` | Card backgrounds         |
| `--text-main`            | `#111827` | Primary text             |
| `--text-muted`           | `#6b7280` | Secondary text           |
| `--border-light`         | `#e5e7eb` | Borders & dividers       |

**Status Badges:**
| Status      | Background | Text Color |
|-------------|------------|------------|
| REPAIRING   | `#e0e7ff`  | `#3730a3`  |
| INSPECTION  | `#fef3c7`  | `#92400e`  |
| READY       | `#dcfce7`  | `#166534`  |

---

## 🧪 Demo Credentials

On the landing page tracker, use these demo values:

| Field            | Value          |
|------------------|----------------|
| Job Card Number  | `JOB-2024-001` |
| Mobile Number    | `555-0101`     |

---

## 👥 Team

| Member            | Role           |
|-------------------|----------------|
| Yuvraj Dhadhal    | Developer      |

---

## 📜 License

This project was built for **Hackathon 2026**. All rights reserved.
