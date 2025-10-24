# SafetyHub - Community Emergency Management System

## About the Project
SafetyHub is a full-stack web application designed to connect citizens, volunteers, and administrators to efficiently manage community emergencies in real-time. It allows users to report incidents with location and description, responders to accept and manage these incidents, and admins to oversee all ongoing emergencies via a dashboard with real-time updates.

## Features
- Citizens can report emergencies with GPS location and description.
- Volunteers can view, accept, and respond to incidents.
- Admin dashboard shows real-time incidents with filters by priority and status.
- Incident status workflow: Pending → Responding → Completed.
- Google Maps integration for viewing incident locations.
- Auto-refresh and role-based access control for user types.

## Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Deployment: Vercel (Frontend and Backend)

## Project Structure
SafetyHub/
├── temp-frontend/ # React frontend application
├── backend/ # Node.js backend with Express
├── README.md # Project documentation
└── .gitignore # Files to ignore in Git

text

## Installation & Setup

### Prerequisites
- Node.js v14+ installed
- MongoDB Atlas Account

### Backend Setup
cd backend
npm install

Create .env file with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_ORIGIN=your_frontend_url
PORT=4000
npm start

text

### Frontend Setup
cd temp-frontend
npm install
npm start

text
Frontend runs on http://localhost:3000 by default.

## Usage
- Report incidents via frontend interface.
- Admins can view all incidents, accept/respond, and mark complete with location views.
- Real-time updates enable quick incident handling.

## Contributing
