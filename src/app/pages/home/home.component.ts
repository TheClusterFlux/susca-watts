import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListItemComponent } from '../../components/list-item/list-item.component';
import { ListItem } from '../../models/list-item';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ListItemComponent, CarouselComponent, TranslateModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private translate: TranslateService) {}

  featuredCategories: ListItem[] = [
    { id: 1, heading: 'COURSES', description: 'Browse our wide range of courses and learning materials.', icon: 'fas fa-book', link: '/courses' },
    { id: 2, heading: 'ACCREDITATION', description: 'Learn about our nationally and internationally recognized accreditations.', icon: 'fas fa-award', link: '/accreditation' },
    { id: 3, heading: 'RPL', description: 'Recognition of Prior Learning - get credit for your experience.', icon: 'fas fa-certificate', link: '/rpl' },
    { id: 4, heading: 'FINANCE', description: 'Explore payment options and financing solutions for your education.', icon: 'fas fa-coins', link: '/finance' }
  ];
  
  quickLinks: ListItem[] = [
    { id: 1, heading: 'CONSULTING', description: 'Expert guidance for starting and growing your training center.', icon: 'fas fa-handshake', link: '/consulting' },
    { id: 2, heading: 'FREELANCE', description: 'Work your own hours and decide your own income with us.', icon: 'fas fa-laptop-house', link: '/freelance' },
    { id: 3, heading: 'INFO', description: 'Learn more about Susca Watts Academy and our mission.', icon: 'fas fa-info-circle', link: '/info' }
  ];

  testimonials = [
    {
      name: "Sarah Johnson",
      role: "Beauty Therapy Graduate",
      quote: "My training at Susca Watts Academy was life-changing. The hands-on experience and professional instructors prepared me perfectly for my career.",
      image: "assets/images/example-image-1.png"
    },
    {
      name: "Michael Ndlovu",
      role: "Business Management Student",
      quote: "The flexibility of their payment options made it possible for me to study while working. Their staff is always supportive and encouraging.",
      image: "assets/images/example-image-2.png"
    },
    {
      name: "Thembi Moyo",
      role: "Salon Owner",
      quote: "Thanks to Susca Watts consulting services, I was able to start my own training center. Their guidance through accreditation was invaluable.",
      image: "assets/images/example-image-3.png"
    }
  ];
}
