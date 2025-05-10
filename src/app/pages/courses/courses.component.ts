import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CourseItem, SubCategory } from '../../models/course-item';
import { CourseItemComponent } from '../../components/course-item/course-item.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseItemComponent, TranslateModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent implements OnInit {
  @ViewChildren('courseElement') courseElements!: QueryList<ElementRef>;
  courses: CourseItem[] = [];

  constructor(private readonly translate: TranslateService) {}

  ngOnInit(): void {
    this.loadCourses();
    
    // Subscribe to language changes to reload courses when language changes
    this.translate.onLangChange.subscribe(() => {
      this.loadCourses();
    });
  }

  loadCourses(): void {
    // Important: Reset courses array and ensure we don't have multiple loads
    this.courses = [];
    
    // Use a more centralized approach to prevent race conditions
    // First get both main course category translations
    forkJoin({
      accredited: this.translate.get('courses.courseData.accredited'),
      nonCredited: this.translate.get('courses.courseData.nonCreditBearing')
    }).subscribe(results => {
      // Then get subcategories in parallel
      Promise.all([
        this.getAccreditedSubCategories(),
        this.getNonCreditSubCategories()
      ]).then(([accreditedSubcats, nonCreditSubcats]) => {
        // Build the complete array at once to avoid partial rendering
        this.courses = [
          {
            id: 1,
            title: results.accredited.title,
            description: results.accredited.description,
            imageUrl: 'assets/images/course-image-1.png',
            subCategories: accreditedSubcats
          },
          {
            id: 2,
            title: results.nonCredited.title,
            description: results.nonCredited.description,
            imageUrl: 'assets/images/course-image-2.png',
            subCategories: nonCreditSubcats
          }
        ];
      });
    });
  }
  
  async getAccreditedSubCategories(): Promise<SubCategory[]> {
    const subcategories: SubCategory[] = [];
    
    return new Promise<SubCategory[]>((resolve) => {
      this.translate.get('courses.courseData.accredited.subCategories').subscribe((res: any) => {
        Object.keys(res).forEach((key, index) => {
          const item = res[key];
          subcategories.push({
            id: 100 + index + 1,
            name: item.name,
            duration: item.duration,
            qualification: item.qualification,
            certification: item.certification,
            venue: item.venue,
            details: item.details
          });
        });
        resolve(subcategories);
      });
    });
  }
  
  async getNonCreditSubCategories(): Promise<SubCategory[]> {
    const subcategories: SubCategory[] = [];
    
    return new Promise<SubCategory[]>((resolve) => {
      this.translate.get('courses.courseData.nonCreditBearing.subCategories').subscribe((res: any) => {
        Object.keys(res).forEach((key, index) => {
          const item = res[key];
          subcategories.push({
            id: 200 + index + 1,
            name: item.name,
            duration: item.duration,
            venue: item.venue,
            details: item.details
          });
        });
        resolve(subcategories);
      });
    });
  }

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
}
