const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Debug: Log environment variables with more detail
console.log('Environment Variables Check:', {
  SMTP_USER: process.env.SMTP_USER || 'NOT SET',
  SMTP_PASS: process.env.SMTP_PASS ? 'SET (length: ' + process.env.SMTP_PASS.length + ')' : 'NOT SET',
  NODE_ENV: process.env.NODE_ENV || 'development',
  DOTENV_LOADED: process.env.DOTENV_LOADED || 'false'
});

// Initialize Nodemailer transporter with both SMTP and Gmail settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Debug: Log transporter configuration
console.log('Transporter Configuration:', {
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'NOT SET',
    pass: process.env.SMTP_PASS ? 'SET' : 'NOT SET'
  }
});

// Generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP via email
const sendOTP = async (email, otp) => {
  try {
    // Debug: Log attempt to send OTP
    console.log('Attempting to send OTP:', {
      to: email,
      from: process.env.SMTP_USER || 'NOT SET',
      otpLength: otp.length
    });

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('SMTP Configuration Error:', {
        SMTP_USER: process.env.SMTP_USER ? 'SET' : 'MISSING',
        SMTP_PASS: process.env.SMTP_PASS ? 'SET' : 'MISSING'
      });
      throw new Error('SMTP credentials are missing. Please check your .env file.');
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Your OTP for Resume Parser',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3366FF; text-align: center;">Your OTP for Resume Parser</h1>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center;">
            <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #333;">${otp}</p>
          </div>
          <p style="color: #666; text-align: center;">This OTP will expire in 10 minutes.</p>
          <p style="color: #666; text-align: center; font-size: 12px;">If you didn't request this OTP, please ignore this email.</p>
        </div>
      `
    };

    // Debug: Log mail options (excluding sensitive data)
    console.log('Mail Options:', {
      to: mailOptions.to,
      from: mailOptions.from,
      subject: mailOptions.subject
    });

    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully to:', email);
  } catch (error) {
    console.error('Detailed OTP Send Error:', {
      name: error.name,
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    throw new Error('Failed to send OTP');
  }
};

module.exports = {
  generateOTP,
  sendOTP
}; 