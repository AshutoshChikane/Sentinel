import { formatDate } from '@angular/common';
import { Component, Input, NgZone, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { FormControl } from '@angular/forms';
import { newArray } from '@angular/compiler/src/util';


@Component({
  selector: 'app-tabledashboard',
  templateUrl: './tabledashboard.component.html',
  styleUrls: ['./tabledashboard.component.scss']
})
export class TabledashboardComponent implements OnInit {

  @Input()
  max: any;
  dashboardtable: ['ADMIN CHARGES', 'DISCO CHARGES 1M', 'NOT IN DUE LIST', 'DISCO CHARGES ULIP', 'ALLOCATION CHARGES', 'MORTALITY UNITIZATION', 'MORTALITY SKIPPED CASES', 'ADMIN SKIPPED CASES', 'ADMIN_UNITIZATION', 'ALLOCATION UNITIZATION', 'STATUS NOT MATURED'];
  tableData: boolean;
  table: boolean;
  // dashboardtable: any;

  Array1=new Array()
  Array2=new Array()
  keys: string[];
  constructor(public gs: GlobalService, public es: JsontoexcelService, private ngZone: NgZone) { }


  today = new Date();
  year;
  month;
  dayDate;
  startDate;
  // formatDate(this.today.toDateString(), "dd/MM/yyyy", "en");
  endDate;
  // formatDate(this.today.toDateString(), "dd/MM/yyyy", "en");
  displayedColumns: string[];
  // Report_Names=['ADMIN CHARGES','DISCO CHARGES 1M','NOT IN DUE LIST','DISCO CHARGES ULIP','ALLOCATION CHARGES','MORTALITY UNITIZATION','MORTALITY SKIPPED CASES','ADMIN SKIPPED CASES','ADMIN_UNITIZATION','ALLOCATION UNITIZATION','STATUS NOT CHANGE','STATUS NOT LAPSED AFTER GRACE PERIOD','LTR NOT PROCEED AFTER LOCK-IN-PERIOD','DEPOSIT PRESENT BUT NOT ALLOCATED','SB SKIPPED CASES' ]
  Report_Names=['ADMIN CHARGES','DISCO CHARGES 1M','NOT IN DUE LIST','DISCO CHARGES ULIP','ALLOCATION CHARGES','MORTALITY UNITIZATION','MORTALITY SKIPPED CASES','ADMIN SKIPPED CASES','ADMIN_UNITIZATION','ALLOCATION UNITIZATION','STATUS NOT CHANGE','DEPOSITE NOT ALLOCATED ULIP', 'DEPOSITE NOT ALLOCATED NON ULIP' ,'SB SKIPPED CASES','STATUS NOT LAPSED AFTER GRACE PERIOD', 'UNCLAIMED MOVEMENT', 'MORTALITY CHARGES']


  ngOnInit(): void {
    this.displayedColumns = ['REPORT_NAME', 'REPORT_RUN_DATE_TIME', 'Extraction_DATE', 'Pass', 'Fail', 'WIP', 'REPORT_STATUS', 'Ageing_0_5',
      'Ageing_5'];

    this.getList();
  }


  // setStartAndEndDate () {    
  //   this.today = new Date();
  //   this.year = this.today.getFullYear();
  //   this.month = this.today.getMonth();
  //   this.dayDate = this.today.getDate();
  //   this.startDate = this.formatDate(new Date(this.year, this.month, 1));
  //   this.endDate = this.formatDate(new Date(this.year, this.month + 1, 0));
  // }

  showOverlay: boolean = false;
  mis_data;
  noData: boolean = true;
  displayMessage: boolean = false;

  messageType; //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
  emptyArr: boolean = false;
  misReportDate = formatDate(new Date(), "dd/MM/yyyy", "en");
  obj:any;
  subModuleId = 1;
  async getList() {
    this.showOverlay = true
    this.misReportDate = formatDate(new Date(), "dd/MM/yyyy", "en");
    let obj = {
      module_id: 35,
      submodule_id: 1,
      // start_date:this.startDate,
      // end_date : this.endDate,
      requested_by: 'Admin',
      request_action: 1
    }
    console.log('data: Dashboard >>', obj);

    await this.gs.getMisList(obj).subscribe(

      (response) => {
        this.messageType = 'Information Message :  ';
        // this.message = 'server [ response_code : ' + response.response_code + ' ]';
        this.message = 'Response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.displayMessage = true;

        var res = response;
        console.log(res);
        console.log(res.response_text)
        this.showOverlay = false;
        this.dashboardtable = res.response_text;
        console.log(this.dashboardtable)
        this.dashboardtable.forEach(element => {
          console.log('element',element);
          console.log(Object.keys(element))

          this.Array1.push(Object.keys(element))
        });
      //  console.log( this.dashboardtable.keys())
      
console.log(this.Array1);
this.Array1.forEach(element => {
  // this.dashboardtable[element]
  console.log(element)
  
  
})
this.dashboardtable.forEach(ele => {
  
this.Report_Names.forEach(element => {
  // this.dashboardtable[element]
  console.log(element);
  console.log(this.dashboardtable)
 console.log(ele[element])
  if(ele[element])
  {
    this.obj={NAME:element,data:ele[element]}
    this.Array2.push(this.obj)
  }
else{
  this.obj={NAME:element,data:'-'}
  this.Array2.push(this.obj)
}
})
});
// this.Array1.forEach(element => {
//   this.dashboardtable[element]
//   console.log(element);
//   this.Array2.push(this.dashboardtable[element])
// })
console.log('Arry2',this.Array2);
// this.keys=Object.keys(this.dashboardtable)
// console.log(this.keys)

console.log(this.Array2);
        // this.startDate="";
        this.table=true;
        // this.endDate ="";
        this.isError = false;
        // if(res.response_text.length > 0){
        //   this.dashboardtable = res.response_text;
        //  console.log(res.response_text); 
        //   this.noData = false;
        //   // this.emptyArr = false;
        // }else{
        //   // this.emptyArr = true;
        //   // this.displayMessage = true;
        //   this.noData = true;
        // }
        // if()
      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;


      }
    );
  }


  
  showMessage() {
   

    this.displayMessage = false;
    // console.log('subMIS >>',this.subMIS,'noData >>',this.noData,'emptyArr >>',this.emptyArr, 'isError >>', this.isError, 'displayMessage >>', this.displayMessage);

    // if ( this.emptyArr == false && this.isError == false ) {

    //   this.noData = false;
    // } else {
    //   this.noData = true;
    // }
    this.ngZone.run(() => { });
  }


  dateWiseMIS = true;
  betweenDatesClicked = false;
  monthlyClicked = false;
  ageingMISClicked = false;
  // subMIS = false;
  // handleClick ( misType ) {
  //   console.log( 'misType >>', misType );
  //   // this.subMIS = true;
  //   this.exportDateWiseMIS = false;

  //   if ( misType && misType === 'betweenDates' ) {
  //     this.betweenDatesClicked = true;
  //     this.subModuleId = 2;
  //     this.monthlyClicked = false;
  //     this.ageingMISClicked = false;
  //   }
  //   if ( misType && misType === 'monthly' ) {
  //     this.subModuleId = 3;
  //     this.monthlyClicked = true;
  //     this.betweenDatesClicked = false;
  //     this.ageingMISClicked = false;
  //   }
  //   if ( misType && misType === 'ageingMIS' ) {
  //     this.subModuleId = 4;
  //     this.ageingMISClicked = true;
  //     this.betweenDatesClicked = false;
  //     this.monthlyClicked = false;
  //     this.startDate=this.misReportDate;
  //     this.endDate=this.misReportDate;

  //     // this.getMISDataDetails();
  //   }
  // }


  date;
  // = new FormControl(moment());


  // setMonthAndYear (normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
  //   this.date = new FormControl(moment());
  //   const ctrlValue = this.date.value!;
  //   ctrlValue.month(normalizedMonthAndYear.month());
  //   ctrlValue.year(normalizedMonthAndYear.year());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  //   var _date = this.date.value;
  //   var date = new Date(_date), y = date.getFullYear(), m = date.getMonth();
  //   console.log(date, y, m);
  //   var firstDay = new Date(y, m, 1);
  //   this.startDate = this.formatDate(firstDay);
  //   var lastDay = new Date(y,m+1,0);
  //   this.endDate = this.formatDate(lastDay);
  //   console.log(firstDay,lastDay);
  // }

  formatDate(date) {
    var formattedDate = formatDate(date.toDateString(), "dd/MM/yyyy", "en");
    return formattedDate;
  }

  // addStartDate(event: MatDatepickerInputEvent<Date>) {
  //   // this.events.push(`${event.value}`);
  //    this.startDate=`${event.value}`;
  //    console.log('addStartDate >>',this.startDate)
  //    this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
  //    console.log('addStartDate >>',this.startDate);

  //  }

  //  addEndDate(event: MatDatepickerInputEvent<Date>) {
  //    // this.events.push(`${event.value}`);
  //     this.endDate=`${event.value}`;
  //     this.endDate = formatDate(this.endDate, "dd/MM/yyyy", "en");   
  //  }

  //  findMonthAndYear(normalizedMonthAndYear: Moment) {
  //   const ctrlValue = this.date.value!;
  //   ctrlValue.month(normalizedMonthAndYear.month());
  //   ctrlValue.year(normalizedMonthAndYear.year());
  //   this.date.setValue(ctrlValue);
  //   var _date = this.date.value;
  //   var date = new Date(_date), y = date.getFullYear(), m = date.getMonth();
  //   console.log(date, y, m);
  //   var firstDay = new Date(y, m, 1);
  //   this.startDate = this.formatDate(firstDay);
  //   var lastDay = new Date(y,m+1,0);
  //   this.endDate = this.formatDate(lastDay);
  //   console.log(firstDay,lastDay);

  //  }

  openConfirmationBox = false;
  messagePopup;
  // submitDateRange(){
  //     console.log('submitDateRange ::monthlyClicked', this.date, this.startDate, this.endDate);
  //   if (!this.startDate || !this.endDate){
  //     console.log('dates blank', this.date);
  //     // this.setStartAndEndDate();
  //     this.messagePopup = 'Please select period';
  //     this.openConfirmationBox = true;
  //     return;

  //   }
  //   else {
  //     this.getMISDataDetails();
  //   }

  // }
  showAlert(response) {
    this.openConfirmationBox = false;
  }
  exportDateWiseMIS = false;
  dateWiseMISData;
  noDataAvailable = false;
  getMISDataDetails() {
    let obj = {
      module_id: 35,
      submodule_id: this.subModuleId,
      start_date: this.startDate,
      end_date: this.endDate,
      requested_by: 'Admin',
      request_action: 1
    }
    console.log('data: MIS >>', obj);
    this.showOverlay = true;

    this.gs.getMisData(obj).subscribe(
      (response) => {
        this.messageType = 'Information Message :  ';
        // this.message = 'server [ response_code : ' + response.response_code + ' ]';
        this.message = 'Response_code : ' + response.response_code;
        this.messageDetails = response.response_message;

        this.displayMessage = true;
        var res = response;
        // this.gs.loader=false;
        this.showOverlay = false;
        this.startDate = "";
        this.endDate = "";
        // alert(res.response_message);
        this.isError = false;
        if (res.response_text.length > 0) {
          // this.noData = false;
          this.dateWiseMISData = res.response_text;
          this.exportDateWiseMIS = true;
          // this.emptyArr = false;
          // this.showHide = false;
          // this.es.exportAsExcelFile(res.response_text, 'mis_report');
        } else {
          // this.noData = true;
          // this.emptyArr = true;
          this.displayMessage = true;
          this.noDataAvailable = true;

          // alert("No data found")
        }


      },
      (error) => {
        this.showOverlay = false;
        console.log('Error occured while submitting policy : : ', new Date() + ' ' + error.status + ': ' + error.statusText);
        this.message = 'Error_code : 0 ';
        this.messageDetails = 'Error';

        this.messageType = 'Error Message :  ';
        // this.message= 'Error occured while submitting policy :'
        // this.messageDetails = error.status + '  '+ error.statusText; 

        this.isError = true;
        this.displayMessage = true;

      }

    );

  }

  findInObject(){

  }

  exportAsXLSX() {
    this.es.exportAsExcelFile([this.Array2], 'mis_report');
    console.log('[this.Array2]....',[this.Array2])

  }

  exportMISDataAsXLSX() {
    this.es.exportAsExcelFile(this.dateWiseMISData, 'mis_report');

  }
}