import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { FetchDataProcessService } from '../Service/fetchDataProcess.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { NegativeUnitService } from '../Service/negative-unit.service';

@Component({
  selector: 'app-valuation-data',
  templateUrl: './valuation-data.component.html',
  styleUrls: ['./valuation-data.component.scss'],
})
export class ValuationDataComponent implements OnInit {
  routerState;
  actualModule = '';
  messagePopup: string;
  openConfirmationBox: boolean = false;
  showOverlay: boolean = false;
  displayMessage: boolean = false;
  moduleId;
  subModuleId;
  messageType;
  message;
  messageDetails;
  isError: boolean = false;
  responseData;
  noData: boolean = false;
  export: boolean = false;
  showData: boolean = false;
  displayCount: boolean = false;
  count;
  module: any;
  moduleName: any;
  showBox: boolean;
  Data: any;
  showTableAndDate: boolean;

  constructor(
    private router: Router,
    private fetchDataService: FetchDataProcessService,
    public es: JsontoexcelService,
    public Negative: NegativeUnitService
  ) {
    console.log(this.router.getCurrentNavigation().extras.state, 'mayur');
    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', this.routerState);
    this.module = this.routerState['module'];
    this.actualModule = this.routerState['actualModule'];
    this.moduleId = this.routerState['moduleId'];
    this.subModuleId = this.routerState['subModuleId'];
    this.moduleName = this.routerState['moduleName'];
  }

  ngOnInit(): void {
    if ( this.module === 'STATIC_FIELDS' || this.module === '_9_DEATH_SURRENDER_CHANGES_IN_FUP_DOD_DOI_SURRENDER_DATES' ||
      this.module === '_13_ANNUITY_OPTION_CHANGED_FOR_POLICIES' || this.module === 'STATIC_FIELDS_SUMMARY' ) {
      this.showBox = true;
    }
    if(this.module === 'NEGATIVE_ANNUALIZED_PREMIUM' || this.module === 'RIDER_PPT_GREATER_THAN_POLICY_TERM'|| this.module === 'DOC_AND_FUP_DIFFERENT_GREATER_THAN_PPT' || 
    this.module === '_1W_JL_RIDER_SA_IS_NOT_NULL_AND_RIDER_PREMIUM_IS_NULL'){
      this.showTableAndDate = true;
    }
  }
  table1;
  table2;

  submitTableDate() {
    console.log(this.table1, this.table2);

    console.log('submitDateRange ::', this.table1, this.table2);
    if (
      this.module === 'STATIC_FIELDS' || this.module === '_9_DEATH_SURRENDER_CHANGES_IN_FUP_DOD_DOI_SURRENDER_DATES' ||
      this.module === '_13_ANNUITY_OPTION_CHANGED_FOR_POLICIES' || this.module === 'STATIC_FIELDS_SUMMARY'
    ) {
      if (!this.table1 || !this.table2) {
        this.messagePopup = 'Please Enter Feilds';
        this.openConfirmationBox = true;

        return;
      } else {
        this.showOverlay = true;
        this.fetchData();
      }
    }
    if(this.module === 'NEGATIVE_ANNUALIZED_PREMIUM'){
      if (!this.table1 || !this.table2) {
        this.messagePopup = 'Please Enter Feilds';
        this.openConfirmationBox = true;

        return;
      } else {
        this.showOverlay = true;
        this.fetchData2();
      }
    }

    if(this.module === 'RIDER_PPT_GREATER_THAN_POLICY_TERM'){
      if (!this.table1 || !this.table2) {
        this.messagePopup = 'Please Enter Feilds';
        this.openConfirmationBox = true;

        return;
      } else {
        this.showOverlay = true;
        this.fetchData2();
      }
    }

    if(this.module === 'DOC_AND_FUP_DIFFERENT_GREATER_THAN_PPT'){
      if (!this.table1 || !this.table2) {
        this.messagePopup = 'Please Enter Feilds';
        this.openConfirmationBox = true;

        return;
      } else {
        this.showOverlay = true;
        this.fetchData2();
      }
    }

    if(this.module === '_1W_JL_RIDER_SA_IS_NOT_NULL_AND_RIDER_PREMIUM_IS_NULL'){
      if (!this.table1 || !this.table2) {
        this.messagePopup = 'Please Enter Feilds';
        this.openConfirmationBox = true;

        return;
      } else {
        this.showOverlay = true;
        this.fetchData2();
      }
    }

    
  }

  showAlert(response) {
    this.openConfirmationBox = false;
    this.displayMessage = false;
    // return;
  }

  fetchData() {
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      actualModule: this.actualModule,
      moduleName: this.moduleName,
      // start_date:this.startDate,
      // end_date : this.endDate,
      table_Data1: this.table1,
      table_Data2: this.table2,
      requested_by: 'Admin',
      request_action: 1,
    };
    console.log('obj >>', obj);
    this.Negative.submodule(obj).subscribe(
      (response) => {
        this.messageType = 'Information Message :  ';
        this.message = 'response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.displayMessage = true;
        this.showBox = false;
        var res = response;
        console.log(res);
        this.showOverlay = false;
        // this.startDate="";
        // this.endDate ="";
        this.isError = false;
        if (res.response_text.length > 0) {
          this.responseData = res.response_text;
          this.noData = false;
          this.export = true;
          this.showData = false;
          // this.emptyArr = false;
        } else {
          // this.emptyArr = true;
          // this.displayMessage = true;
          this.noData = true;
        }

        if (res.count) {
          this.displayCount = true;
          this.count = res.count[0];
        } else {
          this.noData = true;
        }
      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :';
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
      }
    );
  }

  fetchData1() {
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      actualModule: this.actualModule,
      moduleName: this.moduleName,
      // start_date:this.startDate,
      // end_date : this.endDate,
      table_Data1: this.table1,
      table_Data2: this.table2,
      requested_by: 'Admin',
      request_action: 1,
    };
    console.log('obj >>', obj);
    this.Negative.submodule(obj).subscribe(
      (response) => {
        this.Data = response.response_text;
        this.messageType = 'Information Message :  ';
        this.message = 'response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.displayMessage = true;
        this.showBox = false;
        var res = response;
        console.log(res);
        this.showOverlay = false;
        // this.startDate="";
        // this.endDate ="";
        this.isError = false;
        if (res.response_text.length > 0) {
          this.responseData = res.response_text;
          this.noData = false;
          this.export = true;
          this.showData = true;
          // this.emptyArr = false;
        } else {
          // this.emptyArr = true;
          // this.displayMessage = true;
          this.noData = true;
        }

        if (res.count) {
          this.displayCount = true;
          this.count = res.count[0];
        } else {
          this.noData = true;
        }
      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :';
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
      }
    );
  }

  fetchData2() {
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      actualModule: this.actualModule,
      moduleName: this.moduleName,
      // start_date:this.startDate,
      // end_date : this.endDate,
      table_Name: this.table1,
      Date: this.table2,
      requested_by: 'Admin',
      request_action: 1,
    };
    console.log('obj >>', obj);
    this.Negative.submodule(obj).subscribe(
      (response) => {
        this.messageType = 'Information Message :  ';
        this.message = 'response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.displayMessage = true;
        this.showBox = false;
        var res = response;
        console.log(res);
        this.showOverlay = false;
        // this.startDate="";
        // this.endDate ="";
        this.isError = false;
        if (res.response_text.length > 0) {
          this.responseData = res.response_text;
          this.noData = false;
          this.export = true;
          this.showData = false;
          // this.emptyArr = false;
        } else {
          // this.emptyArr = true;
          // this.displayMessage = true;
          this.noData = true;
        }

        if (res.count) {
          this.displayCount = true;
          this.count = res.count[0];
        } else {
          this.noData = true;
        }
      },
      (error) => {
        this.showOverlay = false;
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
  }
  exportAsCSV() {
    this.es.exportAsCSVFile(this.responseData, 'DataQuality');
  }
}
