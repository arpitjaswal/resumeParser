# Resume Parser Deployment Guide

This guide will help you deploy the Resume Parser application to make it accessible on the internet.

## Prerequisites

- A MongoDB Atlas account (or any MongoDB hosting service)
- A hosting service for the backend (e.g., Heroku, Render, Railway, or AWS)
- A hosting service for the frontend (e.g., Vercel, Netlify, or GitHub Pages)
- An email service for OTP authentication (e.g., Gmail, SendGrid, or Mailgun)

## Backend Deployment

### 1. Set up MongoDB

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Set up database access (create a user with read/write permissions)
4. Set up network access (allow access from anywhere or specific IPs)
5. Get your MongoDB connection string

### 2. Set up Environment Variables

Create a `.env` file in the backend directory with the following variables:

```
MONGODB_URI=mongodb+srv://your-mongodb-uri
JWT_SECRET=your-jwt-secret-key
SMTP_USER=your-email@example.com
SMTP_PASS=your-email-password
PORT=5000
NODE_ENV=production
```

### 3. Deploy to a Backend Hosting Service

#### Option 1: Deploy to Heroku

1. Create a Heroku account at https://signup.heroku.com/
2. Install the Heroku CLI
3. Run the following commands:

```bash
cd backend
heroku login
heroku create resume-parser-backend
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

4. Set environment variables in Heroku:

```bash
heroku config:set MONGODB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret-key
heroku config:set SMTP_USER=your-email@example.com
heroku config:set SMTP_PASS=your-email-password
```

#### Option 2: Deploy to Render

1. Create a Render account at https://render.com/
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the build command: `npm install`
5. Set the start command: `npm start`
6. Add environment variables in the Render dashboard

### 4. Install pdf2htmlEX on the Server

For the PDF to HTML conversion to work, you need to install pdf2htmlEX on your server:

```bash
# For Ubuntu/Debian
sudo apt-get update
sudo apt-get install -y pdf2htmlex

# For CentOS/RHEL
sudo yum install -y pdf2htmlex
```

If your hosting provider doesn't allow installing system packages, consider using a Docker container or a service that supports custom installations.

## Frontend Deployment

### 1. Set up Environment Variables

Create a `.env.production` file in the frontend directory:

```
VITE_API_URL=https://your-backend-domain.com/api
```

### 2. Build the Frontend

```bash
cd frontend
npm run build
```

### 3. Deploy to a Frontend Hosting Service

#### Option 1: Deploy to Vercel

1. Create a Vercel account at https://vercel.com/
2. Install the Vercel CLI: `npm install -g vercel`
3. Run the following commands:

```bash
cd frontend
vercel
```

4. Follow the prompts to deploy your application

#### Option 2: Deploy to Netlify

1. Create a Netlify account at https://www.netlify.com/
2. Install the Netlify CLI: `npm install -g netlify-cli`
3. Run the following commands:

```bash
cd frontend
netlify deploy
```

4. Follow the prompts to deploy your application

## Connecting Frontend and Backend

1. Update the frontend's API URL to point to your deployed backend
2. Ensure CORS is properly configured in your backend to allow requests from your frontend domain

## Testing Your Deployment

1. Visit your frontend URL
2. Test the resume upload, editing, and export functionality
3. Test the authentication system

## Troubleshooting

- Check server logs for any errors
- Ensure all environment variables are correctly set
- Verify that MongoDB is accessible from your backend server
- Check that the email service is working correctly for OTP authentication

## Maintenance

- Regularly update dependencies to fix security vulnerabilities
- Monitor server resources and scale as needed
- Back up your MongoDB database regularly 