import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
    currentDateTime!: string;
  
    constructor() {
      this.updateCurrentDateTime(); // Call the method initially
      setInterval(() => {
        this.updateCurrentDateTime(); // Update the time every second
      }, 1000);
    }
  
    updateCurrentDateTime(): void {
      const currentDate = new Date();
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Set to false for 24-hour format
      };
      this.currentDateTime = currentDate.toLocaleString('en-US', options);
    }
  }
  


