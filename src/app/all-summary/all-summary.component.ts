import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataQualityMisService } from '../Service/data-quality-mis.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';

@Component({
  selector: 'app-all-summary',
  templateUrl: './all-summary.component.html',
  styleUrls: ['./all-summary.component.scss']
})
export class AllSummaryComponent implements OnInit {


  // jsonData = [
  //   { name: 'Mark Smith', subject: 'English', marks: [67] },
  //   {   marks: [91] },
  //   { subject: 'English', marks: [82] },
  //   {   marks: [ 87] }
  // ];
  

  routerState;
  module = '';
  actualModule = '';
  moduleId;
  subModuleId;
  Data: any;
  SummaryTable:boolean = false;
  SummaryDateFormat: boolean= false;
  messageType;
  displayMessage;
  isError;
  messageDetails;
  message;
  openConfirmationBox;
  messagePopup: any;
  QCloder:boolean= false
  Date: any;
  currentDateExport: boolean = false;
  filterDateExport: boolean = false;

  constructor( private router: Router, private mis:DataQualityMisService, public Export: JsontoexcelService) { 
    this.routerState = this.router.getCurrentNavigation().extras.state;
    this.module = this.routerState['module'];
    this.actualModule = this.routerState['actualModule'];
    this.moduleId = this.routerState['moduleId'];
    this.subModuleId = this.routerState['subModuleId'];
  }

  ngOnInit(): void {
    if(this.module === 'Summary'){
      console.log("Summary is there");
      this.processData()
    }

    
  }

 processData(){
  this.QCloder = true
    console.log("Summary is in function");
     let obj = {
      requested_by: 'Admin',
      request_action: 1,
      module : this.module,
      actualModule: this.actualModule,
      moduleId:this.moduleId,
      subModuleId : this.subModuleId
    }
 
    this.mis.QCData(obj).subscribe(res => {
      this.SummaryTable = true;
      this.SummaryDateFormat= false
      console.log(res, "object");
      this.Data = res.response_text;
      this.openConfirmationBox = true;
      this.messagePopup = res.response_message;
      this.Date = res.response_date;
      this.QCloder = false
      this.currentDateExport = true;
      this.filterDateExport = false;
    },
    (error) => {
      this.QCloder = false
      this.messageType = 'Error Message :  ';
      this.message = 'Error occured while submitting policy :'
      this.messageDetails = error.status + '  ' + error.statusText;
      this.isError = true;
      this.displayMessage = true;
    }
    )
    
}
FromDate;
ToDate;
Datas: any;

SendData(){
 
  if(!this.FromDate || !this.ToDate){
    this.openConfirmationBox = true;
      this.messagePopup = "Please select Date";
      // this.QCloder = false;
  }
  else{  
    this.SummaryTable = false
    this.SummaryDateFormat= true
      this.QCloder = true
    let obj = {
      moduleId : 902,
      subModuleId : 0,
      requested_by: 'Admin',
      request_action: 1,
      FromDate: this.FromDate,
      ToDate: this.ToDate
    }
    console.log(obj, "obj");
    this.mis.QCData(obj).subscribe(res => {
      this.Datas = res.response_text;
      this.Date = res.response_date;
      this.openConfirmationBox = true;
      this.messagePopup = res.response_message;
      this.QCloder = false;
      this.currentDateExport = false;
      this.filterDateExport = true;
      // this.FromDate = '';
      // this.ToDate = '';
    },
    (error) => {
      this.QCloder = false
      this.messageType = 'Error Message :  ';
      this.message = 'Error occured while submitting policy :'
      this.messageDetails = error.status + '  ' + error.statusText;
      this.isError = true;
      this.displayMessage = true;
    }
    )
    
  }
}

showAlert(response: any) {
  this.openConfirmationBox = false;
}

showMessage() {
  this.displayMessage = false;
  this.router.navigate(['./dashboard-page'])
}


searchText : any;

exportAsBeforeFilterCSV() {

  if (this.searchText === undefined) {
    this.Export.exportAsCSVFile(this.Data, 'Summary Data');
  } 
  else {
    const filteredData = this.Data.filter((item: any) =>
    item.REPORTNAME.toLowerCase().includes(this.searchText.toLowerCase()) ||
    item.FREQUENCY.toLowerCase().includes(this.searchText.toLowerCase()) ||
    item.REPORT_DATE.toString().includes(this.searchText) ||
    item.TOTAL_RECORD.toLowerCase().includes(this.searchText.toLowerCase())||
    item.PASS_COUNT.toLowerCase().includes(this.searchText.toLowerCase()) ||
    item.FAIL_COUNT.toString().includes(this.searchText) 
    );
 
     if (filteredData.length > 0 ) {
      this.Export.exportAsCSVFile(filteredData, 'Summary Data');
    } 
    else {
      console.log('No data found for the applied search.');
    }   
  }    
  this.searchText = '';
}



exportAsAfterFilterCSV(){
  if (this.searchText === undefined) {
    this.Export.exportAsCSVFile(this.Datas, 'Summary Data');
  } 
  else {
    const filteredData = this.Datas.filter((item: any) =>
    item.REPORTNAME.toLowerCase().includes(this.searchText.toLowerCase()) ||
    item.FREQUENCY.toLowerCase().includes(this.searchText.toLowerCase()) ||
    item.REPORT_DATE.toString().includes(this.searchText) ||
    item.TOTAL_RECORD.toLowerCase().includes(this.searchText.toLowerCase())||
    item.PASS_COUNT.toLowerCase().includes(this.searchText.toLowerCase()) ||
    item.FAIL_COUNT.toString().includes(this.searchText) 
    );
 
     if (filteredData.length > 0 ) {
      this.Export.exportAsCSVFile(filteredData, 'Summary Data');
    } 
    else {
      console.log('No data found for the applied search.');
    }   
  }    
  this.searchText = '';
}
}
