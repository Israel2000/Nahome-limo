import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { NamhomeHomeComponent } from './namhome-home/namhome-home.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
  { path: 'home', component: NamhomeHomeComponent },  // Home route
  { path: 'contact', component: ContactPageComponent },  // Contact route
  { path: 'about-us', component: AboutUsComponent },  // Contact route

  { path: '**', redirectTo: 'home', pathMatch: 'full' }  // Wildcard redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
