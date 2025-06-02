import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfMappingService {
  private pdfMappings: { [key: string]: string } = {
    // Qualifications PDFs - mapping course keys to actual numbered PDF files
    'beautyHolistic1Year': '1. Qualifications/1. 1 YEAR - ITEC - Beauty Therapy Info Sheet - 2025.pdf',
    'healthSkincare2Year': '1. Qualifications/2. 2 YEAR - ITEC & SAAHSP Combined - Beauty Therapy Info Sheet - 2025.pdf',
    'hairdressing': '1. Qualifications/3. 3 YEAR - QCTO - Hairdresser.pdf',
    'beautySpecialist': '1. Qualifications/4.  6 Month - ITEC - Beauty Specialist  Info Sheet - 2025 .pdf',
    'holisticMassage': '1. Qualifications/5. 3 Month ITEC - Holistic Massage Info Sheet - 2025 .pdf',
    
    // Short Course & Master Classes PDFs - mapping course keys to actual numbered PDF files
    'nailTech': '2. Short Course & Master Classes/1. Nail Technology Short Course Info Sheet - 2025.pdf',
    'facials': '2. Short Course & Master Classes/2. Basic Facials Short Course Info Sheet - 2025.pdf',
    'makeup': '2. Short Course & Master Classes/3. Professional Make-up Short Course Info Sheet - 2025.pdf',
    'waxing': '2. Short Course & Master Classes/4. Waxing Info Sheet - 2025.pdf',
    'bodyMassage': '2. Short Course & Master Classes/5. Body Massage Info Sheet - 2025.pdf',
    'manicurePedicure': '2. Short Course & Master Classes/6. Manicure & Pedicure Info Sheet - 2025.pdf',
    'stageMakeup': '2. Short Course & Master Classes/7. Stage Make-up Master Class Info Sheet - 2025.pdf',
    'bridalMakeup': '2. Short Course & Master Classes/8. Bridal Make-up Master Class Info Sheet -2025.pdf',
    'eyelashExt': '2. Short Course & Master Classes/9. Eyelash Extensions Short Course Info Sheet - 2025 .pdf',
    'indianHeadMassage': '2. Short Course & Master Classes/10. Indian Head Short Course Info Sheet - 2025.pdf',
    'fibroblast': '2. Short Course & Master Classes/11. Fibroblast Short Course Info Sheet -2025  .pdf',
    'microneedling': '2. Short Course & Master Classes/12. Microneedling Short Course Info Sheet -2025 .pdf',
    'dermaplaning': '2. Short Course & Master Classes/13. Dermaplaning Short Course Info Sheet -2025  .pdf'
  };

  constructor() { }

  /**
   * Get PDF path for a course subcategory key
   * @param subcategoryKey - The key used in translation files (e.g., 'beautyHolistic1Year')
   * @returns The PDF file path relative to the docs directory
   */
  getPdfPath(subcategoryKey: string): string | null {
    return this.pdfMappings[subcategoryKey] || null;
  }

  /**
   * Open PDF in a new window/tab
   * @param pdfPath - The path to the PDF file
   */
  openPdf(pdfPath: string): void {
    if (!pdfPath) {
      console.warn('No PDF path provided');
      return;
    }

    // Construct the full URL to the PDF
    const fullPdfUrl = `docs/${pdfPath}`;
    
    // Open in new window/tab
    window.open(fullPdfUrl, '_blank', 'noopener,noreferrer');
  }

  /**
   * Get all available PDF mappings
   * @returns Object containing all PDF mappings
   */
  getAllMappings(): { [key: string]: string } {
    return { ...this.pdfMappings };
  }

  /**
   * Check if a PDF exists for a given subcategory key
   * @param subcategoryKey - The key to check
   * @returns True if PDF mapping exists
   */
  hasPdf(subcategoryKey: string): boolean {
    return !!this.pdfMappings[subcategoryKey];
  }
}
