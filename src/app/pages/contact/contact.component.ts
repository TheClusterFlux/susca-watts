import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactForm: FormGroup;
  formSubmitted = false;
  formSubmitError = false;
  isSubmitting = false;
  isComingSoon = false;
  
  constructor(private readonly fb: FormBuilder, private readonly emailService: EmailService) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }  async submitForm() {
    this.formSubmitted = false;
    this.formSubmitError = false;
    this.isComingSoon = false;
    
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      try {
        const result = await this.emailService.sendEmail(this.contactForm.value);
        
        if (result.success) {
          this.formSubmitted = true;
          this.isComingSoon = result.isComingSoon || false;
          this.contactForm.reset();
        } else {
          this.formSubmitError = true;
          console.error('Email sending failed:', result.error);
        }
      } catch (error) {
        console.error('Error sending email:', error);
        this.formSubmitError = true;
      } finally {
        this.isSubmitting = false;
      }
    } else {
      this.formSubmitError = true;
      // Mark all form controls as touched to display validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
