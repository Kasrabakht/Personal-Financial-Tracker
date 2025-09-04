Personal Finance Tracker (WIP)

A full-stack app to track expenses, savings goals, and payment methods.
Status: In active development. The repo contains a working dev environment (client + server), simple auth (client-side), and basic CRUD for financial records.

✨ Features (MVP)

Login/Sign-up UI with client-side session (AuthContext + localStorage)

Protected routes via <RequireAuth />

Add financial records (description, amount, category, payment method, date)

Global state with React Context (FinancialRecordContext)

API backed by Node/Express + MongoDB (Mongoose)

Roadmap

Edit/Delete records

User accounts & server-side auth (JWT)

Savings goals & monthly summaries

Charts/visualizations

Pagination & search

Deploy to cloud (Render/Netlify/Vercel)

🧰 Tech Stack

Frontend: React + Vite, React Router, Context API
Backend: Node.js, Express, Mongoose
Database: MongoDB Atlas
Dev: Nodemon, Concurrently, CORS
