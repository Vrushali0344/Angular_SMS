import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent{
   
   constructor(private http:HttpClient,private router:ActivatedRoute,private service:MessageService){}
   report: any;


  ngOnInit(): void {
  //   this.http.get<any[]>("http://localhost:3000/report").subscribe(data => {
  //     this.report = data;
  //   });
  // }
  this.service.getjsondata().subscribe((res)=>{
    this.report = res;

  })
}
 // Function to download the report in Excel (XLSX) format
 downloadReportAsExcel(){
  const wb = XLSX.utils.book_new();
  wb.Props = {
    Title: 'Report',
    Subject: 'Data',
    Author: 'Your Name',
    CreatedDate: new Date()
  };
  wb.SheetNames.push('Report');
  const wsData = this.generateExcelData(this.report);
  const ws = XLSX.utils.json_to_sheet(wsData);
  wb.Sheets['Report'] = ws;
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'report.xlsx');
}

// Function to generate Excel data from the report
generateExcelData(report: any[]): any[] {
  const data: any[] = [];
  // Push header row
  data.push(['Success','sender','Message', 'MobileNo', 'Status']);
  // Push data rows
  for (const item of report) {
    // Split phone numbers by comma character and iterate over each phone number
    const phoneNumbers = item.MobileNo.split(',');
    for (const phoneNumber of phoneNumbers) {
      data.push([item.Success,item.Sender,item.templateid, phoneNumber.trim(), item.Status]);
    }
  }
  return data;
}
isContainer2Visible:boolean=false;
selectedItemIndex: number | null = null; // declare the property

toggleVisibility(index: number | null) {
  this.selectedItemIndex = index;
  this.isContainer2Visible = !this.isContainer2Visible; // update the method to accept and use the index
}

}

