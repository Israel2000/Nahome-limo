import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component'; // Ensure this path is correct
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'contact', component: ContactPageComponent },
  { path: '', component: AppComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
