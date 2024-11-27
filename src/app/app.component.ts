import { Component } from '@angular/core';
import {  RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LimoBookingComponent } from "./limo-booking/limo-booking.component";
import { FooterComponent } from "./footer/footer.component";
import { ContactPageComponent } from "./contact-page/contact-page.component";
import { CommonModule } from '@angular/common';
import { NamhomeHomeComponent } from "./namhome-home/namhome-home.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  CommonModule, RouterLink, RouterLinkActive, LimoBookingComponent, FooterComponent, ContactPageComponent, NamhomeHomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'nahome-limo';

  ngOnInit(): void {
    
  }
}
