import { Component, ElementRef, HostListener, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('menuToggle') menuToggle!: ElementRef;
  @ViewChild('navLinks') navLinks!: ElementRef;
  
  isMenuOpen = false;
  activeDropdown: string | null = null;
  constructor(
    private translate: TranslateService,
    private renderer: Renderer2,
    private router: Router
  ) {
    // Force English language and disable language switching
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    
    // Add click event listener to the document to close dropdowns when clicking outside
    this.renderer.listen('document', 'click', (event: Event) => {
      if (this.activeDropdown && !this.isClickInsideDropdown(event)) {
        this.closeDropdown(this.activeDropdown);
      }
    });
  }
  
  ngAfterViewInit(): void {
    // Listen for route changes to close dropdown menus when navigating
    this.router.events.subscribe(() => {
      if (this.activeDropdown) {
        this.closeDropdown(this.activeDropdown);
      }
    });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.renderer.setAttribute(this.menuToggle.nativeElement, 'aria-expanded', 
      this.isMenuOpen ? 'true' : 'false');
    
    if (this.isMenuOpen) {
      this.renderer.addClass(this.navLinks.nativeElement, 'show');
    } else {
      this.renderer.removeClass(this.navLinks.nativeElement, 'show');
      // Close any open dropdown when the main menu is closed
      if (this.activeDropdown) {
        this.closeDropdown(this.activeDropdown);
      }
    }
  }
  
  toggleDropdown(event: Event, dropdownId: string): void {
    event.stopPropagation();
    
    // Close the previously open dropdown if it's not the current one
    if (this.activeDropdown && this.activeDropdown !== dropdownId) {
      this.closeDropdown(this.activeDropdown);
    }
    
    // Toggle the current dropdown
    const dropdownElement = document.getElementById(dropdownId);
    if (!dropdownElement) return;
    
    if (this.activeDropdown === dropdownId) {
      this.closeDropdown(dropdownId);
    } else {
      this.openDropdown(dropdownId);
    }
  }
  
  openDropdown(dropdownId: string): void {
    const dropdownElement = document.getElementById(dropdownId);
    if (!dropdownElement) return;
    
    this.renderer.addClass(dropdownElement, 'active');
    
    // Set aria-expanded attribute on the toggle button
    const toggleButton = dropdownElement.previousElementSibling;
    if (toggleButton && toggleButton.classList.contains('dropdown-toggle')) {
      this.renderer.setAttribute(toggleButton, 'aria-expanded', 'true');
    }
    
    this.activeDropdown = dropdownId;
  }
  
  closeDropdown(dropdownId: string): void {
    const dropdownElement = document.getElementById(dropdownId);
    if (!dropdownElement) return;
    
    this.renderer.removeClass(dropdownElement, 'active');
    
    // Set aria-expanded attribute on the toggle button
    const toggleButton = dropdownElement.previousElementSibling;
    if (toggleButton && toggleButton.classList.contains('dropdown-toggle')) {
      this.renderer.setAttribute(toggleButton, 'aria-expanded', 'false');
    }
    
    if (this.activeDropdown === dropdownId) {
      this.activeDropdown = null;
    }
  }
  
  isClickInsideDropdown(event: Event): boolean {
    // Check if the click is inside any dropdown menu or toggle
    const clickedElement = event.target as HTMLElement;
    const isDropdownToggle = clickedElement.classList.contains('dropdown-toggle');
    const isInsideDropdownMenu = clickedElement.closest('.dropdown-menu') !== null;
    const isDropdownIcon = clickedElement.classList.contains('dropdown-icon');
    
    return isDropdownToggle || isInsideDropdownMenu || isDropdownIcon;
  }  useLanguage(language: string): void {
    // Language switching disabled - always use English
    console.log('Language switching has been disabled');
  }
}