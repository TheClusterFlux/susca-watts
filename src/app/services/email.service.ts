import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
  isComingSoon?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private readonly apiUrl = environment.apiUrl;

  constructor() {}
  async sendEmail(formData: ContactFormData): Promise<EmailResponse> {
    // Check if email functionality is enabled
    if (!environment.emailFunctionalityEnabled) {
      return {
        success: true,
        isComingSoon: true,
        message: 'Email functionality is coming soon! Your message has been received and will be processed once our email system is active.'
      };
    }

    try {
      const response = await fetch(`${this.apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString()
        })
      });      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error ?? `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Email service error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email. Please try again later.'
      };
    }
  }
}
