import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private readonly baseTitle = 'Susca Watts Academy';
  private readonly baseDescription = 'Accredited education and training institution offering courses in hairdressing, beauty therapy, health & skincare, and business skills in Middelburg, Mpumalanga, South Africa.';
  private readonly baseUrl = 'https://suscawatts.co.za';
  private readonly defaultImage = 'https://suscawatts.co.za/assets/images/accreditation/logo swa.jpg';
  constructor(
    private readonly titleService: Title,
    private readonly metaService: Meta
  ) {}

  updateSEO(data: SEOData): void {
    // Update title
    const title = data.title ? `${data.title} - ${this.baseTitle}` : this.baseTitle;
    this.titleService.setTitle(title);    // Update meta description
    const description = data.description ?? this.baseDescription;
    this.updateMetaTag('name', 'description', description);

    // Update keywords
    if (data.keywords) {
      this.updateMetaTag('name', 'keywords', data.keywords);
    }    // Update Open Graph tags
    const ogTitle = data.ogTitle ?? title;
    const ogDescription = data.ogDescription ?? description;
    const ogImage = data.ogImage ?? this.defaultImage;
    const ogUrl = data.ogUrl ?? this.baseUrl;

    this.updateMetaTag('property', 'og:title', ogTitle);
    this.updateMetaTag('property', 'og:description', ogDescription);
    this.updateMetaTag('property', 'og:image', ogImage);
    this.updateMetaTag('property', 'og:url', ogUrl);

    // Update Twitter Card tags
    this.updateMetaTag('property', 'twitter:title', ogTitle);
    this.updateMetaTag('property', 'twitter:description', ogDescription);
    this.updateMetaTag('property', 'twitter:image', ogImage);

    // Update canonical URL
    if (data.canonical) {
      this.updateCanonical(data.canonical);
    }
  }

  private updateMetaTag(attrName: string, attrValue: string, content: string): void {
    const selector = `${attrName}="${attrValue}"`;
    if (this.metaService.getTag(selector)) {
      this.metaService.updateTag({ [attrName]: attrValue, content });
    } else {
      this.metaService.addTag({ [attrName]: attrValue, content });
    }
  }

  private updateCanonical(url: string): void {
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.setAttribute('href', url);
    } else {
      const canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      canonical.setAttribute('href', url);
      document.head.appendChild(canonical);
    }
  }

  // Predefined SEO data for common pages
  getPageSEO(route: string): SEOData {
    const seoData: { [key: string]: SEOData } = {
      '/': {
        title: 'Home',
        description: 'Susca Watts Academy - Your one-stop solution for accredited education and training. Offering courses in hairdressing, beauty therapy, health & skincare, and business skills.',
        keywords: 'Susca Watts Academy, accredited education, training courses, Middelburg, Mpumalanga, South Africa',
        ogUrl: this.baseUrl
      },
      '/courses': {
        title: 'Courses',
        description: 'Explore our comprehensive range of accredited courses including QCTO hairdressing, ITEC beauty therapy, health & skincare, ETDP facilitator training, and business skills.',
        keywords: 'QCTO courses, ITEC training, hairdressing courses, beauty therapy, health skincare, ETDP SETA, business training',
        ogUrl: `${this.baseUrl}/courses`
      },
      '/contact': {
        title: 'Contact Us',
        description: 'Get in touch with Susca Watts Academy. Located at 8A Vos Street, Groenkol, Middelburg, Mpumalanga. Call +27 83 276 5557 or email middelburg@suscawatts.co.za',
        keywords: 'contact Susca Watts Academy, Middelburg campus, Mpumalanga, phone number, email address',
        ogUrl: `${this.baseUrl}/contact`
      },
      '/info': {
        title: 'About Us',
        description: 'Learn about Susca Watts Academy - our mission, values, history, and commitment to quality education. Fully accredited by QCTO, ITEC, ETDP SETA, and other recognized bodies.',
        keywords: 'about Susca Watts Academy, mission, values, accreditation, QCTO, ITEC, ETDP SETA',
        ogUrl: `${this.baseUrl}/info`
      },
      '/accreditation': {
        title: 'Accreditation',
        description: 'Susca Watts Academy is fully accredited by leading educational bodies including QCTO, ITEC, ETDP SETA, Services SETA, and SAAHSP. View our accreditation details.',
        keywords: 'QCTO accreditation, ITEC accreditation, ETDP SETA, Services SETA, SAAHSP, accredited institution',
        ogUrl: `${this.baseUrl}/accreditation`
      },
      '/academics': {
        title: 'Academic Programs',
        description: 'Quality academic programs including academic support, exam preparation, and skills development. Experienced teachers and small class sizes for personalized attention.',
        keywords: 'academic programs, exam preparation, tutoring, academic support, skills development',
        ogUrl: `${this.baseUrl}/academics`
      },
      '/business': {
        title: 'Business Services',
        description: 'Professional business consulting services for training centers and educational institutions. Curriculum development, quality management systems, and business optimization.',
        keywords: 'business consulting, training center consulting, curriculum development, quality management',
        ogUrl: `${this.baseUrl}/business`
      },
      '/consulting': {
        title: 'Consulting Services',
        description: 'Expert consulting services for starting and growing your training center. Curriculum development, accreditation guidance, and quality management systems.',
        keywords: 'training center consulting, education consulting, accreditation consulting, curriculum development',
        ogUrl: `${this.baseUrl}/consulting`
      },
      '/finance': {
        title: 'Payment Options',
        description: 'Flexible payment solutions to make education accessible. Multiple payment methods and financing options available for all our courses.',
        keywords: 'payment options, course fees, financing, student loans, payment plans',
        ogUrl: `${this.baseUrl}/finance`
      },
      '/freelance': {
        title: 'Freelance Marketing',
        description: 'Become a freelance marketer for Susca Watts Academy. Work your own hours, decide your income, and earn commission for every student you refer.',
        keywords: 'freelance marketing, affiliate program, work from home, commission, flexible hours',
        ogUrl: `${this.baseUrl}/freelance`
      },
      '/rpl': {
        title: 'Recognition of Prior Learning (RPL)',
        description: 'Get formal recognition for your existing skills and experience through our RPL assessment process. Convert your experience into qualifications.',
        keywords: 'RPL, Recognition of Prior Learning, skills assessment, experience recognition, qualifications',
        ogUrl: `${this.baseUrl}/rpl`
      }
    };

    return seoData[route] || {
      title: 'Page',
      description: this.baseDescription,
      ogUrl: `${this.baseUrl}${route}`
    };
  }
}
