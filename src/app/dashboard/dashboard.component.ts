import { Component,AfterViewInit, OnInit, Renderer2} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit{
  sentMessages: { templateId: string, recipientNumber: string }[] = [];


  currentDateTime!: string;
  
    constructor(private service:MessageService,private route: ActivatedRoute,private renderer: Renderer2) {
      this.updateCurrentDateTime(); // Call the method initially
      setInterval(() => {
        this.updateCurrentDateTime(); // Update the time every second
      }, 1000);
    }
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      if (params['sentMessages']) {
        this.sentMessages = JSON.parse(params['sentMessages']);
        // Now you have access to the sentMessages array in your dashboard component
        // You can further process and display the report as needed
      }
    });
  


    this.loadcount();
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
    isDropdownOpen: boolean = false;

    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    }

    isDropdownOpen1: boolean = false;

    toggleDropdown1() {
      this.isDropdownOpen1 = !this.isDropdownOpen1;
    }
  // CurrentDate=new Date();

  // constructor(){
  //   setInterval(()=>
  //   {
  //     this.CurrentDate=new Date()
  //   },1000)
  // }
 UserName=['demotr']
 count=0;
  loadcount(){
    // this.UserName=this.service.userName
    this.service.getBalance(this.UserName).subscribe({
      next:((res:any)=>{
        this.count=res.SMSBalance
      })
    })
  }
  isDarkMode: boolean = false;

  toggleMode(): void {
    this.isDarkMode = !this.isDarkMode;
    console.log('Dark mode toggled:', this.isDarkMode);
  }
 
  

}



