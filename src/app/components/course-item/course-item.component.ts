import { Component, Input } from '@angular/core';
import { CourseItem } from '../../models/course-item';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PdfMappingService } from '../../services/pdf-mapping.service';

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
  
  constructor(private readonly pdfMappingService: PdfMappingService) { }
  
  isVenueArray(venue: string | string[]): venue is string[] {
    return Array.isArray(venue);
  }

  /**
   * Open PDF document for a subcategory
   * @param pdfPath - Path to the PDF file
   */
  openPdf(pdfPath: string): void {
    this.pdfMappingService.openPdf(pdfPath);
  }

  /**
   * Check if a subcategory has an associated PDF
   * @param pdfPath - Path to check
   * @returns True if PDF path exists
   */
  hasPdf(pdfPath?: string): boolean {
    return !!pdfPath;
  }
}
