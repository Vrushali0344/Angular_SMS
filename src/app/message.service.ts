import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private dburl="http://localhost:3000/report";
  httpHeaders=new HttpHeaders().set('content-type','application/json');
  servicedata: any;
  userName: any;



constructor(private http:HttpClient) { }



sendSms(data:any) {
    
    return this.http.get("http://api.sms123.in/api/QuickSend/QuickSend?username="+data.username+"&password="+
    data.password+"&mob="+data.mob+"&msg="+data.msg+"&sender="+data.sender+"&templateid="+data.templateid+
    "&coding="+data.coding,data);
    }

    getBalance(username:any){
      return this.http.get('http://api.sms123.in/api/Credit/Credit?username='+username)
     }

    getData(data:any){
      return this.http.post(this.dburl,data);
     }
    getjsondata(){
      return this.http.get(this.dburl);
    }


  }




