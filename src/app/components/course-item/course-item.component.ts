import { Component, Input } from '@angular/core';
import { CourseItem } from '../../models/course-item';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css',
  styles: [`
    .venue-container {
      margin-bottom: 10px;
    }
    .venue-container p strong {
      margin-bottom: 5px;
    }
    .venue-list {
      margin-top: 5px;
      margin-bottom: 10px;
      padding-left: 20px;
    }
    .venue-list li {
      margin-bottom: 3px;
    }
  `]
})
export class CourseItemComponent {
  @Input() courseItem!: CourseItem;

  displaySubCategories: boolean = false;
  toggleSubCategories() {
    this.displaySubCategories = !this.displaySubCategories;
  }
  
  constructor() { }
  
  isVenueArray(venue: string | string[]): venue is string[] {
    return Array.isArray(venue);
  }
}
