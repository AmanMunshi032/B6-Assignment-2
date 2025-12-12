# 🚗 Vehicle Rental System

### **Project Name & Live URL**

(Add your project name and deployment/live URL here)

### **Features & Technology Stack**

(Already included above — expand if needed)

### **Setup & Usage Instructions**

Provide steps like:

```
1. Clone the repository
2. Run npm install
3. Configure .env file
4. Run npm run dev
```

### **GitHub Repository Link**

(Add your GitHub repo link here)

### **Live Deployment Link**

(Add your live deployed API URL here)

---
## 🎯 Project Overview

A backend API for a **vehicle rental management system** that handles:

* **Vehicles** – Manage vehicle inventory with availability tracking
* **Customers** – Manage customer accounts and profiles
* **Bookings** – Handle rentals, returns, and cost calculation
* **Authentication** – Secure role‑based access (Admin & Customer)

---

## 🛠️ Technology Stack

* **Node.js + TypeScript**
* **Express.js** (web framework)
* **PostgreSQL** (database)
* **bcrypt** (password hashing)
* **jsonwebtoken** (JWT authentication)

---

## 📁 Code Structure

Your implementation MUST follow a **modular pattern**:

### Recommended Folder Structure

```
vehicle-rental-system/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.routes.ts
│   │   │   ├── auth.controller.ts
│   │   │   └── auth.service.ts
│   │   │
│   │   ├── users/
│   │   │   ├── user.routes.ts
│   │   │   ├── user.controller.ts
│   │   │   └── user.service.ts
│   │   │
│   │   ├── vehicles/
│   │   │   ├── vehicle.routes.ts
│   │   │   ├── vehicle.controller.ts
│   │   │   └── vehicle.service.ts
│   │   │
│   │   ├── bookings/
│   │   │   ├── booking.routes.ts
│   │   │   ├── booking.controller.ts
│   │   │   └── booking.service.ts
│   │   │
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   └── role.middleware.ts
│   │
│   ├── utils/
│   │   └── jwt.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── .env
└── README.md

```

* Feature‑based modules (auth, users, vehicles, bookings)
* Each module has **routes**, **controllers**, **services**, **validation**
* Clean separation of concerns

---

## 📊 Database Tables

### **Users**

| Field    | Notes                       |
| -------- | --------------------------- |
| id       | Auto-generated              |
| name     | Required                    |
| email    | Required, unique, lowercase |
| password | Required, min 6 chars       |
| phone    | Required                    |
| role     | `admin` or `customer`       |

### **Vehicles**

| Field               | Notes                       |
| ------------------- | --------------------------- |
| id                  | Auto-generated              |
| vehicle_name        | Required                    |
| type                | `car`, `bike`, `van`, `SUV` |
| registration_number | Required, unique            |
| daily_rent_price    | Required, positive          |
| availability_status | `available` or `booked`     |

### **Bookings**

| Field           | Notes                               |
| --------------- | ----------------------------------- |
| id              | Auto-generated                      |
| customer_id     | FK → Users                          |
| vehicle_id      | FK → Vehicles                       |
| rent_start_date | Required                            |
| rent_end_date   | Required (must be after start date) |
| total_price     | Required, positive                  |
| status          | `active`, `cancelled`, `returned`   |

---

## 🔐 Authentication & Authorization

### **User Roles**

* **Admin** – Full access
* **Customer** – Manage own bookings and view vehicles

### **Login Process**

* Password hashed using **bcrypt**
* Login → receives **JWT token**
* Protected routes require:

```
Authorization: Bearer <token>
```

* Token validates user + role permissions

---

### Booking Logic

* Validates **vehicle availability**
* Computes price = `daily_rent_price × duration`
* Updates vehicle status → **booked**
* Customer can cancel **only before start date**
* Admin can mark as **returned** (vehicle becomes available)

---

## 📌 Final Notes

* Follow API reference **exactly**
* Use environment variables (.env)
* Maintain clean modular architecture
* Include proper error handling & validation

---


