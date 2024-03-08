// pages/api/depositEmail.ts
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const formData = req.body; // Form data sent from the client

    // Extract the recipient email from the form data

    // Your nodemailer setup
    const transporter = nodemailer.createTransport({
      // Configure your email service
      host: process.env.SERVICE_PROVIDER,
      port: process.env.PORT,
      secure: false, // Set to true if using SSL
      auth: {
        user: process.env.USER_EMAIL, // Your SendinBlue SMTP username or API key
        pass: process.env.USER_PASS, // Your SendinBlue SMTP password or API key
      },
    });

    // Create the email content
    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.EMAIL_ADDRESS,
      subject: 'Deposit Request',
      text: `Deposit Details:\n\n${JSON.stringify(formData, null, 2)}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Email sending failed' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
