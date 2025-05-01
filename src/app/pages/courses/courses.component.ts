import { CommonModule } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CourseItem } from '../../models/course-item';
import { CourseItemComponent } from '../../components/course-item/course-item.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseItemComponent, TranslateModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  @ViewChildren('courseElement') courseElements!: QueryList<ElementRef>;

  constructor(private translate: TranslateService) {}

  scrollToCourse(courseId: string | number): void {
      if (courseId === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      
      const element = this.courseElements.find((el) => el.nativeElement.id === `course-${courseId}`);
      if (element) {
          element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  }

  courses: CourseItem[] = [
    {
      id: 1, 
      title: 'Online Courses', 
      description: 'Online courses offer several benefits to students. They provide flexibility and convenience, allowing students to learn at their own pace and on their own schedule. Online courses also offer a wide range of subjects and topics, making it easier for students to find courses that match their interests and career goals. Additionally, online courses can be more affordable than traditional classroom-based courses, making education more accessible to a wider range of students.',
      imageUrl: 'assets/images/course-image-1.png',
      subCategories: [
        { id: 101, name: 'Business Management', duration: 'Self-paced', qualification: 'National Certificate', certification: 'Services SETA', venue: 'Online' },
        { id: 102, name: 'Project Management', duration: 'Self-paced', qualification: 'Diploma', certification: 'Services SETA', venue: 'Online' },
        { id: 103, name: 'Skills Development Facilitator', duration: 'Self-paced', qualification: 'Certificate', certification: 'ETDP SETA', venue: 'Online' }
      ]
    },
    {
      id: 2, 
      title: 'Beauty/ Health & Skincare', 
      description: 'The health and skincare industry is a vast and diverse sector that encompasses a wide range of products and services aimed at promoting health, wellness, and beauty. It includes everything from cosmetics, personal care products, and supplements to medical treatments, wellness programs, and fitness regimes. The industry is constantly evolving to meet the changing needs and preferences of consumers.',
      imageUrl: 'assets/images/course-image-2.png',
      subCategories: [
        { id: 201, name: 'Beauty Specialist', duration: '1 Year with contract tuition one day a week', qualification: 'National Certificate', certification: 'Services SETA', venue: 'Middelburg', link: '/beauty-specialist' },
        { id: 202, name: 'Fashion, Theatre and Media Make-up', duration: '1 Year with contract tuition one day a week', qualification: 'International Diploma', certification: 'CIDESCO', venue: 'Middelburg', link: '/fashion-theatre-make-up' },
        { id: 203, name: 'Health and Skincare', duration: '1 Year with contract tuition one day a week', qualification: 'National Certificate', certification: 'Services SETA', venue: 'Middelburg', link: '/health-skincare' },
        { id: 204, name: 'Reflexology', duration: '3 Months with contract tuition one day a week', qualification: 'Diploma', certification: 'ITEC', venue: 'Middelburg', link: '/reflexology' },
        { id: 205, name: 'Manicure & Pedicure', duration: '3 Months with contract tuition one day a week', qualification: 'Certificate', certification: 'ITEC', venue: 'Middelburg' },
        { id: 206, name: 'Nail Technology', duration: '6 Months with contract tuition one day a week', qualification: 'Diploma', certification: 'ITEC', venue: 'Middelburg' }
      ]
    },
    {
      id: 3, 
      title: 'Agriculture', 
      description: 'The agriculture industry is a vital sector that encompasses a wide range of activities related to the production, processing, and distribution of food, fiber, and other products. It plays a crucial role in ensuring food security, providing livelihoods for millions of people, and contributing to economic growth and development. The industry is constantly evolving to meet the changing needs and demands of consumers.',
      imageUrl: 'assets/images/course-image-1.png',
      subCategories: [
        { id: 301, name: 'Animal Production Management', duration: '1 Year', qualification: 'National Certificate', certification: 'SAQA', venue: 'Middelburg', link: '/animal-production-management' },
        { id: 302, name: 'Plant Production Management', duration: '1 Year', qualification: 'National Certificate', certification: 'SAQA', venue: 'Middelburg', link: '/plant-production-management' }
      ]
    },
    {
      id: 4, 
      title: 'Business', 
      description: 'The business industry is a vast and diverse sector that encompasses a wide range of activities related to the production, marketing, and sale of goods and services. It includes everything from small businesses to multinational corporations and covers a broad range of industries such as finance, retail, manufacturing, and more. The industry is constantly evolving to meet the changing needs and demands of consumers.',
      imageUrl: 'assets/images/course-image-2.png',
      subCategories: [
        { id: 401, name: 'New Venture Creation', duration: '1 Year with contract tuition one day a week', qualification: 'National Certificate', certification: 'Services SETA', venue: 'Middelburg' },
        { id: 402, name: 'Business Administration Services', duration: '1 Year with contract tuition one day a week', qualification: 'National Certificate', certification: 'Services SETA', venue: 'Middelburg' },
        { id: 403, name: 'Business Management', duration: '1 Year with contract tuition one day a week', qualification: 'National Diploma', certification: 'Services SETA', venue: 'Middelburg' },
        { id: 404, name: 'Project Management', duration: '6 Months with contract tuition one day a week', qualification: 'Certificate', certification: 'Services SETA', venue: 'Middelburg' }
      ]
    },
    {
      id: 5, 
      title: 'Hairdressing', 
      description: 'The hairdressing industry is a dynamic and creative sector that encompasses a wide range of activities related to hair styling, coloring, and treatment. It includes everything from hair salons and barbershops to beauty schools and product manufacturers. The industry is constantly evolving to meet the changing needs and preferences of consumers, with new trends and techniques emerging every year.',
      imageUrl: 'assets/images/course-image-1.png',
      subCategories: [
        { id: 501, name: 'Hairdressing', duration: '2 Years with contract tuition one day a week', qualification: 'National Certificate', certification: 'Services SETA', venue: 'Middelburg' },
        { id: 502, name: 'Barbering', duration: '1 Year with contract tuition one day a week', qualification: 'Certificate', certification: 'Services SETA', venue: 'Middelburg' },
        { id: 503, name: 'Hair Extensions', duration: '3 Months with contract tuition one day a week', qualification: 'Certificate', certification: 'Services SETA', venue: 'Middelburg' }
      ]
    },
    {
      id: 6, 
      title: 'ETDP Teaching', 
      description: 'The Education, Training and Development Practices (ETDP) industry is a dynamic and diverse sector that encompasses a wide range of activities related to the development, implementation, and evaluation of learning programs. It includes everything from schools and universities to training providers and e-learning platforms. The industry is constantly evolving to meet the changing needs and demands of learners, with new technologies and teaching methodologies emerging every year.',
      imageUrl: 'assets/images/course-image-2.png',
      subCategories: [
        { id: 601, name: 'Assessor Course', duration: '3 Months', qualification: 'Certificate', certification: 'ETDP SETA', venue: 'Middelburg' },
        { id: 602, name: 'Moderator Course', duration: '3 Months', qualification: 'Certificate', certification: 'ETDP SETA', venue: 'Middelburg' },
        { id: 603, name: 'Skills Development Facilitator', duration: '6 Months', qualification: 'Certificate', certification: 'ETDP SETA', venue: 'Middelburg' },
        { id: 604, name: 'Early Childhood Development', duration: '1 Year', qualification: 'National Certificate', certification: 'ETDP SETA', venue: 'Middelburg' }
      ]
    }
  ];
}
