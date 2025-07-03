# NexVendor 🛒
### A Scalable Multi-Vendor E-commerce Platform with Real-Time Features

## 📌 Introduction / Overview

**NexVendor** is a feature-rich e-commerce platform designed to allow multiple shop owners to sell products under a single storefront. It offers core features like **user-to-seller chat**, **product reviews**, **refund requests**, and **coupon discounts**, all managed via dedicated dashboards for **users**, **sellers**, and **admin**.

Unlike traditional single-store systems, NexVendor facilitates a **multi-seller ecosystem** with real-time interactions and full administrative oversight — enabling customers to shop from anyone, anywhere.

The project was developed **solo** as a capstone during the **DevWeekends Fellowship Program**, combining full-stack concepts into a production-ready system. It utilizes the **MERN stack**, **Socket.IO**, and **SMTP**, and is deployed using a **multi-server architecture**.

## 🎯 Goals of the Project

Main objectives:
- Understand **role-based workflows** between customers, sellers, and admin
- Implement **real-time systems** for chat, product/events creation, and messaging
- Learn **secure authentication flows** using JWT and cookies
- Track key processes: **orders, revenue, coupons, refunds, and balances**
- Manage **frontend state** across dashboards
- Deploy a **scalable multi-server system** using modern DevOps tools

This project also aimed to consolidate learnings from older projects into one complete, documented build.

## 🧱 Architecture Overview

NexVendor separates concerns across four layers:
- **Frontend**: Role-based dashboards using Vite + React
- **Backend API**: Modular Node/Express server with authentication
- **Real-Time Socket Server**: Built on Socket.IO
- **Database**: MongoDB with referenced schema relationships

---

### 🔧 Frontend

- Built using **Vite + React.js**
- Routing managed via **React Router DOM**
- Route groups: Public, User, Seller, Admin (all protected)
- Dashboards are **role-specific** and modular
- **Tailwind CSS** for styling, **Axios** for API calls
- **Cookies** store tokens securely; **LocalStorage** used for cart/wishlist persistence

---

### ⚙️ Backend

- Built with **Node.js + Express.js**
- Organized folders: `controllers/`, `models/`, `middleware/`, `utils/`
- Auth: **JWT**, **SMTP email verification**
- Global error handlers: `ErrorHandler`, `AsyncErrorHandler`

---

### 🛢️ Database

- **MongoDB Atlas** with **Mongoose**
- Models: Users, Sellers, Products, Orders, Events, Coupons, Conversations, Messages, Withdrawals
- References via `userId`, `shopId`, nested objects

---

### 🌐 Real-Time Layer

| Event Name         | Direction             | Purpose                                                        |
|--------------------|------------------------|----------------------------------------------------------------|
| `addUser`          | Client → Server        | Registers user socket                                           |
| `getUsers`         | Server → Clients       | Sends updated user list                                        |
| `sendMessage`      | Client → Server        | Sends message with optional image                              |
| `getMessage`       | Server → Receiver      | Delivers message                                               |
| `messageSeen`      | Client → Server        | Marks message seen and notifies                                |
| `updateLastMessage`| Client → Server        | Updates chat preview                                           |
| `getLastMessage`   | Server → Clients       | Broadcasts last message                                        |
| `disconnect`       | Auto / Client          | Removes user socket mapping                                    |

---

## 🧱 System Architecture

![System Architecture](https://res.cloudinary.com/dbsjzwkvi/image/upload/v1751532066/NexVendor___Mermaid_Chart-2025-07-03-083713_swyode.png)

## 💡 Key Features

### 👤 User Features
- Profile, avatar, password
- Add/manage addresses
- Track orders, refunds
- Wishlist/cart handling
- Chat with sellers

### 🛍️ Seller Features
- Product/Event/Coupon creation
- View and update orders
- Handle refunds, chat with users
- Withdraw requests, shop management

### 🛠️ Admin Features
- View/manage all data
- Delete shops or users
- Approve withdraws and send email

### 💬 Real-Time Chat System
- Socket.IO-based
- Seen/unseen status
- Image messaging

### 💳 Payments
- **Stripe** & **Cash on Delivery**
- Admin fee deduction (8%)
- Withdrawal logic + email alerts

### 🎁 Promotions & Events
- Time-based flash events (auto-delete)
- Shop-specific coupon codes

---

## ⚙️ Tech Stack

### Frontend
- React.js, Vite, React Router DOM, Tailwind CSS
- Axios, Cookies, LocalStorage

### Backend
- Node.js, Express.js, dotenv, Cloudinary SDK, Stripe SDK
- JWT, SMTP, custom error middleware

> **Note:** Multer was used early but replaced with Cloudinary

### Database
- MongoDB Atlas + Mongoose

### Real-Time Layer
- Socket.IO (dedicated Node.js server)

### Deployment
- Frontend on **Vercel**
- Backend & Socket.IO on **Render**
- Images via **Cloudinary**

---

## 🚧 Challenges & Solutions

### 🔐 Authentication
Used token links with expiry + wrapper route guards

### 💬 Real-Time Messaging
Used `currentChat`, `lastMessage` and socket listeners for delivery

### 🖼️ Image Uploads
Replaced Multer with Cloudinary; validated file types & size

### ⚛️ State Sync
Manual Redux dispatch after reviews/cart/delete events

### 🚀 Deployment Issues
Switched backend to Render for cookie consistency; added `vercel.json` to fix route reload

---

## 📐 Database Design (ERD)

| Collection        | Key Fields                                                             |
|------------------|------------------------------------------------------------------------|
| Users            | name, email, password, avatar, role, addresses[]                       |
| Sellers          | name, email, shopName, avatar, description, balance, transactions[]     |
| Products         | name, price, category, stock, images[], shopId, reviews[]              |
| Orders           | user, cart[], address, totalPrice, payment, status                     |
| Coupons          | name, value, minAmount, maxAmount, selectedProduct, shopId             |
| Events           | name, images[], expiryDate, productId                                  |
| Conversations    | groupTitle, members[], lastMessage                                     |
| Messages         | sender, receiver, text, images[], seen                                 |
| Withdrawals      | seller, amount, status, createdAt                                      |

![ER Diagram](https://res.cloudinary.com/dbsjzwkvi/image/upload/v1751536228/NexVendor___Mermaid_Chart-2025-07-03-092507_bxuoqp.png)

---

## 🧭 User Journey & Flow Diagram

### 👤 User Flow  
Sign Up → Verify Email → Login → Browse → Cart → Checkout → Address → Payment → Order → Track → Chat

### 🛍️ Seller Flow  
Create Shop → Verify → Login → Add Product/Event → Orders → Update Status → Refunds → Withdraw → Chat

### 🛠️ Admin Flow  
Login → Dashboard → View Users/Shops/Orders → Handle Withdraws → Email Seller

### 📊 System Flowchart Diagram

![System Flowchart](https://res.cloudinary.com/dbsjzwkvi/image/upload/v1751536896/NexVendor___Mermaid_Chart-2025-07-03-100123_kge9g2.png)

---

## ✅ Best Practices

- Secure password hashing (bcrypt), JWT, HTTP-only cookies
- Role-protected routes (User, Seller, Admin)
- Modular code structure (routes/controllers/models/middleware)
- Central error handlers (`ErrorHandler`, `AsyncErrorHandler`)
- RESTful API conventions, meaningful endpoints
- Tailwind + responsive layout
- Postman for API testing, GitHub for version control

---

## 📌 Conclusion

NexVendor was more than a build — it was a full-stack journey. From role-based dashboards and payments to real-time chat, I learned how to architect, scale, and deploy a multi-service system.

> *"The real product of building software isn't just the app — it's the engineer you become by building it."*

---

## 👨‍💻 Author

**Muhammad Ali Khan**  
Full-Stack Developer | MERN Stack | Real-Time Systems | Scalable Web Apps

- 💼 [LinkedIn](https://www.linkedin.com/in/m-alikhan0616/)  
- 💻 [GitHub](https://github.com/alikhan0616)  

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

- ✉️ m.akhan0616@gmail.com
