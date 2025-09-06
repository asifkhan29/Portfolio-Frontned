import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dotted',
  imports: [CommonModule],
  templateUrl: './dotted.component.html',
  styleUrl: './dotted.component.css'
})
export class DottedComponent {
    @Input() dotColor: string = '#22c55e';
  @Input() dotSize: number = 20;
  @Input() opacity: number = 0.2;


}
