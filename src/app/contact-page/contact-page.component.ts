import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, HttpClientModule], // Import HttpClientModule here
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'] // Corrected typo here
})
export class ContactPageComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.http.post('/api/send-email', this.contactForm.value)
        .subscribe({
          next: (res) => console.log('Email sent successfully', res),
          error: (err) => console.error('Error sending email', err),
        });
    }
  }
}
