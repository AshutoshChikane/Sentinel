import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { FetchDataProcessService } from '../Service/fetchDataProcess.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';

@Component({
  selector: 'fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.scss']
})
export class FetchDataComponent implements OnInit {

  routerState;
  module ='';
  actualModule ='';
  moduleId ;
  subModuleId;
  constructor(private router: Router,
    private fetchDataService: FetchDataProcessService,
    public es: JsontoexcelService) { 
    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', this.routerState);
    this.module = this.routerState['module'];
    this.actualModule = this.routerState['actualModule'];
    this.moduleId = this.routerState['moduleId'];
    this.subModuleId = this.routerState['subModuleId'];
  }

  ngOnInit(): void {
  }
  today = new Date();
  // formatDate(new Date(), "dd/MM/yyyy", "en");
  startDate;
  endDate;
  displayMessage: boolean = false;

  addStartDate(event: MatDatepickerInputEvent<Date>) {
    this.startDate=`${event.value}`;
    this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
    //  console.log('addStartDate >>',this.startDate);
  }

  addEndDate(event: MatDatepickerInputEvent<Date>) {
    // this.events.push(`${event.value}`);
      this.endDate=`${event.value}`;
      this.endDate = formatDate(this.endDate, "dd/MM/yyyy", "en");   
  }

  openConfirmationBox = false;
  messagePopup;
  showOverlay: boolean = false;
  submitDateRange(){
    console.log('submitDateRange ::', this.startDate, this.endDate);
    if (!this.startDate || !this.endDate){
      this.messagePopup = 'Please select period';
      this.openConfirmationBox = true;
      return;
    }
    else {
      this.showOverlay=true;
      this.fetchData();
    }
  }

  showAlert(response) {
    this.openConfirmationBox = false;
    this.displayMessage = false;
    // return;

  }
  responseData;
  noData: boolean = false;
  
  messageType; //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
  export: boolean = false;
  count;
  displayCount: boolean = false;



  fetchData(){
    // this.moduleClicked = false;
    let obj={
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      start_date:this.startDate,
      end_date : this.endDate,
      requested_by: 'Admin',
      request_action: 1      
    }
    console.log('obj >>', obj);
    this.fetchDataService.fetchData(obj).subscribe(
      (response) =>{
        this.messageType = 'Information Message :  ';
        this.message = 'response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.displayMessage = true;

        var res = response;
        console.log(res);
        this.showOverlay = false;
        // this.startDate="";
        // this.endDate ="";
        this.isError = false;
        if(res.response_text.length > 0){
          this.responseData = res.response_text;
          this.noData = false;
          this.export = true;
          // this.emptyArr = false;
        }else{
          // this.emptyArr = true;
          // this.displayMessage = true;
          this.noData = true;
        }
        if(res.count) {
          this.displayCount = true;
          this.count = res.count[0];
        }
        else{
          this.noData = true;
        }
      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message= 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  '+ error.statusText; 
        this.isError = true;
        this.displayMessage = true;

      }
    );

  }


  showMessage() {
    this.displayMessage = false;
  }

  exportAsXLSX() {
    this.es.exportAsExcelFile(this.responseData, 'DataQuality');
    
  }
}
