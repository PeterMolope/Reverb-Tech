# Peter Molope
# Reverb Tech Application

## Project Description
The Reverb Tech E-commerce Application is a full-stack web platform designed to facilitate the sale of PC components for custom computer builds. It aims to provide a seamless and intuitive shopping experience for users looking to purchase individual parts, alongside robust administrative tools for managing products and user accounts.

## Hosted On Render
https://reverb-tech.onrender.com

## Github Repository
https://github.com/PeterMolope/Reverb-Tech/tree/main/my-app
---



## Key Features

### **Frontend (React.js)**

- **Responsive User Interface (UI)**  
  Built with Tailwind CSS, the application offers a fully responsive design, ensuring optimal viewing and usability across various devices, including desktops, tablets, and mobile phones.

- **Dynamic Product Catalog**  
  - Displays a comprehensive catalog of PC components, complete with detailed descriptions, pricing, and imagery.  
  - Features a dedicated section for "Featured Components" to highlight popular or new arrivals when a user is not logged in.  
  - Allows users to browse products by category, providing a streamlined shopping experience for specific component types (e.g., CPUs, Graphics Cards, Memory).

- **Interactive Shopping Cart**  
  Users can easily add, remove, and update quantities of products in their shopping cart before proceeding to checkout.

- **Simulated User Authentication**  
  Provides a frontend UI for user login. In a production environment, this would integrate with a JWT-based authentication system for secure access.

- **Simulated Checkout Process**  
  Features a checkout page for entering shipping and payment details, simulating integration with a payment gateway like Stripe.

- **Simulated Admin Panel**  
  Offers a dedicated UI for administrators to perform product management (add, edit, delete components) and user management (delete simulated users), laying the groundwork for backend-driven functionality.

- **Enhanced User Experience**  
  - Incorporates animations using Framer Motion for a more dynamic and engaging interface.  
  - Includes Toast notifications (via React Hot Toast) for user feedback.

- **Client-Side Routing**  
  Utilizes React Router DOM for efficient navigation between different sections of the application without full page reloads.

- **Global State Management**  
  Employs Zustand for streamlined and efficient management of application-wide state (e.g., cart, user, products).

- **Iconography**  
  Integrates Lucide React for modern and consistent icons throughout the application.

---

### **Backend (Planned - Node.js with MongoDB)**

- **User Authentication (JWT)**  
  Designed to implement secure user login and registration using JSON Web Tokens (JWT) for authorization.

- **Product Management API**  
  Provides RESTful APIs for creating, reading, updating, and deleting product information, accessible by administrators.

- **User Management API**  
  Offers functionalities for managing user accounts, including basic CRUD operations for administrators.

- **Shopping Cart Logic**  
  Manages server-side cart persistence and integrity.

- **Stripe Payment Gateway Integration**  
  Handles server-side processing of payments securely, interacting with the Stripe API to create charges and manage transactions.

- **Database Management**  
  Utilizes MongoDB as the NoSQL database for storing product details, user information, orders, and other application data.

---

## Technologies Used

### **Frontend**
- React.js
- Vite
- Tailwind CSS
- Zustand
- React Router DOM
- Framer Motion
- React Hot Toast
- Lucide React
- Axios (for API calls)

### **Backend (Planned)**
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Tokens (JWT)

### **Payment Gateway (Planned)**
- Stripe.js (client-side)
- Stripe API (server-side)

### **Deployment (Planned)**
- Render (full-stack)

  ## Run this app locally
npm run build

  ## Start the app
npm run start

---

## Environment Variables

ACCESS_TOKEN_SECRET=mMTQxMTJhNzM0

CLIENT_URL=http://localhost:5173

CLOUDINARY_API_KEY=814887151375324

CLOUDINARY_API_SECRET=N5EIA-Ocz4Vti9NtXZrQQj1IHQo

CLOUDINARY_CLOUD_NAME=duzlm4vtq

MONGO_URI="mongodb+srv://ptrmolope17:Y18sxrZOmmiipfQ7@cluster0.v7z5wpm.mongodb.net/ReverbDB?retryWrites=true&w=majority&appName=Cluster0"

PORT=8000

REDIS_URL=rediss://default:ASiFAAIjcDE1YjFmMTQxMTJhNzM0YmMzOWE3MTU0YWI1ZDZhYjUyOXAxMA@legible-quail-10373.upstash.io:6379

REFRESH_TOKEN_SECRET=MTU0YWI1ZDZhYjUyOXA

STRIPE_SECRET_KEY=sk_test_51Rd9e4BGGvXHfD6r3DcWhRaXkGzk53CzMgntfOZ2RmQyGmIi2qjLvLyCNoQkNRcr5VsPrBGqoFfEDjyyG5sQCloF00L2yOSMqZ
