# 🔥 SMART CYLINDER BOOKING SYSTEM

An automated, web-based LPG Gas Cylinder Booking, Delivery Tracking, and Customer Management Application.

---

## 👥 Project Team Members & Responsibilities
1. **Avanya Sinha** — Frontend Architecture, UI/UX Design, HTML5/CSS3 & Client Interactions
2. **Mansi Kumari** — Database Engineering, MySQL Relational Schema, Table Constraints & JDBC DAOs
3. **Deepshikha Kumari** — Backend Development, Java Servlets (`jakarta.servlet.*`), Business Processing Logic & Routing
4. **Chanchal Goyal** — System Analysis, Data Flow Modeling & ER Diagrams
5. **Kashish Kumari** — Testing, Input Validations, Concurrency & Quality Assurance

---

## 🌟 Key Highlights & Project Architecture

This project is built to deliver **two complete solutions**:

1. **Instant Interactive Web Application (`app/`)**:
   - Zero installation / zero setup required!
   - Runs immediately in any modern web browser (Google Chrome, Edge, Firefox).
   - Powered by dynamic client-side architecture with persistent `localStorage` database.
   - Includes real-time simulated order tracking, interactive UPI QR code payment, instant GST invoice download/print, customer dashboard, and full administrator control center.
   - Built-in local development server (`server.js` + `start_server.bat`).

2. **Java Enterprise Edition (EE) Backend (`java_backend/`)**:
   - Matches the official Project Design Report (PDR) specifications.
   - **Backend Processing:** Java Servlets (`jakarta.servlet.*`)
   - **Dynamic Views:** Java Server Pages (JSP)
   - **Database Connectivity:** JDBC (`com.mysql.cj.jdbc.Driver`) with prepared statements (SQL injection safe)
   - **Relational Database:** MySQL (`schema.sql` ready to import)
   - **Application Server:** Apache Tomcat 10.x / 9.x
   - **IDE Compatibility:** Eclipse IDE for Enterprise Java / IntelliJ IDEA Ultimate

---

## 🚀 Quick Start Guide (Run Instantly)

### Option A: 1-Click Launch with Built-in Server
1. Double-click the file **`start_server.bat`** in the project folder.
2. It will automatically start the lightweight local server and open your default browser at:
   ```
   http://localhost:3000
   ```
   *(Or open command prompt in this directory and run: `node server.js`)*

### Option B: Direct Browser Opening (No Server Needed!)
1. Simply double-click **`index.html`** or navigate into the **`app`** folder and double-click **`app/index.html`** in File Explorer.
2. The entire application will run instantly and offline in Google Chrome!

---

## 🔑 Default Login Credentials

### 1. Customer Portal (`/login.html` or `/login.jsp`)
- **Email:** `rahul@gmail.com`
- **Password:** `user123`
- *(Or click the 1-click **"Fill Rahul's Account"** demo button on the login screen)*
- You can also register a brand new connection using the **Register** form.

### 2. Administrator Portal (`/admin-login.html` or `/admin-login.jsp`)
- **Username:** `admin`
- **Password:** `admin123`
- *(Or click the 1-click **"Fill Admin"** demo button on the login screen)*

---

## 📁 Project Directory Structure

```text
smart Cylender/
│
├── app/                              # Live Interactive Web Application (Zero Setup)
│   ├── index.html                    # Public Landing Page & Cylinder Catalog
│   ├── login.html                    # Customer Login Portal
│   ├── register.html                 # New LPG Connection Registration
│   ├── dashboard.html                # Customer Dashboard & Active Order Tracker
│   ├── book-cylinder.html            # Cylinder Booking & Subsidy Calculator
│   ├── payment.html                  # Multi-Option Payment Gateway (UPI, Card, COD)
│   ├── booking-history.html          # Order History with Filters & Invoice Viewer
│   ├── track-order.html              # Live Step-by-Step Delivery Radar Tracker
│   ├── profile.html                  # Profile Details & Change Password
│   ├── admin-login.html              # Administrator Sign In
│   ├── admin-dashboard.html          # Admin Operations & Analytics Center
│   ├── admin-bookings.html           # Admin Order Management & Driver Assignment
│   ├── admin-customers.html          # Admin Customer Directory
│   ├── admin-cylinders.html          # Admin Cylinder Pricing & Stock Restock
│   ├── css/
│   │   ├── style.css                 # Master Theme & Component Stylesheet
│   │   └── dashboard.css             # Dashboard Layout, Steppers & Modals
│   └── js/
│       ├── data.js                   # LocalStorage Database Engine with Seed Data
│       ├── auth.js                   # Authentication Controller
│       └── app.js                    # UI Helper Functions & Invoice Generator
│
├── java_backend/                     # Full Java Servlet + JSP + JDBC + MySQL Project
│   ├── database/
│   │   └── schema.sql                # Complete MySQL Schema & Sample Records
│   ├── src/com/smartcylinder/
│   │   ├── model/                    # Data Transfer Objects / JavaBeans
│   │   │   ├── User.java
│   │   │   ├── Admin.java
│   │   │   ├── Cylinder.java
│   │   │   ├── Booking.java
│   │   │   └── Payment.java
│   │   ├── dao/                      # Data Access Objects (JDBC)
│   │   │   ├── DBConnection.java     # MySQL Connection Factory
│   │   │   ├── UserDao.java          # Customer Authentication & Profile DAO
│   │   │   ├── AdminDao.java         # Admin Analytics & Dashboard DAO
│   │   │   ├── CylinderDao.java      # Cylinder Inventory DAO
│   │   │   ├── BookingDao.java       # Booking Creation & Status Updates DAO
│   │   │   └── PaymentDao.java       # Payment Processing & Receipt DAO
│   │   └── controller/               # Java Servlets (HTTP Handlers)
│   │       ├── RegisterServlet.java
│   │       ├── LoginServlet.java
│   │       ├── LogoutServlet.java
│   │       ├── BookCylinderServlet.java
│   │       ├── PaymentServlet.java
│   │       ├── ProfileServlet.java
│   │       ├── AdminLoginServlet.java
│   │       ├── ManageBookingServlet.java
│   │       └── ManageCylinderServlet.java
│   └── WebContent/
│       ├── WEB-INF/
│       │   └── web.xml               # Deployment Descriptor & Servlet Mappings
│       ├── index.jsp                 # Landing Page
│       ├── login.jsp                 # Customer Login View
│       ├── register.jsp              # Customer Registration View
│       ├── dashboard.jsp             # Customer Dashboard View
│       ├── book-cylinder.jsp         # Booking Form View
│       ├── payment.jsp               # Payment View
│       ├── booking-history.jsp       # Order History View
│       ├── profile.jsp               # Profile View
│       ├── invoice.jsp               # Printable Tax Bill View
│       ├── admin-login.jsp           # Admin Login View
│       ├── admin-dashboard.jsp       # Admin Dashboard View
│       ├── admin-bookings.jsp        # Admin Bookings Manager View
│       ├── admin-customers.jsp       # Admin Customers View
│       ├── admin-cylinders.jsp       # Admin Inventory View
│       ├── css/                      # Stylesheets
│       └── js/                       # Validation Scripts
│
├── index.html                        # Root Launcher Redirecting to App
├── server.js                         # Node.js Zero-Dependency HTTP Server
├── start_server.bat                  # Double-Click Launcher for Windows
├── PROJECT_REPORT.md                 # Full Academic Project Report with Diagrams
├── VIVA_QUESTIONS.md                 # 25+ Comprehensive Viva Exam Questions & Answers
└── README.md                         # Documentation
```

---

## 🛠️ How to Setup & Run the Java Backend (Eclipse / IntelliJ IDEA)

### Step 1: Database Setup (MySQL)
1. Open **MySQL Workbench**, **phpMyAdmin**, or the MySQL Command Line.
2. Execute the script:
   ```bash
   mysql -u root -p < java_backend/database/schema.sql
   ```
   *(Or copy-paste the contents of `java_backend/database/schema.sql` into MySQL Workbench and run)*.
3. This will create database `smart_cylinder_db` with all tables (`users`, `admins`, `cylinders`, `bookings`, `payments`) and sample data.

### Step 2: Open in Eclipse / IntelliJ
1. **In Eclipse:**
   - Go to `File` > `Import` > `General` > `Existing Projects into Workspace` (or `Dynamic Web Project`).
   - Set the Project Directory to `java_backend`.
   - Add Apache Tomcat 10 (or 9) to your Server runtime.
   - Place `mysql-connector-j-8.x.jar` in `WebContent/WEB-INF/lib/`.
   - Right click the project > `Run As` > `Run on Server`.

2. **In IntelliJ IDEA:**
   - Open `java_backend`.
   - Configure Tomcat Server in Run/Debug Configurations.
   - Set Deployment Artifact to `exploded war`.
   - Click Run.

---

## 📑 Core Modules Described

1. **Registration Module:** Validates customer data, auto-generates unique 8-digit Consumer ID (`LPG-XXXXXXXX`), and links government DBTL subsidy eligibility.
2. **Login Module:** Role-based session authentication for both Customers and System Administrators.
3. **Cylinder Booking Module:** Allows consumers to select between Domestic (14.2kg subsidized/non-subsidized), Commercial (19kg), and Mini (5kg Chhotu) cylinders, automatically applying ₹200 DBT subsidies where eligible.
4. **Payment Module:** Simulates multi-channel payments (UPI with dynamic QR code, Credit/Debit cards, Net Banking, and Cash on Delivery) with instant transaction reference generation.
5. **Live Tracking Module:** Visual 5-stage progress stepper (`Order Placed` ➔ `Confirmed` ➔ `Dispatched from Bottling Plant` ➔ `Out for Delivery` ➔ `Delivered`) with assigned driver contact details.
6. **Booking History & Invoice Module:** Searchable, filterable ledger of past bookings with printable computerized tax invoices.
7. **Admin Operations Module:** Comprehensive control center offering KPI metrics, order fulfillment updates, driver assignment, customer management, and live inventory stock replenishment.

---

## 🛡️ Academic Documentation
- Check **`PROJECT_REPORT.md`** for the formal academic submission report, entity-relationship diagrams, and test case tables.
- Check **`VIVA_QUESTIONS.md`** for 25+ questions and answers prepared specifically for your project presentation and viva examination!
