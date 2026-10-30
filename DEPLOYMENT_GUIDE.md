# 🚀 DEPLOYMENT GUIDE — SMART CYLINDER BOOKING SYSTEM

Is project ko live deploy karne ke **4 sabse aasan aur popular tareeqe** neeche step-by-step diye gaye hain:

---

## 🌐 Method 1: Netlify Drop (Sabse Aasan — 1 Minute Mein Live URL!)
*Is method mein bina kisi command ya GitHub account ke aapka project instant live link ban jayega jise aap viva examiner ko phone ya laptop par dikha sakte hain.*

1. Browser mein yeh link kholein: **[app.netlify.com/drop](https://app.netlify.com/drop)**
2. Apne computer ke file explorer mein project folder (`smart Cylender`) ke andar jayein.
3. Wahan jo **`app`** naam ka folder hai, use mouse se uthakar (drag karke) Netlify ke drop box par chhod dein.
4. **Bas ho gaya!** 10 second mein Netlify aapko ek free live HTTPS URL de dega (e.g. `https://smart-cylinder-booking-123.netlify.app`).

---

## ⚡ Method 2: Vercel (Recommended for GitHub Users)
*Project mein already `vercel.json` aur `package.json` configured hain.*

1. Project folder ko apne **GitHub account** par push karein:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Smart Cylinder project"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. **[vercel.com](https://vercel.com)** par jayein aur GitHub se sign in karein.
3. **"Add New Project"** par click karein aur apna repository select karein.
4. **"Deploy"** par click karein — 30 seconds mein project live ho jayega!

---

## ☁️ Method 3: Render.com (Free Node.js Cloud Deployment)
1. Apne GitHub repository ko **[render.com](https://render.com)** par connect karein.
2. **"New Web Service"** select karein.
3. Settings:
   - **Environment:** `Node`
   - **Build Command:** `npm install` (ya blank)
   - **Start Command:** `node server.js`
4. **"Deploy Web Service"** par click karein. Aapko ek permanent public link mil jayega (e.g. `https://smart-cylinder.onrender.com`).

---

## ☕ Method 4: Deploy Java Backend (`java_backend/`) on Apache Tomcat (College Lab / Practical Submission)
*College viva ya professor evaluation ke liye traditional Java EE deployment:*

### Step 1: MySQL Database Setup
1. MySQL Workbench ya XAMPP / WampServer phpMyAdmin open karein.
2. `smart_cylinder_db` database create karein aur script import karein:
   - File path: `java_backend/database/schema.sql`

### Step 2: WAR File Generate Karein
1. **Eclipse IDE mein:**
   - Project `java_backend` par Right Click karein.
   - `Export` > `WAR file` select karein.
   - Destination: `smart-cylinder.war` save karein.
2. **IntelliJ IDEA mein:**
   - `Project Structure` > `Artifacts` > Add `Web Application: Archive (.war)`.
   - `Build` > `Build Artifacts`.

### Step 3: Apache Tomcat Server par Deploy Karein
1. Generated `smart-cylinder.war` file ko copy karein.
2. Apache Tomcat installation folder mein jayein (e.g., `C:\Program Files\Apache Software Foundation\Tomcat 10.1\webapps\`).
3. Wahan paste kar dein.
4. Tomcat server start karein:
   - `bin/startup.bat` double click karein.
5. Browser mein open karein:
   ```
   http://localhost:8080/smart-cylinder/
   ```
