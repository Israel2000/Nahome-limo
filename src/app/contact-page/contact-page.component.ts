import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FooterComponent, ReactiveFormsModule, JsonPipe], // Import HttpClientModule here
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css'] // Corrected typo here
})
export class ContactPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form inside the constructor
    this.form = this.fb.group({
      from_name: '',
      to_name: 'admin',
      from_email: '',
      from_message: ''
    });
  }

  async send() {
    emailjs.init('6By1enMFeieSwMnOW');
    let response = await emailjs.send("service_2351vj5", "template_qrwqide", {
      from_name: this.form.value.from_name,
      to_name: this.form.value.to_name,
      from_email: this.form.value.from_email,
      message: this.form.value.from_message,
    });

    alert('Message has been sent.');
    this.form.reset()
  }
}
