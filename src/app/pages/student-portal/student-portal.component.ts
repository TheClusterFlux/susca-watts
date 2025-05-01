import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './student-portal.component.html',
  styleUrls: ['./student-portal.component.css']
})
export class StudentPortalComponent {
  username: string = '';
  password: string = '';
  
  constructor(private translate: TranslateService) {}
  
  login() {
    alert('Login functionality will be implemented in future updates. Please contact the administrator for assistance.');
  }
}