import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Portfolio } from '../../models/portfolio.model';

@Component({
  selector: 'app-portfolio-card',
    standalone: false,
  templateUrl: './portfolio-card.component.html',
  styleUrls: ['./portfolio-card.component.css']
})
export class PortfolioCardComponent {
  @Input() portfolio!: Portfolio;
  @Output() open = new EventEmitter<void>();
}
