# 🎓 VIVA VOCE & EXTERNAL EXAM PREPARATION GUIDE
## SMART CYLINDER BOOKING SYSTEM

Comprehensive Viva questions, technical explanations, and answers prepared for:
**Avanya Sinha, Chanchal Goyal, Mansi Kumari, Deepshikha Kumari, and Kashish Kumari**.

---

### General Project Questions

#### Q1: What is the main objective of the Smart Cylinder Booking System?
**Answer:**
The system is an online web application designed to automate and simplify the LPG gas cylinder booking and delivery process. It replaces traditional manual booking methods with an online platform allowing 24x7 cylinder booking, direct DBT government subsidy application, secure multi-mode payment, live milestone order tracking, instant digital invoice generation, and an administrator control panel for agency logistics and stock management.

#### Q2: What architecture does this application follow?
**Answer:**
It follows the **MVC (Model-View-Controller)** design pattern:
- **Model:** Java Beans (`User.java`, `Booking.java`, `Cylinder.java`, `Payment.java`, `Admin.java`) representing application data structures, and DAO classes handling database operations.
- **View:** JSP (JavaServer Pages) and HTML/CSS/JS files that render the user interface.
- **Controller:** Java Servlets (`RegisterServlet`, `LoginServlet`, `BookCylinderServlet`, `PaymentServlet`, `AdminLoginServlet`, `ManageBookingServlet`) handling HTTP requests, performing business validation, and directing flow.

---

### Backend & Java Servlets Questions (Deepshikha Kumari)

#### Q3: What is the lifecycle of a Java Servlet?
**Answer:**
A Servlet lifecycle consists of 5 phases managed by the Servlet Container (Tomcat):
1. **Loading:** The Servlet class is loaded into memory.
2. **Instantiation:** Container creates an instance of the Servlet.
3. **Initialization (`init()` method):** Called once to initialize resources (e.g. database connections).
4. **Request Handling (`service()` method):** Dispatches to `doGet()` or `doPost()` for every incoming client request in a separate thread.
5. **Destruction (`destroy()` method):** Called before taking the servlet out of service to release resources.

#### Q4: What is the difference between `doGet()` and `doPost()` in Servlets?
**Answer:**
- **`doGet()`:** Parameters are appended to the URL query string. It has size limitations (around 2KB-8KB), is visible in browser history/bookmarks, and should only be used for idempotent data retrieval operations (e.g. viewing cylinder catalog or booking history).
- **`doPost()`:** Parameters are passed in the HTTP request payload/body. It has no URL length limit, sensitive data (passwords, payment details) is hidden from the URL, and it is used for state-modifying actions (e.g. registration, login, placing a refill booking).

#### Q5: How is session management handled in your application?
**Answer:**
Using `HttpSession`. When a customer or administrator logs in successfully:
```java
HttpSession session = request.getSession();
session.setAttribute("currentUser", user);
session.setAttribute("userRole", "CUSTOMER");
```
The server sends a session cookie (`JSESSIONID`) to the client browser. Subsequent requests include this cookie, allowing the server to identify the logged-in user. On logout, `session.invalidate()` destroys the session and clears all stored session attributes.

#### Q6: What is the purpose of `web.xml`?
**Answer:**
`web.xml` is the **Deployment Descriptor** of a Java EE web application. It tells the servlet container:
- Which Servlets exist and their URL patterns (if not using `@WebServlet` annotations).
- The welcome file list (e.g., `index.jsp`).
- Session timeout duration (e.g., 30 minutes).
- Error page redirection (e.g., 404 and 500 handlers).

---

### Database & JDBC Questions (Mansi Kumari)

#### Q7: What are the 5 core steps in JDBC connectivity?
**Answer:**
1. **Load the JDBC Driver:** `Class.forName("com.mysql.cj.jdbc.Driver");`
2. **Establish Connection:** `Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);`
3. **Create Statement / PreparedStatement:** `PreparedStatement ps = conn.prepareStatement(sql);`
4. **Execute Query / Update:** `ResultSet rs = ps.executeQuery();` or `int rows = ps.executeUpdate();`
5. **Close Resources:** Cleanly closing `ResultSet`, `PreparedStatement`, and `Connection` (achieved automatically via Java try-with-resources blocks).

#### Q8: Why did you use `PreparedStatement` instead of regular `Statement`?
**Answer:**
1. **Security (SQL Injection Prevention):** `PreparedStatement` pre-compiles the SQL query and treats user inputs strictly as typed parameters, preventing attackers from injecting malicious SQL commands.
2. **Performance:** Pre-compiled SQL statements are cached by the database engine and can be executed multiple times with different parameter values without re-parsing.

#### Q9: Explain the database relationship between Users, Cylinders, Bookings, and Payments.
**Answer:**
- **Users ➔ Bookings:** **One-to-Many (`1:N`)** — One customer can make multiple cylinder refill bookings over time. `user_id` is a Foreign Key in `bookings`.
- **Cylinders ➔ Bookings:** **One-to-Many (`1:N`)** — One cylinder type (e.g. 14.2kg Domestic) can be part of many customer bookings. `cylinder_id` is a Foreign Key in `bookings`.
- **Bookings ➔ Payments:** **One-to-One / One-to-Many (`1:1`)** — Each refill booking generates a corresponding payment record. `booking_id` is a Foreign Key in `payments`.
- **ON DELETE CASCADE:** Configured so if a test user is removed, their child bookings and payments are automatically cleaned up to maintain referential integrity.

#### Q10: How do you handle database transactions for booking and stock updates?
**Answer:**
To ensure ACID properties (Atomicity, Consistency, Isolation, Durability), we disable auto-commit:
```java
conn.setAutoCommit(false);
// 1. Insert Payment
// 2. Update Booking Status to PAID / CONFIRMED
// 3. Decrement Cylinder Stock by 1
conn.commit(); // If all succeed
```
If an exception occurs at any step, `conn.rollback()` is invoked so no partial or inconsistent data is stored.

---

### Frontend, UX & UI Design Questions (Avanya Sinha)

#### Q11: How does the application ensure responsive design across mobile and desktop?
**Answer:**
- Standard CSS Flexbox and CSS Grid layouts.
- Dynamic viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- CSS Media Queries (`@media (max-width: 768px)`) that collapse grids into single columns, convert sidebars, and adjust typography sizes for smartphones and tablets.

#### Q12: How does the live delivery tracking feature work?
**Answer:**
The order tracking system visualizes 5 linear milestones:
1. `PENDING` (Order Placed)
2. `CONFIRMED` (Agency Accepted)
3. `DISPATCHED` (Bottling Plant Transit)
4. `OUT_FOR_DELIVERY` (Delivery Executive on Route)
5. `DELIVERED` (Safety verified & Completed)

When the administrator updates the order status in the admin module, the customer's tracking stepper updates dynamically, showing active/completed steps and delivery driver contact information.

#### Q13: How does the printable invoice work?
**Answer:**
Using CSS `@media print` stylesheets. When the user clicks "Print / Download PDF", the browser triggers `window.print()`. The print stylesheet hides non-printable elements (navigation bars, buttons, sidebars) and formats the receipt into a standard computer-generated GST tax invoice.

---

### Testing & Validation Questions (Kashish)

#### Q14: What types of testing did you conduct on this project?
**Answer:**
1. **Unit Testing:** Testing individual Java DAO methods (`registerUser()`, `loginUser()`, `getCylinderById()`).
2. **Integration Testing:** Testing data flow between JSP forms ➔ Servlets ➔ DAO ➔ MySQL Database.
3. **Validation Testing:** Client-side JavaScript validation (10-digit phone verification, 6-digit postal code, password matching) and server-side validation.
4. **System Testing:** End-to-end user workflows: registering an account, booking a subsidized refill, paying via UPI, verifying inventory stock decrement, and updating delivery status as admin.

#### Q15: How is inventory concurrency handled when a cylinder goes out of stock?
**Answer:**
The database query verifies that available stock is greater than or equal to the requested quantity before decrementing:
```sql
UPDATE cylinders SET stock_quantity = stock_quantity - 1 
WHERE cylinder_id = ? AND stock_quantity >= 1;
```
If stock is 0, the query updates 0 rows, and the system prompts the user with an "Out of Stock" notification, preventing negative inventory.

---

### Team-Specific Viva Roles & Defense Areas

| Team Member | Official Role & Responsibilities | Primary Viva Focus Area & Examiner Questions |
| :--- | :--- | :--- |
| **Avanya Sinha** | **Frontend Engineering & UI/UX** | *"Explain how you structured the HTML5/CSS3 components, responsive grid layouts, and interactive client JavaScript."* |
| **Mansi Kumari** | **Database Architecture & SQL** | *"Explain the MySQL schema normalization, primary/foreign key cascades, JDBC Connection management, and DAO transactions."* |
| **Deepshikha Kumari** | **Backend Processing & Java Servlets** | *"Explain the Servlet lifecycle, `doGet` vs `doPost`, session tracking (`HttpSession`), and MVC routing in `BookCylinderServlet`."* |
| **Chanchal Goyal** | **System Analysis & Data Modeling** | *"Walk through the Entity-Relationship (ER) diagram, DFD Level 0 and Level 1, and the lifecycle of an LPG refill entity."* |
| **Kashish Kumari** | **Software Testing & QA** | *"Explain unit testing on DAO classes, input sanitization against SQL injection, and test cases for subsidy validation."* |
