import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-limo-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './limo-booking.component.html',
  styleUrl: './limo-booking.component.css'
})
export class LimoBookingComponent {
  isVisible = false;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
