import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() images: string[] = [];
  @Input() visibleImages: number = 3;

  currentIndex: number = 0;

  prev(): void {
    this.currentIndex = Math.max(this.currentIndex - this.visibleImages, 0);
  }

  next(): void {
    this.currentIndex = Math.min(
      this.currentIndex + this.visibleImages,
      this.images.length - this.visibleImages
    );
  }
}
