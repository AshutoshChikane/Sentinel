import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from 'protractor';
import { DataQualityMisService } from '../Service/data-quality-mis.service';
import { DefectTrackerService } from '../Service/defect-tracker.service';
import { formatDate } from '@angular/common';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-mis-module',
  templateUrl: './mis-module.component.html',
  styleUrls: ['./mis-module.component.scss'],
})
export class MisModuleComponent implements OnInit {

  misReportDate = formatDate(new Date(), "dd/MM/yyyy", "en");
  displayMessage:boolean=false;
  moduleName: any;
  dailymodule: boolean = false;
  QCloder: boolean = true;
  Daily_Qc_check:boolean = false;
  

  REPORT_NAMES: string;
  // module1: string;
  module1=localStorage.getItem('Day')
  // console.log(localStorage.getItem('Day'));
 module2=localStorage.getItem('week')
 module3=localStorage.getItem('allModule')
 

  selectedRowD: number;
  moduleData: any;
  // console.log(localStorage.getItem('week'));

  constructor(private mis:DataQualityMisService, private router: Router, private defect:DefectTrackerService) {
    // constructor(private router: Router, private Data_Quality_Mis: DataQualityMisService) { }


  }
 
  ngOnInit(): void {

    if (this.module1=== 'Daily1') {
      console.log("dayly print");
      this.daily();
      localStorage.clear();
    }
    else if(this.module1 === 'Summary'){
      this.load_QC();
      localStorage.clear();
    }
    else if (this.module2=== 'Weekly1') {
      console.log("Weekly1 print");
      this.Weekly();
      localStorage.clear();
    }
    else if (this.module3=== 'allModule') {
      console.log("1234r5t67890");
      // this.Weekly();
      localStorage.clear();
    }



    // this.run()
     

  }
 

  daily() {
   this.QCloder = true;
    let obj = {
      moduleId: '501',
      Date:this.misReportDate,
      request_action: 'mis',
    }

    this.mis.misdaily(obj).subscribe(res => {
      console.log("res", res)
      // console.log("res.response_text", res.response_text);
      this.moduleData = res.response_text
      // console.log(" this.moduleData", this.moduleData);
      this.dailymodule = true;
      this.QCloder = false;
      this.Daily_Qc_check = false;
      

    })
  }


  Weekly() {
    let obj = {
      moduleId: '401',
      request_action: 'Defect Tracker',
    }

    // this.mis.misdaily(obj).subscribe(res => {
    //   console.log("res", res)

    // console.log("res.response_text", res.response_text);
    // this.moduleName=res.response_text
    // console.log(" this.moduleName",  this.moduleName);
    // this.dailymodule = true;

    // this.message = res.response_message;
    // this.openConfirmationBox = true;
    // this.showMessageButton = true;
    // this.displayMessage = true;

    console.log('week page');

    // })
  }

  // daylibtn() {
    // localStorage.setItem('REPORT_NAME', this.REPORT_NAMES);
    // console.log(localStorage.setItem('REPORT_NAME', this.REPORT_NAMES))
    
    alldata:any;
    onEdit(ID: any, data: any) {
      // console.log(ID);
      // console.log(data);
      this.defect.setMessage(ID, data)
      // this.alldata= data;
      console.log('data',data);

      console.log('data',data.Module);
      localStorage.setItem('data',data.Module)

      
      this.router.navigate(['mis-graph'])
    }
  
  // }

//   mode(Event:any)
//   {
// console.log(Event, "Event..");
//   }

Qc_ids={
  'Daily_Extraction_Summary':1001
}

Data: any;
moduleId :any
subModuleId :any


load_QC(){
  this.QCloder = true;
  this.moduleName = 'Daily Extraction Summary'
  this.moduleId = '1001'
  this.subModuleId = '0'
  let obj = {
    'moduleName': this.moduleName,
    'moduleid': this.moduleId,
    'subModuleId' : this.subModuleId
  }

  this.mis.QCData(obj).subscribe(res => {
    this.dailymodule = false;
      this.QCloder = false;
      this.Daily_Qc_check = true;

this.Data = res.response_text;
console.log(this.Data, "QC data")
  })
}





}
