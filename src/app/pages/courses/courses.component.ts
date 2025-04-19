import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CourseItem } from '../../models/course-item';
import { CourseItemComponent } from '../../components/course-item/course-item.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseItemComponent],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  @ViewChildren('courseElement') courseElements!: QueryList<ElementRef>;

  scrollToCourse(courseId: number): void {
      const element = this.courseElements.find((el) => el.nativeElement.id === `course-${courseId}`);
      if (element) {
          element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }

  courses: CourseItem[] = [
    {
      id: 1, title: 'Online Courses', description: 'Online courses offer several benefits to students. They provide flexibility and convenience, allowing students to learn at their own pace and on their own schedule. Online courses also offer a wide range of subjects and topics, making it easier for students to find courses that match their interests and career goals. Additionally, online courses can be more affordable than traditional classroom-based courses, making education more accessible to a wider range of students', imageUrl: 'assets/images/course-image-1.png',
      subCategories: [
        { id: 1, name: 'Subcategory 1.1' },
        { id: 2, name: 'Subcategory 1.2' }
      ]
    },
    {
      id: 2, title: 'Beauty/ Health & Skincare', description: 'The health and skincare industry is a vast and diverse sector that encompasses a wide range of products and services aimed at promoting health, wellness, and beauty. It includes everything from cosmetics, personal care products, and supplements to medical treatments, wellness programs, and fitness regimes. The industry is constantly evolving to meet the changing needs and preferences of consumers', imageUrl: 'assets/images/course-image-2.png',
      subCategories: [
        { id: 3, name: 'Beauty Specialist', duration: '1 Year with contract tuition one day a week', qualification: 'National Certificate', certification: 'Services SETA', venue: 'Middleburg', link: '/beauty-specialist' },
        { id: 4, name: 'Fashion, Theatre and Madia Make-up', duration: '1 Year with contract tuition one day a week', qualification: 'International Diploma', certification: 'CIDESCO', venue: 'Middleburg', link: '/fashion-theatre-make-up' },
        { id: 5, name: 'Health and Skincare', duration: '1 Year with contract tuition one day a week', qualification: 'National Certificate', certification: 'Services SETA', venue: 'Middleburg', link: '/health-skincare' },
        { id: 6, name: 'Reflexology', duration: '3 Months with contract tuition one day a week', qualification: 'Diploma', certification: 'ITEC', venue: 'Middleburg', link: '/reflexology' },
      ]
    },
    {
      id: 3, title: 'Agriculture', description: 'The agriculture industry is a vital sector that encompasses a wide range of activities related to the production, processing, and distribution of food, fiber, and other products. It plays a crucial role in ensuring food security, providing livelihoods for millions of people, and contributing to economic growth and development. The industry is constantly evolving to meet the changing needs and demands of consumers', imageUrl: 'assets/images/course-image-1.png',
      subCategories: [
        { id: 7, name: 'Animal Production Management', duration: '1 Year', qualification: 'National Certificate', certification: 'SAQA', venue: 'Middleburg', link: '/animal-production-management' },
        { id: 8, name: 'Plant Production Management', duration: '1 Year', qualification: 'National Certificate', certification: 'SAQA', venue: 'Middleburg', link: '/plant-production-management' },
      ]
    }
  ];
}
