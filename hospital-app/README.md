# 🏥 Karn Neurocare & Maternity Hospital

A full-stack, production-ready hospital management system built with React, Spring Boot, and PostgreSQL. Features a public-facing website, a comprehensive admin dashboard, JWT authentication, and an AI-powered chatbot.

![Status](https://img.shields.io/badge/Status-Complete-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

## ✨ Features

### 👥 Public User Features
- **Responsive UI:** Mobile-first design with Tailwind CSS
- **Appointment Booking:** Real-time booking system with doctor selection
- **Smart Chatbot:** AI-driven assistant with quick replies and chat history
- **Contact Forms:** Direct communication channel with the hospital
- **PWA Support:** Installable as a mobile app

### 🔐 Admin Dashboard (Secure)
- **JWT Authentication:** Secure login for administrators
- **Dashboard Analytics:** Real-time stats for appointments, doctors, and messages
- **CRUD Operations:** Full management for Doctors, Services, Blogs, and Appointments
- **Status Management:** Confirm or cancel appointments with one click

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Axios, React Router
- **Backend:** Java 17, Spring Boot 4.1.0, Spring Security, JWT (JJWT)
- **Database:** PostgreSQL
- **Tools:** Maven, Git, GitHub

## 📦 Installation

### Prerequisites
- Java 17+
- Node.js 16+
- PostgreSQL

### Backend Setup
```bash
cd hospital-backend
mvn spring-boot:run