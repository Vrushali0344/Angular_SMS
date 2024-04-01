import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../message.service';
import { FormBuilder, FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit{

  invalidNumbers=0;
  phoneNumbers: string[] = [];

  // Initialize form group
  formGroup = new FormGroup({
    mob: new FormControl('')
  });
 messageCount: number = 0;


 
clearPhoneNumbersList() {
    const mobControl = this.smsform.get('mob');
    if (mobControl) {
      mobControl.setValue('');
    }
    // Reset the total count of phone numbers
    this.totalCountOfPhoneNumbers = 0;
}

getInvalidNumbers(): string[] {
  const textareaValue = this.smsform.get('mob')?.value; // Get the value of the textarea form control
  const phoneNumbers = textareaValue.split(',').map((number: string) => number.trim()); // Split the textarea value by comma and trim each number
  
  // Filter out the invalid phone numbers (assuming invalid phone numbers are those not of length 10)
  const invalidNumbers = phoneNumbers.filter((number: string) => number.length !== 10);

  return invalidNumbers;
}

totalCountOfPhoneNumbers: number = 0;
invalidNumbersCount: number = 0;
creditCharge: number = 0;

countNumbers(messageCount: number): void {
  const enteredNumbers = this.smsform.get('mob')?.value?.split(',') ?? [];
  this.totalCountOfPhoneNumbers = enteredNumbers.length;
  this.invalidNumbersCount = this.getInvalidNumbers().length;

  // Calculate credit charge based on message count and total number of phone numbers
}

calculateCharge(messageCount: number): void {
  // Calculate credit charge based on message count and total number of phone numbers
  this.creditCharge = messageCount * this.totalCountOfPhoneNumbers;
}

  

videoUrl: string | ArrayBuffer | null = null;



handleVideoUpload(event: any): void {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.videoUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }
}




  
  smsform!:FormGroup;
  display:any;
  data:any;
  characterCount: number = 0;
  mob: string[] = [];

  // Function to update character count
  // changeValue(event: any) {
  //   const text = event.target.value;
  //   this.characterCount = text.length;
  // }
  changeValue(event: any) {
    // Get the input value directly from the event
    const text = event.target.value;
    
    // Update the character count
    this.characterCount = text.length;
  
    // Calculate the number of text messages
    const messageCount = Math.ceil(this.characterCount / 160);
  
    // Update the message count
    this.messageCount = messageCount;
    this.creditCharge = messageCount * this.totalCountOfPhoneNumbers;

  }
  


  templates = [
    { id: '1707161891201501738', text: 'Your My SMS verification Code id {#var} . Do not share this code with others Team Nuevas' },
    { id: '1707161855199873979', text: 'Dear User your OTP is Kindly use OTP to validate your Registration. Team Trackzia' },
    { id: '1707161899992775140', text: 'Dear , Your Complaint with Complaint Id: has Been Resolve Kindly Share OTP, The OTP is \n From Nuevas' }
  ];



  constructor(private formBuilder:FormBuilder,private service:MessageService,private http:HttpClient){}
  ngOnInit(){
    
  this.smsform=this.formBuilder.group({
  username:['demotr'],
  password:['tr@1234'],
  sender:[''],
  templateid:[''],
  mob:[''],
  msg:[''],
 coding:['1']
 
});
}




changevalue(){

  const selectedTemplateId = this.smsform.get('templateid')?.value;

  if (selectedTemplateId !== null && selectedTemplateId !== undefined) {
    // Find the selected template text based on the ID
    const selectedTemplate = this.templates.find(template => template.id === selectedTemplateId);
  
    // Check if a template with the selected ID is found
    if (selectedTemplate) {
      // Patch the value of the 'msg' form control with the selected template text
      this.smsform.patchValue({
        msg: selectedTemplate.text
        
      });
    } else {
      console.log("Template not found for ID:", selectedTemplateId);
    }
  } else {
    console.log("Selected template ID is null or undefined.");
  }
  
}


SendSMS(){
  this.service.sendSms(this.smsform.value).subscribe((res:any)=>{
    if(res.Success==true){
    alert("Message send Successfully....");
    console.log(res);
    res.datetime = new Date; 
        res.Message = this.smsform.value.msg;
        res.Credit = this.creditCharge;
        res.valid = this.totalCountOfPhoneNumbers;
        res.Sender=this.smsform.controls['sender'].value;
    this.service.getData(res).subscribe((res)=>{
      alert("Data inserted in json server...")
    })
    console.log(this.smsform.value);
  }
  else if(res.Success==false){
    alert("Message UnSuccessfully....");

  }
   this.service.userName=this.smsform.value.username;
   localStorage.setItem('count',(this.service.userName));

 
  });


}


selectAllCheckbox: boolean = false;
checkbox1: boolean = false;
checkbox2: boolean = false;
poolPhoneNumbers: string[] = ['9309580344', '8412819113']; // Example pool phone numbers
testPhoneNumbers: string[] = ['7038520566', '9960576419']; // Example test phone numbers
selectedPhoneNumbers: string[] = []; // Numbers to display based on selection

selectAllChanged() {
  if (this.selectAllCheckbox) {
    this.checkbox1 = true;
    this.checkbox2 = true;
  } else {
    this.checkbox1 = false;
    this.checkbox2 = false;
  }
  this.updateSelectedPhoneNumbers();
}

checkboxChanged() {
  if (this.checkbox1 && this.checkbox2) {
      this.selectAllCheckbox = true;
  } else {
      this.selectAllCheckbox = false;
  }
  this.updateSelectedPhoneNumbers();
}

private updateSelectedPhoneNumbers() {
    if (this.checkbox1 && this.checkbox2) {
        this.selectedPhoneNumbers = [...this.poolPhoneNumbers, ...this.testPhoneNumbers];
    } else if (this.checkbox1) {
        this.selectedPhoneNumbers = [...this.poolPhoneNumbers];
    } else if (this.checkbox2) {
        this.selectedPhoneNumbers = [...this.testPhoneNumbers];
    } else {
        this.selectedPhoneNumbers = [];
    }
}



  // Function to count numbers in the textarea
  



showSchedule: boolean = false;
selectedDate!: string; // Mark as possibly undefined or null
selectedTime!: string; 

openDatePicker() {
  // Implement logic to open date picker
}

openTimePicker() {
  // Implement logic to open time picker
}
toggleSchedule() {
  this.showSchedule = !this.showSchedule;
}

show: boolean = false;

toggleDropdown() {
  this.show = !this.show;
}
allExcelNumbers: any;

  onFileSelected(event:any):void{
    const file: File = event.target.files[0];
    const reader: FileReader = new FileReader();

    reader.onload = (e:any)=>{
      const binaryString: string=e.target.result;
      const workbook: XLSX.WorkBook = XLSX.read(binaryString,{type: 'binary'});
      const sheetName: string = workbook.SheetNames[0];
      const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
      const contacts: any[]=XLSX.utils.sheet_to_json(worksheet, {header: 1});
      const  mobileNumbers: string[] =contacts.map(row => row[0]);

      const mobileNumbersString: string=mobileNumbers.join('\n');



      this.allExcelNumbers=mobileNumbersString
    };
    reader.readAsBinaryString(file);
  }
  importContacts():void{
    this.smsform.patchValue({mob:this.allExcelNumbers});
  }
  selectedImageUrl: string | null = null; // Declare selectedImageUrl property
  selectImage(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedImageUrl = target.value; // Update selected image URL
  
    // Modify the message by replacing {#var} with the selected image URL
    let modifiedMessage = this.smsform.controls['msg'].value.replace('{#var}', this.selectedImageUrl);
  
    // Set the value of the "msg" form control to the modified message
    this.smsform.controls['msg'].setValue(modifiedMessage);
  }
  

}

