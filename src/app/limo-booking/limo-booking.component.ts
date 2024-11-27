import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/compat/database';

declare const paypal: any;
@Component({
  selector: 'app-limo-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './limo-booking.component.html',
  styleUrls: ['./limo-booking.component.css']
})
export class LimoBookingComponent {
  vehicleType: string = '';
  price: number = 0;
  toll: number = 15;
  totalPrice: number = 0;
  dropoffLocation: string = '';
  pickupLocation: string = '';
  showPaypalButton = false;
  showPopup = false;
  email: string = '';
  paymentId: string = '';
  payerId: string = '';
  passengerName: string = '';
  asap: boolean = false
  dateOfService: string = "";
  message: string = "";
  phone: string = "";
  pickupTime: string = "";
  roundTrip: boolean = false;
  showStopInput: boolean = false;
  address: string = "";
  firstDate: string | null = null;
  lastDate: string | null = null;
  stops: string[] = [];
  filteredLocations: string[] = [];
  filteredPickupLocations: string[] = [];

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  ngOnInit(): void { }

  // Pickup Location AutoComplete Start
  PickUplocations: string[] = [
    '8500 Peña Blvd, Denver, CO 80249, USA DEN West Side Rideshare Pickup (Uber/Lyft)',
    '9020 Peña Blvd, Denver, CO 80249, USA DEN East Side Rideshare Pickup (Uber/Lyft)',
    '9100 Peña Blvd, Denver, CO 80249, USA Economy Parking Lot Pickup',
    '6900 Peña Blvd, Denver, CO 80249, USA 61st & Peña RTD Rail Station (Public Transport Connection)',
    '9500 E 40th Ave, Denver, CO 80239, USA Rental Car Center Pickup',
    '24530 E 78th Ave, Denver, CO 80249, USA Pikes Peak Shuttle Lot (Off-site Parking Pickup)',
    '24300 E 75th Ave, Denver, CO 80249, USA Westin Denver International Airport Hotel Pickup',
    '8300 Peña Blvd, Denver, CO 80249, USA'
  ];

  filterPickupLocations() {
    const input = this.pickupLocation.toLowerCase();
    this.filteredPickupLocations = this.PickUplocations.filter(PickUplocations =>
      PickUplocations.toLowerCase().includes(input)
    );
  }
  selectPickupLocation(picklocation: string) {
    this.pickupLocation = picklocation;
    this.filteredPickupLocations = []; 
  }
  // Pickup Location AutoComplete End

  // Drop-Off Location AutoComplete Start
  locations: string[] = [
    'Denver Downtown',
    'Littleton',
    'Lakewood',
    'Boulder',
    'Castlerock',
    'Arvada',
    'BROOMFIELD',
    'Colorado Springs'
  ];

  filterLocations() {
    const input = this.dropoffLocation.toLowerCase();
    this.filteredLocations = this.locations.filter(location =>
      location.toLowerCase().includes(input)
    );
  }
  selectLocation(location: string) {
    this.dropoffLocation = location;
    this.filteredLocations = [];
  }
  // DropOff Location AutoComplete End 

  // Add a new stop to the array
  addStop(): void {
    this.stops.push('');
  }

  // Remove a specific stop from the array
  removeStop(index: number): void {
    this.stops.splice(index, 1);
  }

  // Track By Function for *ngFor
  trackByIndex(index: number): number {
    return index;
  }

  // Calculate Price functionality
  calculatePrice() {
    const pickupLocation = (
      <HTMLInputElement>document.getElementById('pickupLocation')
    ).value;
    const dropoffLocation = (
      <HTMLInputElement>document.getElementById('dropoffLocation')
    ).value;

    if (pickupLocation === '8500 Peña Blvd, Denver, CO 80249, USA DEN West Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Denver Downtown') {
      this.price = this.vehicleType === 'Sedan' ? 100 : 125;
      this.totalPrice = this.price;
    } else if (pickupLocation === '8500 Peña Blvd, Denver, CO 80249, USA DEN West Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Littleton') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '8500 Peña Blvd, Denver, CO 80249, USA DEN West Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Lakewood') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '8500 Peña Blvd, Denver, CO 80249, USA DEN West Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Boulder') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 165;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '8500 Peña Blvd, Denver, CO 80249, USA DEN West Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Castlerock') {
      this.price = this.vehicleType === 'Sedan' ? 155 : 195;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '8500 Peña Blvd, Denver, CO 80249, USA DEN West Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Arvada') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '8500 Peña Blvd, Denver, CO 80249, USA DEN West Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'BROOMFIELD') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 155;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '8500 Peña Blvd, Denver, CO 80249, USA DEN West Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Colorado Springs') {
      this.price = this.vehicleType === 'Sedan' ? 225 : 275;
      this.totalPrice = this.price + this.toll;
    } else {
      this.price = 0;
    }

    if (pickupLocation === '9020 Peña Blvd, Denver, CO 80249, USA DEN East Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Denver Downtown') {
      this.price = this.vehicleType === 'Sedan' ? 100 : 125;
      this.totalPrice = this.price;
    } else if (pickupLocation === '9020 Peña Blvd, Denver, CO 80249, USA DEN East Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Littleton') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '9020 Peña Blvd, Denver, CO 80249, USA DEN East Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Lakewood') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '9020 Peña Blvd, Denver, CO 80249, USA DEN East Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Boulder') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 165;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9020 Peña Blvd, Denver, CO 80249, USA DEN East Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Castlerock') {
      this.price = this.vehicleType === 'Sedan' ? 155 : 195;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9020 Peña Blvd, Denver, CO 80249, USA DEN East Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Arvada') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9020 Peña Blvd, Denver, CO 80249, USA DEN East Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'BROOMFIELD') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 155;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9020 Peña Blvd, Denver, CO 80249, USA DEN East Side Rideshare Pickup (Uber/Lyft)' && dropoffLocation === 'Colorado Springs') {
      this.price = this.vehicleType === 'Sedan' ? 225 : 275;
      this.totalPrice = this.price + this.toll;
    }

    if (pickupLocation === '9100 Peña Blvd, Denver, CO 80249, USA Economy Parking Lot Pickup' && dropoffLocation === 'Denver Downtown') {
      this.price = this.vehicleType === 'Sedan' ? 100 : 125;
      this.totalPrice = this.price;
    } else if (pickupLocation === '9100 Peña Blvd, Denver, CO 80249, USA Economy Parking Lot Pickup' && dropoffLocation === 'Littleton') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '9100 Peña Blvd, Denver, CO 80249, USA Economy Parking Lot Pickup' && dropoffLocation === 'Lakewood') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '9100 Peña Blvd, Denver, CO 80249, USA Economy Parking Lot Pickup' && dropoffLocation === 'Boulder') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 165;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9100 Peña Blvd, Denver, CO 80249, USA Economy Parking Lot Pickup' && dropoffLocation === 'Castlerock') {
      this.price = this.vehicleType === 'Sedan' ? 155 : 195;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9100 Peña Blvd, Denver, CO 80249, USA Economy Parking Lot Pickup' && dropoffLocation === 'Arvada') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9100 Peña Blvd, Denver, CO 80249, USA Economy Parking Lot Pickup' && dropoffLocation === 'BROOMFIELD') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 155;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9100 Peña Blvd, Denver, CO 80249, USA Economy Parking Lot Pickup' && dropoffLocation === 'Colorado Springs') {
      this.price = this.vehicleType === 'Sedan' ? 225 : 275;
      this.totalPrice = this.price + this.toll;
    }

    if (pickupLocation === '6900 Peña Blvd, Denver, CO 80249, USA 61st & Peña RTD Rail Station (Public Transport Connection)' && dropoffLocation === 'Denver Downtown') {
      this.price = this.vehicleType === 'Sedan' ? 100 : 125;
      this.totalPrice = this.price;
    } else if (pickupLocation === '6900 Peña Blvd, Denver, CO 80249, USA 61st & Peña RTD Rail Station (Public Transport Connection)' && dropoffLocation === 'Littleton') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '6900 Peña Blvd, Denver, CO 80249, USA 61st & Peña RTD Rail Station (Public Transport Connection)' && dropoffLocation === 'Lakewood') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '6900 Peña Blvd, Denver, CO 80249, USA 61st & Peña RTD Rail Station (Public Transport Connection)' && dropoffLocation === 'Boulder') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 165;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '6900 Peña Blvd, Denver, CO 80249, USA 61st & Peña RTD Rail Station (Public Transport Connection)' && dropoffLocation === 'Castlerock') {
      this.price = this.vehicleType === 'Sedan' ? 155 : 195;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '6900 Peña Blvd, Denver, CO 80249, USA 61st & Peña RTD Rail Station (Public Transport Connection)' && dropoffLocation === 'Arvada') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '6900 Peña Blvd, Denver, CO 80249, USA 61st & Peña RTD Rail Station (Public Transport Connection)' && dropoffLocation === 'BROOMFIELD') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 155;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '6900 Peña Blvd, Denver, CO 80249, USA 61st & Peña RTD Rail Station (Public Transport Connection)' && dropoffLocation === 'Colorado Springs') {
      this.price = this.vehicleType === 'Sedan' ? 225 : 275;
      this.totalPrice = this.price + this.toll;
    }

    if (pickupLocation === '9500 E 40th Ave, Denver, CO 80239, USA Rental Car Center Pickup' && dropoffLocation === 'Denver Downtown') {
      this.price = this.vehicleType === 'Sedan' ? 100 : 125;
      this.totalPrice = this.price;
    } else if (pickupLocation === '9500 E 40th Ave, Denver, CO 80239, USA Rental Car Center Pickup' && dropoffLocation === 'Littleton') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '9500 E 40th Ave, Denver, CO 80239, USA Rental Car Center Pickup' && dropoffLocation === 'Lakewood') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '9500 E 40th Ave, Denver, CO 80239, USA Rental Car Center Pickup' && dropoffLocation === 'Boulder') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 165;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9500 E 40th Ave, Denver, CO 80239, USA Rental Car Center Pickup' && dropoffLocation === 'Castlerock') {
      this.price = this.vehicleType === 'Sedan' ? 155 : 195;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9500 E 40th Ave, Denver, CO 80239, USA Rental Car Center Pickup' && dropoffLocation === 'Arvada') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9500 E 40th Ave, Denver, CO 80239, USA Rental Car Center Pickup' && dropoffLocation === 'BROOMFIELD') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 155;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '9500 E 40th Ave, Denver, CO 80239, USA Rental Car Center Pickup' && dropoffLocation === 'Colorado Springs') {
      this.price = this.vehicleType === 'Sedan' ? 225 : 275;
      this.totalPrice = this.price + this.toll;
    }

    if (pickupLocation === '24530 E 78th Ave, Denver, CO 80249, USA Pikes Peak Shuttle Lot (Off-site Parking Pickup)' && dropoffLocation === 'Denver Downtown') {
      this.price = this.vehicleType === 'Sedan' ? 100 : 125;
      this.totalPrice = this.price;
    } else if (pickupLocation === '24530 E 78th Ave, Denver, CO 80249, USA Pikes Peak Shuttle Lot (Off-site Parking Pickup)' && dropoffLocation === 'Littleton') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '24530 E 78th Ave, Denver, CO 80249, USA Pikes Peak Shuttle Lot (Off-site Parking Pickup)' && dropoffLocation === 'Lakewood') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '24530 E 78th Ave, Denver, CO 80249, USA Pikes Peak Shuttle Lot (Off-site Parking Pickup)' && dropoffLocation === 'Boulder') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 165;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '24530 E 78th Ave, Denver, CO 80249, USA Pikes Peak Shuttle Lot (Off-site Parking Pickup)' && dropoffLocation === 'Castlerock') {
      this.price = this.vehicleType === 'Sedan' ? 155 : 195;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '24530 E 78th Ave, Denver, CO 80249, USA Pikes Peak Shuttle Lot (Off-site Parking Pickup)' && dropoffLocation === 'Arvada') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '24530 E 78th Ave, Denver, CO 80249, USA Pikes Peak Shuttle Lot (Off-site Parking Pickup)' && dropoffLocation === 'BROOMFIELD') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 155;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '24530 E 78th Ave, Denver, CO 80249, USA Pikes Peak Shuttle Lot (Off-site Parking Pickup)' && dropoffLocation === 'Colorado Springs') {
      this.price = this.vehicleType === 'Sedan' ? 225 : 275;
      this.totalPrice = this.price + this.toll;
    }

    if (pickupLocation === '24300 E 75th Ave, Denver, CO 80249, USA Westin Denver International Airport Hotel Pickup' && dropoffLocation === 'Denver Downtown') {
      this.price = this.vehicleType === 'Sedan' ? 100 : 125;
      this.totalPrice = this.price;
    } else if (pickupLocation === '24300 E 75th Ave, Denver, CO 80249, USA Westin Denver International Airport Hotel Pickup' && dropoffLocation === 'Littleton') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '24300 E 75th Ave, Denver, CO 80249, USA Westin Denver International Airport Hotel Pickup' && dropoffLocation === 'Lakewood') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '24300 E 75th Ave, Denver, CO 80249, USA Westin Denver International Airport Hotel Pickup' && dropoffLocation === 'Boulder') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 165;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '24300 E 75th Ave, Denver, CO 80249, USA Westin Denver International Airport Hotel Pickup' && dropoffLocation === 'Castlerock') {
      this.price = this.vehicleType === 'Sedan' ? 155 : 195;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '24300 E 75th Ave, Denver, CO 80249, USA Westin Denver International Airport Hotel Pickup' && dropoffLocation === 'Arvada') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '24300 E 75th Ave, Denver, CO 80249, USA Westin Denver International Airport Hotel Pickup' && dropoffLocation === 'BROOMFIELD') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 155;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '24300 E 75th Ave, Denver, CO 80249, USA Westin Denver International Airport Hotel Pickup' && dropoffLocation === 'Colorado Springs') {
      this.price = this.vehicleType === 'Sedan' ? 225 : 275;
      this.totalPrice = this.price + this.toll;
    }

    if (pickupLocation === '8300 Peña Blvd, Denver, CO 80249, USA' && dropoffLocation === 'Denver Downtown') {
      this.price = this.vehicleType === 'Sedan' ? 100 : 125;
      this.totalPrice = this.price;
    } else if (pickupLocation === '8300 Peña Blvd, Denver, CO 80249, USA' && dropoffLocation === 'Littleton') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '8300 Peña Blvd, Denver, CO 80249, USA' && dropoffLocation === 'Lakewood') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price;
    } else if (pickupLocation === '8300 Peña Blvd, Denver, CO 80249, USA' && dropoffLocation === 'Boulder') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 165;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '8300 Peña Blvd, Denver, CO 80249, USA' && dropoffLocation === 'Castlerock') {
      this.price = this.vehicleType === 'Sedan' ? 155 : 195;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '8300 Peña Blvd, Denver, CO 80249, USA' && dropoffLocation === 'Arvada') {
      this.price = this.vehicleType === 'Sedan' ? 125 : 150;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '8300 Peña Blvd, Denver, CO 80249, USA' && dropoffLocation === 'BROOMFIELD') {
      this.price = this.vehicleType === 'Sedan' ? 135 : 155;
      this.totalPrice = this.price + this.toll;
    } else if (pickupLocation === '8300 Peña Blvd, Denver, CO 80249, USA' && dropoffLocation === 'Colorado Springs') {
      this.price = this.vehicleType === 'Sedan' ? 225 : 275;
      this.totalPrice = this.price + this.toll;
    }

    if (this.totalPrice === 0) {
      this.totalPrice = this.price;
    }
  }

  onSubmit(form: any): void {
    if (form.invalid) return
    this.showPaypalButton = true;
    this.initializePayPalButton();
  }

  initializePayPalButton(): void {
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=ARAP6tl30lFVmkYbFejTwExJHmRWve16JJTAFBfUwBkMSNJwO8N9GCHcxpU6OzcVxqtrCJtOJdkCwz4K&currency=USD&disable-funding=paylater';
    script.onload = () => this.renderPayPalButton();
    document.body.appendChild(script);
  }

  renderPayPalButton(): void {
    paypal.Buttons({
      style: {
        color: "blue",
        layout: 'horizontal',
        height: 40
      },
      createOrder: (data: any, actions: { order: { create: (arg0: { purchase_units: { amount: { value: string; }; }[]; }) => any; }; }) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.totalPrice.toString()
            }
          }]
        });
      },
      onApprove: (data: { orderID: string; payerID: string; }, actions: any) => {
        this.paymentId = data.orderID;
        this.payerId = data.payerID;
        this.showPopup = true;
      }
    }).render('#paypal-button-container');
  }

  handleOkClick(): void {
    this.showPopup = false;
    this.sendConfirmationEmail();
    this.showPaypalButton = false;
    const smsApiUrl = 'https://app-roqonysr5a-uc.a.run.app/send-sms'; // Backend API URL
    const headers = { 'Content-Type': 'application/json' };
    const to = "+16197237975"
    const message = `Israel you recive a new Booking from ${this.pickupLocation} to ${this.dropoffLocation} and 
    the name of the passenger is ${this.passengerName} this is his/her contact information ${this.phone} , ${this.email} Thankyou. `
    const smsPayload = { to, message }; 
    
    this.http.post(smsApiUrl, smsPayload, { headers }).subscribe(
      (response) => {
        console.log('SMS sent successfully:', response);
      },
      (error) => {
        console.error('Error sending SMS:', error);
      }
    );

    const bookingData = {
      vehicleType: this.vehicleType,
      price: this.price,
      toll: this.toll,
      totalPrice: this.totalPrice,
      dropoffLocation: this.dropoffLocation,
      pickupLocation: this.pickupLocation,
      email: this.email,
      paymentId: this.paymentId,
      payerId: this.payerId,
      passengerName: this.passengerName,
      asap: this.asap,
      dateOfService: this.dateOfService,
      message: this.message,
      phone: this.phone,
      pickupTime: this.pickupTime,
      roundTrip: this.roundTrip,
      stops: this.stops,
      address: this.address,
      firstDate: this.firstDate,
      lastDate: this.lastDate,
    }

    // Push data to Firebase database
    this.db
      .list('bookings')
      .push(bookingData)
      .then(() => this.resetBookingData())
      .catch((error) => console.error('Error saving booking:', error));

  }
  resetBookingData(): void {
    this.vehicleType = '';
    this.price = 0;
    this.toll = 15;
    this.totalPrice = 0;
    this.dropoffLocation = '';
    this.pickupLocation = '';
    this.email = '';
    this.paymentId = '';
    this.payerId = '';
    this.passengerName = '';
    this.asap = false;
    this.dateOfService = '';
    this.message = '';
    this.phone = '';
    this.pickupTime = '';
    this.roundTrip = false;
    this.stops = [];
    this.address = " "
    this.firstDate = "",
    this.lastDate = ""
  }

  sendConfirmationEmail(): void {
    this.http.post('https://app-roqonysr5a-uc.a.run.app/send-confirmation-email', {
      email: this.email,
      paymentId: this.paymentId,
      payerId: this.payerId,
      pickupLocation: this.pickupLocation,
      dropoffLocation: this.dropoffLocation,
      passengerName: this.passengerName,
      asap: this.asap,
      dateOfService: this.dateOfService,
      message: this.message,
      phone: this.phone,
      pickupTime: this.pickupTime,
      roundTrip: this.roundTrip,
      vehicleType: this.vehicleType,
      totalPrice: this.totalPrice,
      stops: this.stops, 
      address: this.address,
      firstDate: this.firstDate,
      lastDate: this.lastDate,

    }).subscribe({
      next: (response) => console.log('Email sent:', response),
      error: (error) => console.error('Error sending email:', error)
    });
  }

}

