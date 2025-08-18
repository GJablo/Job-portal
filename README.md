# Job Portal Application

A full-stack job portal application built with React and Node.js that connects job seekers with employers. The platform allows companies to post job listings and manage applications while enabling candidates to search and apply for positions.

## 🚀 Features

### For Companies
- Company registration and authentication
- Post and manage job listings
- View and manage job applications
- Track applicant status
- Company profile management

### For Job Seekers
- Browse job listings
- Advanced job search and filtering
- Submit job applications
- Upload and manage resumes
- Track application status

## 🛠️ Tech Stack

### Frontend
- React (v19)
- Vite
- React Router DOM
- Axios for API calls
- TailwindCSS for styling
- React Toastify for notifications
- Quill for rich text editing

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Cloudinary for file storage
- Multer for file uploads
- CORS enabled

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js
- pnpm (v10.12.4 or higher)
- MongoDB

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GJablo/Job-portal.git
cd Job-portal
```

2. Install frontend dependencies:
```bash
cd client
npm install
```

3. Install backend dependencies:
```bash
cd ../server
pnpm install
```

4. Create .env files:

In the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

In the client directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```

5. Start the application:

Backend:
```bash
cd server
pnpm run dev
```

Frontend:
```bash
cd client
npm run dev
```

## 🌐 API Endpoints

### Company Routes
- POST /api/company/register - Register a new company
- POST /api/company/login - Company login
- GET /api/company/data - Get company profile
- GET /api/company/applicants - Get job applications
- POST /api/company/jobs - Post a new job

### Job Routes
- GET /api/jobs - Get all jobs
- GET /api/jobs/:id - Get specific job
- POST /api/jobs/apply - Apply for a job
- PUT /api/jobs/visibility - Toggle job visibility

### User Routes
- POST /api/user/register - Register a new user
- POST /api/user/login - User login
- GET /api/user/applications - Get user's job applications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
