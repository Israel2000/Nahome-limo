import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LimoBookingComponent } from "./limo-booking/limo-booking.component";
import { NavsComponent } from "./navs/navs.component";
import { FooterComponent } from "./footer/footer.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LimoBookingComponent, NavsComponent, FooterComponent, ContactPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'nahome-limo';
}
