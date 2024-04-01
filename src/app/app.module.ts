import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessageComponent } from './message/message.component';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ReportComponent } from './report/report.component';







@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MessageComponent,
    HomeComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
 
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
