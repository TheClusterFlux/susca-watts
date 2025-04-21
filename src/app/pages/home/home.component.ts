import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { ListItem } from '../../models/list-item';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListItemComponent, CarouselComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  welcomeMessage: string = 'Welcome to Our Website';
  listItems: ListItem[] = [
    { id: 1, heading: 'ACADEMICS', description: 'Explore academic programs, resources, and support for students.', icon: 'fas fa-graduation-cap', link: '/academics' },
    { id: 2, heading: 'BUSINESS', description: 'Discover business opportunities, partnerships, and resources.', icon: 'fas fa-briefcase', link: '/business' },
    { id: 3, heading: 'COURSES', description: 'Browse our wide range of courses and learning materials.', icon: 'fas fa-book', link: '/courses' },
    { id: 4, heading: 'STUDENT PORTAL', description: 'Access your personalized student dashboard and tools.', icon: 'fas fa-user', link: '/student-portal' },
    { id: 5, heading: 'RPL', description: 'Learn about Recognition of Prior Learning and how it works.', icon: 'fas fa-certificate', link: '/rpd' }
  ];
}
