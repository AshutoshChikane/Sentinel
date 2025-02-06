import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NegativeUnitService } from '../Service/negative-unit.service';
import { error, log } from 'console';
import { JsontoexcelService } from '../Service/jsontoexcel.service';

@Component({
  selector: 'app-val-summary',
  templateUrl: './val-summary.component.html',
  styleUrls: ['./val-summary.component.scss'],
})
export class ValSummaryComponent implements OnInit {
  routerState;
  module = '';
  actualModule = '';
  moduleId;
  subModuleId;
  moduleName: any;
  val_summary_table: boolean = false;
  Data: any;
  Month_Name: any ;
  exportTocsv: boolean;
  exportComparcsv: boolean;

  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private negative: NegativeUnitService,
    public Export: JsontoexcelService
  ) {
    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', this.routerState);
    this.module = this.routerState['module'];
    this.actualModule = this.routerState['actualModule'];
    console.log('actualmodule 32:', this.actualModule);
    this.moduleId = this.routerState['moduleId'];
    this.subModuleId = this.routerState['subModuleId'];
  }

  ngOnInit(): void {
    if (
      this.module === 'STATIC_FIELDS_SUMMARY1' ||
      this.module === 'CRITICAL_FIELDS_SUMMARY1'
    ) {
      this.val_summary_table = false;
      this.Summ_Form = true;
    } else {
      this.router.navigate(['/main-valuation']);
    }
  }


  // summary_Module_Id = {
  //   'STATIC_FIELDS_SUMMARY1': 601,
  //   'CRITICAL_FIELDS_SUMMARY1':602,
  // };



  messageType; //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
  displayMessage: boolean = false;
  openConfirmationBox: boolean;
  messagePopup: string;
  Summ_Form: boolean = false;
  // Month_Name: any;
  ExportToCsv: boolean = false;

  submitTableDate() {
    if (
      this.module === 'STATIC_FIELDS_SUMMARY1' ||
      this.module === 'CRITICAL_FIELDS_SUMMARY1'
    ) {
      if (!this.Month_Name) {
        this.messagePopup = 'Please Enter Month';
        this.openConfirmationBox = true;
      } else {
        this.Summ_Form = true;
        this.tabledata();
      }
    }
  }

  SummaryData: any;

  tabledata() {
    this.Summ_Form = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      Month_Name: this.Month_Name,
    };
    console.log(obj, 'object');
    this.negative.Summary(obj).subscribe(
      (result) => {
        console.log(result, "reeeeee");
        
        this.SummaryData = result.response_text;
        this.openConfirmationBox = true;
        this.messagePopup = result.response_message;
        this.Data = result.response_text;
        console.log(this.Data, "data");
        this.val_summary_table = true;
        this.Summ_Form = false;
        this.ExportToCsv = true;
        this.exportTocsv = true;
        this.exportComparcsv = false;
      },
      (error) => {
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :';
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
      }
    );
       
  }

  showMessage() {
    this.displayMessage = false;
    // this.router.navigate(['/main-valuation']);
  }
  showAlert() {
    this.openConfirmationBox = false;
  }

  


  CompareTo: any;
  CompareMonth: any;
  compareData: any;
  compare_summary_table :boolean;

  CompareData(){
    if(!this.CompareMonth || !this.CompareTo){
      this.messagePopup = 'Please Enter Feilds';
      this.openConfirmationBox = true;
    }
    else{
      this.tabledata1()
      this.CompareMonth = ''
      this.CompareTo = '';
    }

  }

  tabledata1() {

    let obj = {
      module_id: '504',
      requested_by: 'Admin',
      request_action: 1,
      submodule_id: this.subModuleId,
       compareMonth:this.CompareMonth,
       compareTo :this.CompareTo
    };
    console.log(obj, 'object');
    this.negative.compareSummary(obj).subscribe(
      (result) => {
        console.log(result, "reeeeee");
        
        this.SummaryData = result.response_text;
        this.openConfirmationBox = true;
        this.messagePopup = result.response_message;
        this.compareData = result.response_text;
        this.compare_summary_table = true;
        this.val_summary_table = false;
        this.Summ_Form = false;
        this.ExportToCsv = true;
        this.exportTocsv = false;
        this.exportComparcsv = true;
      },
      (error) => {
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :';
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
      }
    );
       
  }

  

  searchText : any;
  exportAsCSV() {

    if (this.searchText === undefined) {
      this.Export.exportAsCSVFile(this.Data, 'Summary Data');
    } 
    else {
      const filteredData = this.Data.filter((item: any) =>
        item.REMARKS.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.TABLE_NAME.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.TOTAL_COUNT.toString().includes(this.searchText) ||
        item.MONTH.toLowerCase().includes(this.searchText.toLowerCase())
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


  exportAsComparedCSV(){
    if (this.searchText === undefined) {
      this.Export.exportAsCSVFile(this.compareData, 'Summary Data');

    } 
    else {
      const filteredData1 = this.compareData.filter((item: any) =>
        item.REMARKS.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.TABLE_NAME.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.TOTAL_COUNT.toString().includes(this.searchText) ||
        item.MONTH.toLowerCase().includes(this.searchText.toLowerCase())||
        item.TABLE_NAME1.toLowerCase().includes(this.searchText.toLowerCase()) ||
        item.TOTAL_COUNT1.toString().includes(this.searchText) ||
        item.MONTH1.toLowerCase().includes(this.searchText.toLowerCase())
      );
   
       if (filteredData1.length > 0 ) {
        this.Export.exportAsCSVFile(filteredData1, 'Summary Data');
      } 
      else {
        console.log('No data found for the applied search.');
      }   
    }
    this.searchText = '';
  }


  

}
