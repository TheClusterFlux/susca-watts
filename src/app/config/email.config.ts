// EmailJS Configuration
// To set up EmailJS, follow these steps:

export const emailConfig = {
  // 1. Go to https://www.emailjs.com/ and create a free account
  // 2. Create a new service (e.g., Gmail, Outlook, etc.)
  // 3. Create an email template with these variables:
  //    - {{from_name}} - sender's name
  //    - {{from_email}} - sender's email  
  //    - {{subject}} - email subject
  //    - {{message}} - email message
  //    - {{to_email}} - your receiving email (middelburg@suscawatts.co.za)
  //    - {{reply_to}} - sender's email for replies
  
  // 4. Replace these placeholder values with your actual EmailJS credentials:
  serviceId: 'YOUR_SERVICE_ID', // From EmailJS dashboard
  templateId: 'YOUR_TEMPLATE_ID', // From EmailJS dashboard  
  publicKey: 'YOUR_PUBLIC_KEY', // From EmailJS dashboard
  
  // Your receiving email
  toEmail: 'middelburg@suscawatts.co.za'
};

// Example EmailJS template:
/*
Subject: New Contact Form Message: {{subject}}

Hello,

You have received a new message from your website contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from the Susca Watts Academy contact form.
Please reply to: {{reply_to}}
*/
