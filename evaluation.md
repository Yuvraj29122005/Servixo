# Servixo - Evaluation & Viva Preparation Guide

This document is designed to help you prepare for your project evaluation or viva. It breaks down the technical details, architecture, features, and common questions you might be asked regarding the **Servixo** project.

---

## 1. Project Overview & Extra Functions

**Servixo** is a comprehensive, full-stack vehicle service management system designed to streamline communication between mechanics, admins, and vehicle owners. 

### Functionalities Used:
1. **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for **Admin** and **Mechanic** roles protected by JWT Authentication.
2. **Real-time Job Tracking (Public):** A customer-facing tracking portal to view live vehicle service progress using a Job ID and Phone Number.
3. **Admin Dashboard:** Displays dynamic analytics (completed vs active jobs), allows admins to create new Jobcards, assign mechanics, and heavily manage billing/approval workflows.
4. **Mechanic Dashboard:** A dedicated workspace where mechanics see assigned vehicles, update service stages via an interactive Step Tracker, and submit dynamic bills (itemized lists) for admin approval.
5. **Re-Repair / Backtracking Logic:** A custom extra feature allowing mechanics to securely revert a vehicle’s progress backward (e.g., from "Quality Check" back to "Repairing") if an issue requires re-repairing.
6. **Dynamic Itemized Billing:** Mechanics can dynamically add parts/labor to a bill, which automatically calculates subtotal, calculates 18% GST, and securely presents a Grand Total to the user on the frontend using a slick dropdown accordion.
7. **RESTful API Architecture:** A fully modular Express.js backend connecting seamlessly with the front end.

---

## 2. Database Architecture

**What type of database is used?**
We use **MongoDB** (specifically hosted on MongoDB Atlas) as the database, interfaced via **Mongoose** (an Object Data Modeling library). 
- **Type:** NoSQL Document Database.
- **Why MongoDB?** It allows for flexible, JSON-like schemas, which perfectly handles jobs that might have an unpredictable array of reported issues, bill items, or varying status flags.

**Key Database Models Used:**
- `User` Schema (Stores Admins and Mechanics with bcrypt-hashed passwords).
- `Job` Schema (Stores vehicle tracking data, customer details, arrays of `issues` strings, and an embedded `BillSchema` containing parts and prices).

---

## 3. Application Routing and Coding Architecture

**What type of routing is used?**
We use **Client-Side Routing** powered by `react-router-dom` in the frontend and **Express Router** in the backend.
- The frontend wraps the application in a `<BrowserRouter>` and uses declarative `<Routes>` and `<Route>` components. 
- It features protected (Private) routing: users cannot access `/admin/*` or `/mechanic/*` without a valid JWT token matching the specified role.

**What type of coding is used?**
- **Architecture:** Component-based Functional React Architecture.
- **Design Pattern:** We make heavy use of React Hooks (`useState`, `useEffect`, `useContext`) combined with a global Context API (`DataContext.jsx` and `AuthContext.jsx`) for state management without relying on external libraries like Redux.
- **Styling Method:** Vanilla CSS separated into module-like files (e.g., `MechanicDashboard.css`, `LandingPage.css`) leveraging CSS Variables to maintain a "Premium" design system and dark/light modes.

---

## 4. Understanding the Home / Landing Page

The Home Page (`LandingPage.jsx`) serves as the core public-facing entry point of the platform.

### Structure of the Landing Page Code:
1. **Navbar Component:** 
   Rendered at the top of the app. It provides semantic `<nav>` links to smooth-scroll sections (Features, Track, Book) and contains the "Login" button navigating to the authentication portal. It implements a sticky scroll behavior (changes appearance when scrolled).
2. **Hero Section:** 
   Contains strong call-to-action buttons heavily styled to look premium, encouraging users to either book an appointment or track a vehicle.
3. **Tracking Section (The Core Logic):** 
   A form where users input their `Job ID` and `Mobile Number`. When successfully fetched, it conditionally reveals an elaborate progress stepper and a collapsible component displaying their itemized bill.
4. **Footer Component:** 
   Provides essential links, contact details, and copyright information, closing the visual structure cleanly.

---

## 5. Frequently Asked Evaluation Questions (Q&A)

**Q: How is the status fetched from the database on the Home Page?**
**A:** When a user types their details and clicks "Track", the frontend triggers an asynchronous `fetch()` API call inside a `try/catch` block to our backend endpoint `GET /api/jobs/track/:jobId?phone={number}`.
1. The Express backend receives the request.
2. It queries MongoDB using Mongoose: `Job.findOne({ id: req.params.jobId })`.
3. The backend then verifies if the provided phone number roughly matches the one on the database record. 
4. If it's valid, it strips away sensitive data and returns just what the customer needs (Status, Vehicle info, and the Bill).
5. The frontend React component stores this returned JSON in the `trackedJob` state variable, causing the tracking progress bar to immediately render on-screen.

**Q: How do you validate the Jobcard number when tracking?**
**A:** Validation happens in two layers:
- **Frontend Validation:** Before sending the request, our React code ensures the `jobId` field isn't empty. We check `if (!jobId.trim())` and display an error message automatically to save network bandwidth.
- **Backend Validation & Security:** The backend takes the Job ID, does a secure query against the database, and adds an extra layer of validation by asserting that the provided `phone` query parameter *must precisely match* the customer's phone number attached to that specific job. If it doesn't match, it throws a `403 Forbidden` error, securely ensuring random users can't guess IDs to view other people's vehicle bills.

**Q: Can you explain the React Context API usage in this project?**
**A:** We built a `DataContext` to act as a globally available single source of truth for the application's core data. Rather than passing `jobs` and `users` props deeply down through multiple layers of components (prop drilling), the `DataContext` fetches everything on mount and provides simple provider functions like `addJob()`, `updateJobStatus()`, and `markDelivered()` that components can import dynamically using `useData()`. 

---

## 6. Full Website Workflow

Here is the exact step-by-step lifecycle of a vehicle from start to finish within the Servixo system:

### Step 1: Appointment & Job Creation
*   A customer can request a service via the Landing Page appointment form.
*   The **Admin** logs into the Admin Dashboard and actively creates a new Jobcard.
*   The system generates a unique **Job ID** (e.g., `JOB-2026-004`).
*   The Admin assigns this job to a specific **Mechanic**.

### Step 2: Mechanic Processing
*   The assigned **Mechanic** logs in and sees the vehicle in their left-hand "Assigned Cars" sidebar.
*   They click on the car and update its progress through a horizontal multi-step tracker: 
    `RECEIVED` ➔ `INSPECTION` ➔ `REPAIRING` ➔ `QUALITY_CHECK` ➔ `READY`.
*   *(Extra Feature)* If a car fails the quality check, the mechanic can cleanly **Backtrack** the status back to `REPAIRING`.

### Step 3: Bill Generation
*   Once the vehicle reaches the `READY` status, a **Billing Form** securely unlocks on the Mechanic's Dashboard.
*   The Mechanic adds itemized service list details (e.g., "Brake Pad Replacement" - ₹1200, "Engine Oil" - ₹900).
*   The Mechanic submits the raw bill to the system for Manager/Admin review.

### Step 4: Admin Approval
*   The **Admin** reviews the submitted bill containing the itemized parts and subtotal.
*   The Admin clicks "Approve Bill" inside the Admin Dashboard.

### Step 5: Customer Tracking (Live)
*   At any point in this process, the Customer can visit the public **Home Page**.
*   They enter their `Job ID` and `Phone Number` in the Tracking Widget.
*   They can see exactly which stage their car is at. Once the bill is approved, an **Itemized Bill Summary** instantly appears on their screen, properly listing the dynamic parts, a calculated 18% GST tax, and the Grand Total.

### Step 6: Final Delivery
*   Once the customer pays or collects the vehicle, the Mechanic (who now sees an unlocked "Ready for Delivery" panel) clicks **"Mark as Delivered"**.
*   The vehicle's status is permanently saved as `DELIVERED`, dropping off the active active-jobs list, finalizing the complete service cycle!
