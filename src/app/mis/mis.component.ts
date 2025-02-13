import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-mis',
  templateUrl: './mis.component.html',
  styleUrls: ['./mis.component.scss']
})
export class MISComponent implements OnInit {
 
  constructor( private router: Router) { }

  DailyShow: boolean=true;
MonthlyShow:boolean=true;
WeeklyShow :boolean = true
dailyReportGraph :boolean = false

  ngOnInit(): void {
    this.DailyShow =true;
    this.MonthlyShow =true;
    this.WeeklyShow  = true;
    this.dailyReportGraph = false;
  }


//   mis_Daily(){
//     this.router.navigate(['Mis-Module']);
//     if(true){
//     localStorage.setItem('Daily', this.Daily);
//     // setTimeout(()=>{
//     //   localStorage.clear();
//     // },1000)
//   }
// }
// mis_Weekly(){
//   this.router.navigate(['Mis-Module']);
//     if(true){
//     localStorage.setItem('Weekly', this.Weekly);
//     // setTimeout(()=>{
//     //   localStorage.clear();
//     // },1000)
//   }
// }
// mis_Monthly(){
//   this.router.navigate(['Mis-Module']);
//     if(true){
//     localStorage.setItem('Monthly', this.Monthly);
//     // setTimeout(()=>{
//     //   localStorage.clear();
//     // },1000)
//   }
// }

Day:string='Daily1';
week:string='Weekly1';
month:string='month1';
DailySummary:string = 'Summary'


DailyData: boolean=false;


Extract(data: any){
  console.log(data, "data");
  if(data === 'Summary'){
    localStorage.setItem('Day', this.DailySummary);
    console.log(localStorage.getItem('Day'));
    this.router.navigate(['Mis-Module']);
  }
  if(data === "Dashboard"){
    localStorage.setItem('Day', this.Day);
    console.log(localStorage.getItem('Day'));
    this.router.navigate(['Mis-Module']);
  }

}

mis_Daily(){
  this.DailyData = !this.DailyData;
  this.WeeklyShow = !this.WeeklyShow;
  this.MonthlyShow = !this.MonthlyShow;
  }


  mis_Weekly(){
    
    localStorage.setItem('week', this.week);
    console.log(localStorage.getItem('week'));
        
    this.router.navigate(['Mis-Module']);
  }
  mis_Monthly(){
    
    localStorage.setItem('month', this.week);
    console.log(localStorage.getItem('month'));
        
    this.router.navigate(['Mis-Module']);
  }

  dailyReportGraphSwitch(){
    localStorage.setItem('month', this.week);
    console.log(localStorage.getItem('month'));
          
    this.router.navigate(['Mis-Module-Ac']);
  }
   

}