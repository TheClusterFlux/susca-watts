import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  submitForm() {
    this.formSubmitted = false;
    this.formSubmitError = false;
    
    if (this.contactForm.valid) {
      // In a real-world application, you would send this data to your backend API
      console.log('Form submitted:', this.contactForm.value);
      
      // Simulate a successful form submission
      setTimeout(() => {
        this.formSubmitted = true;
        this.contactForm.reset();
      }, 1000);
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
