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
  
    try {
      // Show the overlay message
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '50%';
      overlay.style.left = '50%';
      overlay.style.transform = 'translate(-50%, -50%)';
      overlay.style.backgroundColor = '#00000088'; // Semi-transparent black
      overlay.style.color = 'white';
      overlay.style.padding = '20px';
      overlay.style.borderRadius = '10px';
      overlay.style.zIndex = '1000';
      overlay.innerHTML = 'Sending message...';
      document.body.appendChild(overlay);
  
      // Send the email
      let response = await emailjs.send("service_2351vj5", "template_qrwqide", {
        from_name: this.form.value.from_name,
        to_name: this.form.value.to_name,
        from_email: this.form.value.from_email,
        message: this.form.value.from_message,
      });
  
      // Update the overlay message
      overlay.innerHTML = 'Message has been sent!';
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
  
      // Remove the overlay
      document.body.removeChild(overlay);
  
      // Reset the form
      this.form.reset();
    } catch (error) {
      alert('Failed to send the message. Please try again.');
    }
  }
  
}
