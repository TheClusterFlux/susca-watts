import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CourseItem, SubCategory } from '../../models/course-item';
import { CourseItemComponent } from '../../components/course-item/course-item.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { PdfMappingService } from '../../services/pdf-mapping.service';

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

  constructor(
    private readonly translate: TranslateService,
    private readonly pdfMappingService: PdfMappingService
  ) {}

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
  }  async getAccreditedSubCategories(): Promise<SubCategory[]> {
    const subcategories: SubCategory[] = [];
    
    return new Promise<SubCategory[]>((resolve) => {
      this.translate.get('courses.courseData.accredited.subCategories').subscribe((res: any) => {
        Object.keys(res).forEach((key, index) => {
          const item = res[key];
          const pdfPath = this.pdfMappingService.getPdfPath(key);
          
          subcategories.push({
            id: 100 + index + 1,
            name: item.name,
            duration: item.duration,
            qualification: item.qualification,
            certification: item.certification,
            venue: item.venue,
            details: item.details,
            pdfPath: pdfPath ?? undefined
          });
        });
        
        // Sort subcategories by certification body and type
        const sortedSubcategories = this.sortCoursesByGroup(subcategories);
        resolve(sortedSubcategories);
      });
    });
  }    async getNonCreditSubCategories(): Promise<SubCategory[]> {
    const subcategories: SubCategory[] = [];
    
    return new Promise<SubCategory[]>((resolve) => {
      this.translate.get('courses.courseData.nonCreditBearing.subCategories').subscribe((res: any) => {
        Object.keys(res).forEach((key, index) => {
          const item = res[key];
          const pdfPath = this.pdfMappingService.getPdfPath(key);
          
          subcategories.push({
            id: 200 + index + 1,
            name: item.name,
            duration: item.duration,
            venue: item.venue,
            details: item.details,
            pdfPath: pdfPath ?? undefined
          });
        });
        
        // Sort non-credit courses by type
        const sortedSubcategories = this.sortNonCreditCoursesByGroup(subcategories);
        resolve(sortedSubcategories);
      });
    });
  }

  /**
   * Sort courses by certification body and type for better grouping
   */
  private sortCoursesByGroup(subcategories: SubCategory[]): SubCategory[] {
    // Define the order for certification bodies
    const certificationOrder: { [key: string]: number } = {
      'QCTO': 1,           // National qualifications first
      'SAAHSP & ITEC': 2,  // Combined certifications
      'SAAHSP': 3,         // Health and skincare
      'ITEC': 4,           // Beauty and massage
      'ETDP SETA': 5,      // Education and training
      'Services SETA': 6,  // Other SETA courses
      'Online': 7          // Online courses last
    };

    // Define course type priority (for courses with same certification)
    const getCoursePriority = (course: SubCategory): number => {
      const name = course.name.toLowerCase();
      
      // Hairdressing courses
      if (name.includes('hairdressing') || name.includes('hair')) return 1;
      
      // Multi-year comprehensive programs
      if (name.includes('2-year') || name.includes('2 year')) return 2;
      if (name.includes('1-year') || name.includes('1 year')) return 3;
      
      // Beauty specialist courses
      if (name.includes('beauty specialist')) return 4;
      if (name.includes('health and skincare')) return 5;
      
      // Massage courses
      if (name.includes('holistic massage')) return 6;
      
      // ETDP courses
      if (name.includes('facilitator')) return 7;
      if (name.includes('assessor')) return 8;
      if (name.includes('moderator')) return 9;
      
      return 10; // Default for other courses
    };

    return subcategories.sort((a, b) => {
      // First sort by certification body
      const certA = certificationOrder[a.certification || ''] || 999;
      const certB = certificationOrder[b.certification || ''] || 999;
      
      if (certA !== certB) {
        return certA - certB;
      }
      
      // Then sort by course type priority
      const priorityA = getCoursePriority(a);
      const priorityB = getCoursePriority(b);
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // Finally sort alphabetically
      return a.name.localeCompare(b.name);
    });
  }
  
  /**
   * Sort non-credit courses by type for better grouping
   */
  private sortNonCreditCoursesByGroup(subcategories: SubCategory[]): SubCategory[] {
    // Define course type priority for non-credit courses
    const getCoursePriority = (course: SubCategory): number => {
      const name = course.name.toLowerCase();
      
      // Nail and beauty enhancement
      if (name.includes('nail technology') || name.includes('nail tech')) return 1;
      
      // Facial and skincare treatments
      if (name.includes('facials') || name.includes('facial')) return 2;
      if (name.includes('dermaplaning')) return 3;
      if (name.includes('microneedling')) return 4;
      if (name.includes('fibroblast')) return 5;
      
      // Makeup courses
      if (name.includes('professional make-up') || name.includes('professional makeup')) return 6;
      if (name.includes('bridal make-up') || name.includes('bridal makeup')) return 7;
      if (name.includes('stage make-up') || name.includes('stage makeup')) return 8;
      
      // Hair removal and body treatments
      if (name.includes('waxing')) return 9;
      if (name.includes('eyelash extensions')) return 10;
      
      // Massage treatments
      if (name.includes('body massage')) return 11;
      if (name.includes('indian head massage')) return 12;
      
      // Hand and foot care
      if (name.includes('manicure') || name.includes('pedicure')) return 13;
      
      // Online and business courses
      if (name.includes('online business')) return 14;
      
      return 15; // Default for other courses
    };

    return subcategories.sort((a, b) => {
      // Sort by course type priority
      const priorityA = getCoursePriority(a);
      const priorityB = getCoursePriority(b);
      
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      // Finally sort alphabetically
      return a.name.localeCompare(b.name);
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
