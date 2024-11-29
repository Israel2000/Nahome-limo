import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';

declare const paypal: any;
@Component({
  selector: 'app-limo-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './limo-booking.component.html',
  styleUrls: ['./limo-booking.component.css']
})
export class LimoBookingComponent {
vehicleType: any;
passengerCount: any;

  ngOnInit(): void {
    // Get the current date in YYYY-MM-DD format (for the date input)
    const today = new Date();
    this.currentDate = today.toISOString().split('T')[0];  // Format as YYYY-MM-DD

    // Get the current time in HH:MM format (for the time input)
    const hours = today.getHours().toString().padStart(2, '0');
    const minutes = today.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;  // Format as HH:MM
  }

  passengerPhone: string = '';
  phoneNumberValid: boolean = true;
  emailValid: boolean = true;
  isRoundTrip: boolean = false;

  // passengerPhone: string = '';
  passengerEmail: string = '';
  pickupDate: string = '';
  pickupTime: string = '';

  currentDate: string = '';
  currentTime: string = '';

  pickupLocation: string = '';
  dropoffLocation: string = '';
  passengerName: string = '';
  // passengerPhone: string = '';
  // passengerEmail: string = '';
  // pickupDate: string = '';
  // pickupTime: string = '';
  price: number | string = 'Please select Pickup ,Drop location and Vehicle type to get the price';
  locationOption: string = ''; // 'west' or 'east'
  isDIASelected: boolean = false;
  city: string = '';  // This will hold the extracted city
  state: string = ''; // We are not using state here

  exactPickupAddress = '';
  exactDropOffAddress = '';

  onDIASelectionChange(): void {
    if (this.isDIASelected) {
      this.pickupLocation = '1';
    } else {
      this.pickupLocation = '';
    }
  }

  calculatePrice(): void {
    console.log(this.pickupLocation, this.dropoffLocation);
    if(!this.pickupLocation || !this.dropoffLocation || !this.vehicleType){
      this.price = 'Please select Pickup ,Drop location and Vehicle type to get the price';
    }
    this.price = this.getPrice(this.pickupLocation,this.dropoffLocation, this.vehicleType);
  }

  getPrice(pickup: string, dropOff: string, vehicleType: string): number | string {
    if(!pickup) {
      return `Please select Pickup Location to get the price`;
    } else if (!dropOff) {
      return `Please select DropOff Location to get the price`;
    }
    const priceMap: any = {
      'den-denverdowntown': { sedan: 100, suv: 125 },
      'den-denver': { sedan: 100, suv: 125 },
      'den-littleton': { sedan: 125, suv: 150 },
      'den-lakewood': { sedan: 125, suv: 150 },
      'den-boulder': { sedan: 135, toll: 15, suv: 165 },
      'den-castlerock': { sedan: 155, toll: 15, suv: 195 },
      'den-arvada': { sedan: 125, suv: 150 },
      'den-broomfield': { sedan: 135, toll: 15, suv: 155 },
      'den-coloradosprings': { sedan: 225, toll: 15, suv: 275 }
    }

    const key1 = pickup.toLowerCase().split(' ').join('') + '-' + dropOff.toLowerCase().split(' ').join('');
    const key2 = dropOff.toLowerCase().split(' ').join('') + '-' + pickup.toLowerCase().split(' ').join('');

    if (priceMap[key1] || priceMap[key2]) {
      let price = 0;
      if (!vehicleType) {
        return `Please select Vehicle type to get the price`;
      }

      if (priceMap[key1]) {
        const shouldAddToll = priceMap[key1].toll;

        if (shouldAddToll) {
          price = priceMap[key1][vehicleType] + priceMap[key1].toll;
        } else {
          price = priceMap[key1][vehicleType]
        }

      } else {
        const shouldAddToll = priceMap[key2].toll;
        if (shouldAddToll) {
          price = priceMap[key2][vehicleType] + priceMap[key2].toll;
        } else {
          price = priceMap[key2][vehicleType]
        }
      }

      if(this.isRoundTrip){
        return price*2
      }else{
        return price
      }
    } else {
        return `Route from '${pickup}' to '${dropOff}' not found.`;
      }
  }

  // Helper function to normalize route keys
  normalizeRoute(location1: string, location2: string) {
    // Sort the two locations alphabetically to ensure consistency
    const sortedLocations = [location1, location2].sort();
    return `${sortedLocations[0]} to ${sortedLocations[1]}`;
  }

  // This function extracts only the city from the dropoff location
  extractCity(): void {
    if (this.dropoffLocation) {
      const locationParts = this.dropoffLocation.split(',');
      if (locationParts.length > 0) {
        this.city = locationParts[0].trim();  // First part is city
        this.state = locationParts.length > 1 ? locationParts[1].trim() : ''; // State part (not used here)
      } else {
        this.city = '';  // Reset if no valid city
      }
    }
  }

  // Method to validate phone number
  validatePhoneNumber(): void {
    // Check if the input contains any letters
    const containsLetters = /[a-zA-Z]/.test(this.passengerPhone);
    // Set phoneNumberValid to false if the input contains letters or is empty
    this.phoneNumberValid = !containsLetters;
  }

  // Method to validate email
  validateEmail(): void {
    // Basic regex for email validation (you can adjust this for more strict validation if needed)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // If the email doesn't match the pattern, set emailValid to false
    this.emailValid = emailPattern.test(this.passengerEmail);
  }

// DIA to Denver-Downtown Sedan $100 & SUV $125 / no Toll fees
// DIA to Anywhere Denver Sedan $100 & SUV $125 / no Toll fees
// DIA to Littleton, CO Sedan $125 & SUV  $150 / no Toll fees
// DIA to Lakewood, CO Sedan $125 & SUV $150 / no Toll fees
// DIA to Arvada, CO Sedan $125 SUV $150 / no Toll fees
// DIA to Boulder, CO Sedan $135 plus Toll & SUV $165 plus Toll $15
// DIA to Castlerock, CO Sedan $155 plus Toll $15 & SUV $195 Plus Toll $15
// DIA to BROOMFIELD, CO Sedan $135 plus Tall $15 & SUV $155 plus toll $15
// DIA to Colorado Springs, CO Sedan $225 plus toll $15 & SUV $275 plus toll $15

}

