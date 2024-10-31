import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { LimoBookingComponent } from "../limo-booking/limo-booking.component";
import { NavsComponent } from "../navs/navs.component";

@Component({
  selector: 'app-namhome-home',
  standalone: true,
  imports: [FooterComponent, LimoBookingComponent, NavsComponent],
  templateUrl: './namhome-home.component.html',
  styleUrl: './namhome-home.component.css'
})
export class NamhomeHomeComponent {

}
