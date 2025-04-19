import { Component, Input } from '@angular/core';
import { CourseItem } from '../../models/course-item';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-item.component.html',
  styleUrl: './course-item.component.css'
})
export class CourseItemComponent {
  @Input() courseItem!: CourseItem;

  displaySubCategories: boolean = false;
  toggleSubCategories() {
    this.displaySubCategories = !this.displaySubCategories;
  }
  
  constructor() { }
}
