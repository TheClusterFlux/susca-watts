import { Component, Input } from '@angular/core';
import { ListItem } from '../../models/list-item';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  @Input() item!: ListItem;

  constructor(
    private readonly router: Router,
  ) { }

  navigateToItem() {
    this.router.navigate([this.item.link]);
  }

}
