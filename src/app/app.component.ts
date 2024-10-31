import { Component } from '@angular/core';
import { provideRouter, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LimoBookingComponent } from "./limo-booking/limo-booking.component";
import { NavsComponent } from "./navs/navs.component";
import { FooterComponent } from "./footer/footer.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";
import { CommonModule } from '@angular/common';
import { NamhomeHomeComponent } from "./namhome-home/namhome-home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, LimoBookingComponent, NavsComponent, FooterComponent, ContactPageComponent, NamhomeHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'nahome-limo';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
}
