import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import { SEOService } from './services/seo.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,  TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Susca Watts Academy';

  constructor(
    private readonly translate: TranslateService,
    private readonly router: Router,
    private readonly seoService: SEOService
  ) {
    // Only English is available
    this.translate.addLangs(['en']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  ngOnInit(): void {
    // Update SEO on route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const seoData = this.seoService.getPageSEO(event.urlAfterRedirects);
        this.seoService.updateSEO(seoData);
      });

    // Set initial SEO data
    const initialSeoData = this.seoService.getPageSEO(this.router.url);
    this.seoService.updateSEO(initialSeoData);
  }
}
