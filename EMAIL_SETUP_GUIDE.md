# Email Functionality Setup Guide

I've implemented a simple email functionality for your contact form using the mailto: protocol. This opens the user's default email client with a pre-filled message.

## How It Works

When users submit the contact form:
1. The form validates the input
2. If valid, it opens the user's default email client (Outlook, Gmail, etc.)
3. The email is pre-filled with:
   - Recipient: middelburg@suscawatts.co.za
   - Subject: The subject from the form
   - Body: Formatted message with name, email, and message content
4. The user sends the email from their own email client
5. A success message appears on the website

## Benefits of This Approach

✅ **Simple**: No complex setup or third-party services required  
✅ **Reliable**: Uses the user's own email client  
✅ **Personal**: Emails come directly from the user's email address  
✅ **No Costs**: No monthly fees or API limits  
✅ **Privacy**: No data goes through third-party services  

## Testing

To test the functionality:
1. Start the development server: `npm start`
2. Navigate to the contact page
3. Fill out and submit the form
4. Your default email client should open with the pre-filled message
5. Send the email to complete the test

## Alternative: Backend API Implementation

If you want to implement a backend service later for automatic email sending, I've included a method in the EmailService for this. Here are your options:

### Option A: Node.js with Nodemailer
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  const mailOptions = {
    from: email,
    to: 'middelburg@suscawatts.co.za',
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };
  
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});
```

### Option B: AWS SES
1. Set up AWS SES service
2. Create IAM user with SES permissions
3. Use AWS SDK to send emails

### Option C: SendGrid
1. Create SendGrid account
2. Get API key
3. Use SendGrid's Node.js library

### To Enable Backend API:
In `contact.component.ts`, uncomment this line in the `submitForm()` method:
```typescript
// await this.emailService.sendEmailViaBackend(this.contactForm.value);
```

## Current Implementation Features

✅ Form validation with user feedback  
✅ Loading states during submission  
✅ Success/error messages  
✅ Internationalization (English/Afrikaans)  
✅ Responsive design  
✅ Accessibility features  
✅ mailto: protocol for email client integration  

## Security Considerations

1. **Client-side validation**: All validation happens on the client
2. **No sensitive data**: No API keys or credentials exposed
3. **User control**: Users send emails from their own accounts
4. **Rate limiting**: Consider implementing if you add backend API
5. **CAPTCHA**: Consider adding for spam protection with backend implementation

## Troubleshooting

- **Email client doesn't open**: User may not have a default email client configured
- **Form not submitting**: Check console for validation errors
- **Success message doesn't show**: Check browser console for JavaScript errors

## Next Steps

1. Test the current mailto: functionality
2. Consider implementing backend API for automatic sending
3. Add CAPTCHA if spam becomes an issue
4. Monitor user feedback on the email experience
5. Consider adding alternative contact methods (WhatsApp, phone)

The current implementation is production-ready and provides a good user experience while being simple to maintain!

## Backend Implementation Examples

### Option A: Node.js with Nodemailer
```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  
  const mailOptions = {
    from: email,
    to: 'middelburg@suscawatts.co.za',
    subject: `Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };
  
  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send email' });
  }
});
```

### Option B: AWS SES
1. Set up AWS SES service
2. Create IAM user with SES permissions
3. Use AWS SDK to send emails

### Option C: SendGrid
1. Create SendGrid account
2. Get API key
3. Use SendGrid's Node.js library

## Security Considerations

1. **EmailJS**: Public keys are safe to expose in frontend code
2. **Backend API**: Keep email credentials secure on server
3. **Rate Limiting**: Implement to prevent spam
4. **Validation**: Server-side validation for all inputs
5. **CAPTCHA**: Consider adding for spam protection

## Current Implementation Features

✅ Form validation with user feedback
✅ Loading states during submission
✅ Success/error messages
✅ Internationalization (English/Afrikaans)
✅ Responsive design
✅ Accessibility features

## Testing

To test the current setup:
1. Start the development server: `npm start`
2. Navigate to `/contact`
3. Fill out the form
4. Submit and check for success/error messages

## Troubleshooting

- **EmailJS not working**: Check console for errors, verify credentials
- **Form not submitting**: Check network tab for failed requests
- **Validation errors**: Ensure all required fields are filled correctly

## Next Steps

1. Set up EmailJS account and configure credentials
2. Test the email functionality
3. Consider implementing additional security measures
4. Monitor email delivery rates
5. Set up email templates for different types of inquiries

Let me know if you need help with any of these steps!
