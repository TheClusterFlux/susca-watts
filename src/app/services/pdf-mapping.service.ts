import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfMappingService {
  private pdfMappings: { [key: string]: string } = {
    // Qualifications PDFs - mapping course keys to actual numbered PDF files (2026)
    'beautyHolistic1Year': '1. Qualifications/1. 1 YEAR - ITEC & QCTO Combined - Beauty Therapy Info Sheet - 2026.pdf',
    'healthSkincare2Year': '1. Qualifications/2. 2- YEAR -  SAAHSP & ITEC Combined - Health and Skincare Info Sheet 2026.pdf',
    'hairdressing': '1. Qualifications/3. 3 YEAR - QCTO - Hairdresser Info Sheet - 2025 2026.pdf',
    'assessor': '1. Qualifications/1. ETDP - Course Info sheets 2026.pdf',
    'facilitator': '1. Qualifications/1. ETDP - Course Info sheets 2026.pdf',
    'moderator': '1. Qualifications/1. ETDP - Course Info sheets 2026.pdf',
    
    // Short Course & Master Classes PDFs - mapping course keys to actual numbered PDF files (2026)
    'nailTech': '2. Short Course & Master Classes/1. Nail Technology  Info Sheet - 2026.pdf',
    'makeup': '2. Short Course & Master Classes/2. Professional Make-up Info Sheet - 2026.pdf',
    'waxing': '2. Short Course & Master Classes/3. Waxing Info Sheet - 2026.pdf',
    'bodyMassage': '2. Short Course & Master Classes/4. Body Massage Info Sheet - 2026.pdf',
    'manicurePedicure': '2. Short Course & Master Classes/5. Manicure & Pedicure Info Sheet - 2026.pdf',
    'eyelashExt': '2. Short Course & Master Classes/6. Eyelash Extensions Info Sheet - 2026.pdf',
    'eyelashBrowTreatments': '2. Short Course & Master Classes/7. Eyelash and Brow Treatments Info Sheet - 2026.pdf'
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
