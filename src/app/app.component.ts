import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LimoBookingComponent } from "./limo-booking/limo-booking.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LimoBookingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nahome-limo';
}
