import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Bubble {
  id: number;
  size: number;
  left: number;
  top: number;       // added top position
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-bubble',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css']  // fixed typo from styleUrl
})
export class BubbleComponent {
  bubbles: Bubble[] = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    top: Math.random() * 100, // random vertical position
    delay: Math.random() * 20,
    duration: Math.random() * 10 + 15,
  }));
}
