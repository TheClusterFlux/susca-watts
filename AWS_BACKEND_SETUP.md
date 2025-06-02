# AWS SES Backend Setup Guide

This guide will help you set up a backend API to handle email sending through AWS SES.

## Frontend Implementation Complete ✅

The frontend is now configured to send contact form data to your backend API at `/api/contact`.

### Data Format Sent to Backend:
```json
{
  "name": "User Name",
  "email": "user@example.com", 
  "subject": "Contact Subject",
  "message": "User's message content",
  "timestamp": "2025-05-31T10:30:00.000Z"
}
```

### Expected Response Format:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

Or for errors:
```json
{
  "success": false,
  "error": "Error message here"
}
```

## Backend Setup Options

### Option 1: Node.js with Express (Recommended)

1. **Create a simple Node.js backend:**

```bash
mkdir susca-watts-backend
cd susca-watts-backend
npm init -y
npm install express cors aws-sdk helmet dotenv
npm install -D nodemon @types/node typescript
```

2. **Create the main server file (`server.js`):**

```javascript
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const AWS = require('aws-sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configure AWS SES
const ses = new AWS.SES({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080'
}));
app.use(express.json({ limit: '10mb' }));

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, timestamp } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // Email parameters
    const params = {
      Source: process.env.SES_FROM_EMAIL, // Must be verified in SES
      Destination: {
        ToAddresses: [process.env.SES_TO_EMAIL || 'middelburg@suscawatts.co.za']
      },
      Message: {
        Subject: {
          Data: `Contact Form: ${subject}`,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
              <p><strong>Timestamp:</strong> ${timestamp}</p>
            `,
            Charset: 'UTF-8'
          },
          Text: {
            Data: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Timestamp: ${timestamp}
            `,
            Charset: 'UTF-8'
          }
        }
      },
      ReplyToAddresses: [email]
    };

    // Send email via SES
    await ses.sendEmail(params).promise();

    res.json({
      success: true,
      message: 'Email sent successfully'
    });

  } catch (error) {
    console.error('SES Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send email. Please try again later.'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

3. **Create environment file (`.env`):**

```env
# AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here

# Email Configuration
SES_FROM_EMAIL=verified-sender@yourdomain.com
SES_TO_EMAIL=middelburg@suscawatts.co.za

# Server Configuration
PORT=3001
FRONTEND_URL=http://localhost:8080

# For production
NODE_ENV=production
```

4. **Update package.json scripts:**

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Option 2: AWS Lambda + API Gateway (Serverless)

1. **Create a Lambda function:**

```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const { name, email, subject, message, timestamp } = body;

    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        },
        body: JSON.stringify({
          success: false,
          error: 'Missing required fields'
        })
      };
    }

    const params = {
      Source: process.env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.SES_TO_EMAIL]
      },
      Message: {
        Subject: {
          Data: `Contact Form: ${subject}`,
          Charset: 'UTF-8'
        },
        Body: {
          Html: {
            Data: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
              <p><strong>Timestamp:</strong> ${timestamp}</p>
            `,
            Charset: 'UTF-8'
          }
        }
      },
      ReplyToAddresses: [email]
    };

    await ses.sendEmail(params).promise();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: false,
        error: 'Failed to send email'
      })
    };
  }
};
```

## AWS SES Setup Steps

### 1. Verify Your Email Addresses
- Go to AWS SES Console
- Navigate to "Verified identities"
- Add and verify your sending email address
- Add and verify your receiving email address (middelburg@suscawatts.co.za)

### 2. Request Production Access (If Needed)
- By default, SES is in sandbox mode
- You can only send to verified email addresses
- Request production access to send to any email address

### 3. Create IAM User for SES
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ses:SendEmail",
        "ses:SendRawEmail"
      ],
      "Resource": "*"
    }
  ]
}
```

### 4. Update Your Angular App's Proxy Configuration

Create or update `proxy.conf.json` in your Angular project:

```json
{
  "/api/*": {
    "target": "http://localhost:3001",
    "secure": true,
    "changeOrigin": true
  }
}
```

Update your `angular.json` file to use the proxy:

```json
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "configurations": {
    "development": {
      "browserTarget": "susca-watts:build:development",
      "proxyConfig": "proxy.conf.json"
    }
  }
}
```

## Testing

1. **Start your backend:** `npm run dev`
2. **Start your Angular app:** `npm start`
3. **Test the contact form** - it should now send emails via AWS SES!

## Production Deployment

### For Node.js Backend:
- Deploy to AWS EC2, Heroku, or any VPS
- Set up proper environment variables
- Use PM2 for process management
- Set up SSL/HTTPS

### For Lambda:
- Deploy using AWS CLI or Serverless Framework
- Set up API Gateway
- Configure environment variables

## Security Considerations

1. **Rate Limiting:** Implement rate limiting to prevent spam
2. **Validation:** Server-side validation for all inputs
3. **Sanitization:** Sanitize HTML content to prevent XSS
4. **CORS:** Configure CORS properly for your domain
5. **Environment Variables:** Never commit AWS credentials to code

## Monitoring

- Set up CloudWatch logs for your Lambda/EC2
- Monitor SES sending statistics
- Set up alerts for failed emails
- Track API usage and errors

Let me know when you've set up the AWS side and I can help you test the integration!
