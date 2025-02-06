import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { threadId } from 'worker_threads';
import { FetchDataProcessService } from '../Service/fetchDataProcess.service';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { NegativeUnitService } from '../Service/negative-unit.service';
import { HttpClient } from '@angular/common/http';
import { Module } from 'module';



@Component({
  selector: 'app-valuation',
  templateUrl: './valuation.component.html',
  styleUrls: ['./valuation.component.scss']
})


export class VALUATIONComponent implements OnInit {
  selectedFile: File | undefined;

  routerState;
  module = '';
  actualModule = '';
  moduleId;
  subModuleId;
  moduleName: any;

  datatable: boolean;
  submoduledata: any;
  datatablesource: any;
  datamodule1: any;

  showloader: boolean;
  input: any;
  showData: boolean=false;
  Data: any;
  Dateformatter: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dropdown: boolean;
  M1page: boolean;
  messagePopup: string;
  openConfirmationBox: boolean;
  INPUT: boolean;
  tablelist: any;
  month: any;
  tabledata: any;
  monthtables: any;
  filename1: any;
  dropdown1: boolean;
  M1page1: boolean;
  dropdown2: boolean;
  DODPage: boolean;
  table_1M: any;
  table_NonUlip: any;
  table_Ulip: any;
  table_Annuity: any;
  table_56: any;
  table_1E: any;
  responseText: any;
  interestrate: any;
  fromdate: any;
  todate: any
  StatusIncon: boolean = false


  Ulip_Current_Month: any ;
    Ulip_Last_Month : any ;
    Non_Ulip_Current_Month : any ;
    Non_Ulip_Last_Month : any ;
    _1M_Current_Month : any ;
    _1M_Last_Month : any ;
    _1E_Current_Month: any ;
    _1E_Last_Month : any ;
    _56_Current_Month : any ;
    _56_Last_Month : any ;
    Annuity_Current_Month: any ;
    Annuity_Last_Month : any ;
    Rinn_Raksha_Current_Month : any ;
    Rinn_Raksha_Last_Month: any ;

  constructor(private router: Router, private httpClient: HttpClient,
    private fetchDataService: FetchDataProcessService,
    public es: JsontoexcelService, private NU: NegativeUnitService) {
    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', this.routerState);
    this.module = this.routerState['module'];

    this.actualModule = this.routerState['actualModule'];
    console.log('actualmodule 32:', this.actualModule);

    this.moduleId = this.routerState['moduleId'];
    this.subModuleId = this.routerState['subModuleId'];
  }

  // ValuationDroplist = ["ACTUARIAL_ULIP_VALIDATION", "ACT_FLEXI_SMART_PLUS_SF", "ACT_DATA_PENSION_SF", "ACT_LLPPLUS_VALIDATION_SF",
  //   "ACTUARIAL_ANNUITY_PLUS", "ACTUARIAL_DATA_HOSPICASH", "ACT_FLEXI_SMART_DATA_SF", "ACTUARIAL_DATA_TRADITIONAL"]

  //   monthdata=['jan','feb','march','april']

  ngOnInit(): void {
    console.log('*****************');
    if (this.actualModule === 'UNITS PRESENT IN EXIT STATUS' || this.actualModule === 'NEGATIVE UNITS PRESENT' || this.actualModule === 'UNITS EQUAL TO ZERO FOR INFORCE POLICIES' ||
      this.actualModule === 'UNITS PRESENT IN DISCO FUNDS_ULIP' || this.actualModule === 'UNITS PRESENT IN REGULAR FUNDS_ULIP' || this.actualModule === 'UNITS PRESENT IN DISCO FUNDS_1M' || this.actualModule === 'UNITS PRESENT IN REGULAR FUNDS_1M' ||
      this.actualModule === 'correctness of increasing and decreasing sum assured benefit valuation - NON_ULIP_INFORCE_INDIGO' || this.actualModule === 'correctness of increasing and decreasing sum assured benefit valuation - NON_ULIP_PAID_UP_INDIGO' || 
      this.actualModule === 'correctness of increasing and decreasing sum assured benefit valuation - ULIP_INDIGO' || this.module ==='DUPLICATE_ENTRIES' || this.actualModule === 'ULIP-18,19,21' || this.module === 'RIDER_INCONSISTENCY' ||
      this.module === '_1_DOD_BLANK_FOR_DEATH_RELATED_STATUSES' || this.module === '_2_SURRENDER_DATE_BLANK_FOR_SURRENDER_RELATED_STATUSES' ||
      this.module === '_3_NON_ZERO_SURRENDER_DATE_FOR_OTHER_THAN_SURRENDER_RELATED_STATUSES' || this.module === '_4_NON_ZERO_DATE_OF_DEATH_FOR_OTHER_THAN_DEATH_RELATED_STATUSES' || this.module === '_5_FUP_BLANK' ||
      this.module === '_6_FUP_AFTER_DATE_OF_VALUATION_FOR_LAPSED_CASES' || this.module === 'CRITICAL_FIELDS_SUMMARY' || this.module === 'Age_mismatch_NB_EB' || this.module === 'Diff_DOB_for_same_client_ID' || this.module === 'BOUNDARY_CONDITION'
      ||this.module==='_2M_Bonus' || this.module === 'Paid_Up_value' || this.module === '_7_BASIC_SA_BASIC_PREMIUM_POLICY_TERM_PPT_ZERO_IN_NON_SP_NULL_ZERO' || this.module === '_8_NEGATIVE_PREMIUMS' || this.module === '_10_LA_GENDER_BLANK_NULL_INVALID_VALUE'
      || this.module === '_10_LA_GENDER_BLANK_NULL_INVALID_VALUE' || this.module === '_11_POLICYHOLDER_GENDER_BLANK_NULL_INVALID_VALUE' || this.module === '_12_DISTRIBUTION_CHANNEL_IS_BLANK_NULL' || this.module === '_14_SMOKER_FLAG_NULL_INVALID_BLANK_2N_AND_45_V07'
      || this.module === '_15_RIDER_TERM_NOT_WITHIN_BASE_TERM' || this.module === '_16_SUM_ASSURED_ZERO_FOR_POLICIES_IN_PROTECTION_AND_SDF_DATA' || this.module === '_17_1B_MATURED_INFORCE_LUMPSUM_MATURITY_FLAG_AS_Y' || this.module === '_18_1B_MATURED_LUMPSUM_MATURITY_FLAG_AS_N_OR_NULL'||
      this.module === '_19_35_MATURED_INFORCE_FOR_ENDOWMENT_POLICIES' || this.module === '_20_35_MATURED_WHOLELIFE_POLICIES' || this.module === '_21_POLICY_TERM_ZERO_IN_SDF_DATA' || this.module === 'BONUS_CHECK') {

      this.dropdown = true;
      this.M1page = false;
      console.log("ng onint")
    }
    if (this.module === 'PPA_CALCULATION') {
      this.M1page = true;
      this.dropdown = false;
      console.log("coming")
    }
    else {
      this.dropdown1 = true;
    }

    if (this.module === 'DOD_PRESENT_BUT_STATUS_NOT_DEATH') {
      this.DODPage = true;
      this.dropdown1 = true;
    }
    if(this.module === 'CRITICAL_FIELDS'){
      this.dropdown1 = true;
      this.Dateformatter = true;

    }
    if(this.module === 'STATUS_INCONSISTENCY'){
      this.StatusIncon= true;
      this.datamodule1 = true;
    }


  }




  processData() {
    // this.showOverlay = true;

    // console.log('tablename >', this.tabledata)
    // console.log('monthtables >', this.monthtables)

    if (this.actualModule === 'UNITS PRESENT IN PENDING STATUS' || this.module === 'PENDING_STATUS_CASES') {
      this.dropdown = false;
      this.M1page = false;
      this.datatable1();
      console.log('outer if')
    }

    if (this.actualModule === 'UNITS PRESENT IN EXIT STATUS' || this.actualModule === 'NEGATIVE UNITS PRESENT' ||
      this.actualModule === 'UNITS PRESENT IN DISCO FUNDS_ULIP' || this.actualModule === 'UNITS EQUAL TO ZERO FOR INFORCE POLICIES' ||
      this.actualModule === 'UNITS PRESENT IN REGULAR FUNDS_ULIP' || this.actualModule === 'UNITS PRESENT IN DISCO FUNDS_1M' || this.actualModule === 'UNITS PRESENT IN REGULAR FUNDS_1M') {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      }
      else {
        this.dropdown = false;
        this.dropdown1 = true;
        this.datatable2();
      }
    }


    if (this.actualModule === 'correctness of increasing and decreasing sum assured benefit valuation - NON_ULIP_PAID_UP_INDIGO' ||
      this.actualModule === 'correctness of increasing and decreasing sum assured benefit valuation - ULIP_INDIGO' ||
      this.actualModule === 'correctness of increasing and decreasing sum assured benefit valuation - NON_ULIP_INFORCE_INDIGO') {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      } else {
        this.dropdown = false;
        this.dropdown1 = true;
        this.datatable7();
      }
    }

    if (this.module === 'DUPLICATE_ENTRIES') {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      } else {
        this.dropdown = false;
        this.dropdown1 = true;
        this.datatable7();
      }
    }

    // this.actualModule === 'ULIP' || this.actualModule === 'NON_ULIP' || this.actualModule === '1E' || 
    // this.actualModule ==='1M' || this.actualModule ==='56'
    if (this.module === 'CRITICAL_FIELDS' ) {
      if (!this.Dates || !this.tablename) {
        this.messagePopup = 'Please fill the Details';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      } else {
        this.Dateformatter= true;
        this.dropdown1 = true;
        this.datatable12();
      }
    }
    if(this.module === 'CRITICAL_FIELDS_SUMMARY'){
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      } else {
        this.dropdown = true;
        this.dropdown1 = true;
        this.datatable11();
      }

    }
    if (this.actualModule === 'ULIP-18,19,21') {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      } else {
        this.dropdown = false;
        this.dropdown1 = true;
        this.datatable7();
      }
    }

    if (this.module === 'Age_mismatch_NB_EB') {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      } else {
        this.dropdown = false;
        this.dropdown1 = true;
        this.datatable7();
      }
    }

    if (this.module === 'Diff_DOB_for_same_client_ID') {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      } else {
        this.dropdown = false;
        this.dropdown1 = true;
        this.datatable7();
      }
    }

    if (this.module === 'Paid_Up_value') {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      } else {
        this.dropdown = false;
        this.dropdown1 = true;
        this.datatable7();
      }
    }
    if (this.module === '_7_BASIC_SA_BASIC_PREMIUM_POLICY_TERM_PPT_ZERO_IN_NON_SP_NULL_ZERO') {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');

      } else {
        this.dropdown = true;
        this.dropdown1 = true;
        this.datatable10();
      }
    }
    if (this.module === 'BOUNDARY_CONDITION' || this.module === 'RIDER_INCONSISTENCY' || this.module === 'BONUS_CHECK') {
    if (!this.tablename) {
      this.messagePopup = 'Please Enter Table Name';
      this.openConfirmationBox = true;
      // this.showloader = false;
      console.log('if not select');
    }

    else {
      this.dropdown = false;
      this.dropdown1 = true;
      this.datatable7();
    }
  }



    if (this.module === '_1_DOD_BLANK_FOR_DEATH_RELATED_STATUSES' || this.module === '_2_SURRENDER_DATE_BLANK_FOR_SURRENDER_RELATED_STATUSES' ||
      this.module === '_3_NON_ZERO_SURRENDER_DATE_FOR_OTHER_THAN_SURRENDER_RELATED_STATUSES' || this.module === '_4_NON_ZERO_DATE_OF_DEATH_FOR_OTHER_THAN_DEATH_RELATED_STATUSES' || this.module === '_5_FUP_BLANK' ||
      this.module === '_6_FUP_AFTER_DATE_OF_VALUATION_FOR_LAPSED_CASES' || this.module === '_8_NEGATIVE_PREMIUMS' || this.module === '_10_LA_GENDER_BLANK_NULL_INVALID_VALUE' || this.module === '_11_POLICYHOLDER_GENDER_BLANK_NULL_INVALID_VALUE'
      || this.module === '_12_DISTRIBUTION_CHANNEL_IS_BLANK_NULL' || this.module === '_14_SMOKER_FLAG_NULL_INVALID_BLANK_2N_AND_45_V07' || this.module === '_15_RIDER_TERM_NOT_WITHIN_BASE_TERM' || this.module === '_16_SUM_ASSURED_ZERO_FOR_POLICIES_IN_PROTECTION_AND_SDF_DATA'
       || this.module === '_17_1B_MATURED_INFORCE_LUMPSUM_MATURITY_FLAG_AS_Y' || this.module === '_18_1B_MATURED_LUMPSUM_MATURITY_FLAG_AS_N_OR_NULL'|| this.module === '_19_35_MATURED_INFORCE_FOR_ENDOWMENT_POLICIES' || this.module === '_20_35_MATURED_WHOLELIFE_POLICIES' 
       || this.module === '_21_POLICY_TERM_ZERO_IN_SDF_DATA') {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');
      }

      else {
        this.dropdown = false;
        this.dropdown1 = true;
        this.datatable7();
      }
    }
    if (this.module === 'PPA_CALCULATION') {
      if (!this.tablename || !this.interestrate || !this.fromdate || !this.todate) {
        this.messagePopup = 'Please Enter All Field';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');
      }

      else {
        this.M1page = true;
        this.M1page1 = false;
        this.dropdown = false;
        this.dropdown1 = false;
        this.datatable8();
      }
    }

  
    if (this.module === 'DOD_PRESENT_BUT_STATUS_NOT_DEATH') {
      if (this.table_Ulip || this.table_NonUlip || this.table_1M || this.table_Annuity || this.table_56 || this.table_1E) {
        this.DODPage = false;
        this.dropdown1 = false;

        this.datatable9();
      }
      else {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
      }
    }
    if (this.module === '_2M_Bonus' ) {
      if (!this.tablename) {
        this.messagePopup = 'Please Enter Table Name';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');
      }

      else {
        this.dropdown = false;
        this.dropdown1 = true;
        this.datatable7();
      }
    }
    
    if(this.module === 'STATUS_INCONSISTENCY'){
      if (!this.Ulip_Current_Month || !this.Ulip_Last_Month || !this.Non_Ulip_Current_Month ||!this.Non_Ulip_Last_Month || !this._1M_Current_Month || !this._1M_Last_Month
        || !this._1E_Current_Month || !this._1E_Last_Month  || !this._56_Current_Month || !this._56_Last_Month || !this.Annuity_Current_Month || !this.Annuity_Last_Month 
        ) {
        this.messagePopup = 'Please Enter the Fields';
        this.openConfirmationBox = true;
        // this.showloader = false;
        console.log('if not select');
      }

      else {
        this.StatusIncon = true;
        this.dropdown1 = true;
        this.datatable13();
      }

    }

    else {
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;

      }
    }
  }

  tablename: any;
  Dates : any;
  responseData;
  showOverlay: boolean = false;
  noData: boolean = false;
  messageType; //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;
  export: boolean = false;
  count;
  displayCount: boolean = false;
  displayMessage: boolean = false;


  //  /* loader */
  //  hideloader() {
  //   this.showloader = false;
  // }

  datatable1() {
    this.showOverlay = true
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],

    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response :145', response);
        console.log('response_text 125', response.response_text);

        this.datamodule1 = response.response_text;
        console.log('this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)
        this.showOverlay = false;
        this.noData = false;
        this.input = false;
        this.M1page = false;
        this.M1page1 = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;
        // this.table2 = false;        this.input = false;

        this.isError = false;
        // this.table2 = false;
      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown2 = false;
      }
    );

  }

  datatable2() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      tablename: this.tablename

    }
    console.log('obj >>', obj);
    console.log('tablename >>', this.tablename);

    this.NU.submodule(obj).subscribe(
      (response) => {

        console.log('response_text ', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        // this.showloader = false;

        this.messageType = 'Information Message :  ';
        this.message = 'response_code : ' + response.response_code;
        this.messageDetails = response.response_message;
        this.displayMessage = true;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.input = true;
        this.isError = false;

      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown = true;
      }
    );

  }

  datatable3() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      tablename: this.tablename


    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        // this.datamodule1=response;
        console.log(' this.postdata1', this.datamodule1);
        this.openConfirmationBox = true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)
        this.showOverlay = false;
        this.showloader = false;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;

      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown = true;


      }
    );

  }

  datatable4() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      tablename: this.tablename


    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.showloader = false;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;

      },
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown = true;
      }
    );

  }
  datatable5() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      tablename: this.tablename


    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.showloader = false;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;

      }
      ,
      (error) => {
        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown = true;
      }
    );

  }
  datatable6() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      tablename: this.tablename


    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.showloader = true;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;

      },
      (error) => {

        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown = true;
      }
    );

  }

  datatable7() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      tablename: this.tablename


    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.showloader = true;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;

      },
      (error) => {

        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown = true;
      }
    );

  }
  datatable10() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      tablename: this.tablename


    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        // this.displayMessage=true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.showloader = true;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;
        this.dropdown = false;


      },
      (error) => {

        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown = true;
      }
    );
  }


  datatable8() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      tablename: this.tablename,
      interestrate: this.interestrate,
      fromdate: this.fromdate,
      todate: this.todate

    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        // this.displayMessage=true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.showloader = true;

        this.noData = false;
        this.isError = false;
        this.dropdown = false;
        this.dropdown1 = false;
        this.M1page = false;
        this.M1page1 = true;
      },
      (error) => {

        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = false;
        this.dropdown = false;
      }
    );
  }



  showAlert(response: any) {
    this.openConfirmationBox = false;
  }

  showMessage() {
    this.displayMessage = false;
  }
  exportAsCSV() {
    this.es.exportAsCSVFile(this.datamodule1, this.routerState['actualModule']);

  }

  datamodule2: any;



  // exportAsXLSX2() {
  //   this.es.exportAsCSVFile(this.datamodule2, 'dataSource');

  // }
  // exportAsXLSX3() {
  //   this.es.exportAsCSVFile(this.datamodule1, 'dataSource');
  // }
  // exportAsXLSX4() {
  //   this.es.exportAsCSVFile(this.datamodule4, 'dataSource');
  // }
  // exportAsXLSX5() {
  //   this.es.exportAsCSVFile(this.datamodule5, 'dataSource');
  // }
  // exportAsXLSX6() {
  //   this.es.exportAsCSVFile(this.datamodule6, 'dataSource');
  // }

  // displayedColumns1: string[] = ['POL_ID', 'FUND_NAMES', 'UNITS'];
  // displayedColumns2: string[] = ['POL_ID', 'FV', 'FUND_ID'];
  // displayedColumns3: string[] = ['POLICY_NUMBER', 'FUND_NAMES'];
  // displayedColumns4: string[] = ['POLICY_NUMBER', 'FUND_NAMES'];
  // displayedColumns5: string[] = ['POLICY_NUMBER', 'DOC', 'STATUS', 'SUM_UNITS'];
  // displayedColumns6: string[] = ['POL_ID', 'FND_ID', 'FIA_UNIT_QTY'];

  // selectOn: boolean = false;
  // selectOf: boolean = true;
  // onSelectedFile(event: any) {


  //   var file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
  //   // const file = event.target.files[0];
  //   this.selectedFile = file;
  //   // this.test();

  //   this.selectOn = true;
  //   this.selectOf = false;
  // }

  // handleAgeProofChange(e: any) {
  //   console.log('--->', e);
  //   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];


  //   this.selectedFile = file
  //   this.datatable8();
  //   //var file = e.target.files[0];

  //   console.log(file);
  //   var pattern = /image-*/;
  //   var reader = new FileReader();

  // }
  // async _handleAgeProofReaderLoaded(e: any) {
  //   let reader = e.target;
  //   console.log('e', e);

  // }

  // _base64ToArrayBuffer(base64: string) {
  //   var binary_string = window.atob(base64);
  //   var len = binary_string.length;
  //   var bytes = new Uint8Array(len);
  //   for (var i = 0; i < len; i++) {
  //     bytes[i] = binary_string.charCodeAt(i);
  //   }
  //   return bytes.buffer;
  // }

  // dataURLtoFile(dataurl: any, filename: any) {

  //   var arr = dataurl.split(','),
  //     mime = arr[0].match(/:(.*?);/)[1],
  //     bstr = atob(arr[1]),
  //     n = bstr.length,
  //     u8arr = new Uint8Array(n);

  //   while (n--) {
  //     u8arr[n] = bstr.charCodeAt(n);
  //   }

  //   return new File([u8arr], filename, { type: mime });
  // }

  i: any;
  it: any;
  abc: any;

  // let url = '/core/NegativeUnits';    //TO
  // let url="../../assets/valuation.json"

  // datatable8() {
  //   const formObj = new FormData();
  //   formObj.append("module_id", this.moduleId);
  //   formObj.append("submodule_id", this.subModuleId);
  //   formObj.append("requested_by", 'Admin');
  //   formObj.append("request_action", '1');
  //   formObj.append("module", this.routerState['module']);
  //   formObj.append("actualModule", this.routerState['actualModule'],);
  //   formObj.append("moduleId", this.routerState['moduleId']);
  //   formObj.append("tablename", this.tablename);
  //   formObj.append("file", this.selectedFile, this.selectedFile.name);
  //   // const obj = {name: 'Tom'}
  //   var xhr = new XMLHttpRequest();
  //   xhr.withCredentials = true;
  //   var forMessage = this.messageDetails;
  //   console.log('check for message 685', this.responseText);
  //   xhr.addEventListener("readystatechange", function () {
  //     if (this.readyState === 4) {
  //       console.log(xhr, "xhr");
  //       if (xhr.status === 200) {
  //         var datamodule1 = JSON.parse(xhr.responseText);
  //         // localStorage.setItem('datamodule1',JSON.stringify(this.responseText));
  //         localStorage.setItem('datamodule1', JSON.stringify(datamodule1));
  //         console.log(datamodule1);
  //       }
  //       let ref = document.getElementById('cancel');
  //       ref?.click();
  //     }
  //   }),
  //     // xhr.open("GET", '../../assets/valuation.json')
  //     xhr.open("POST", '/core/NegativeUnits');
  //   xhr.send(formObj);
  //   const dataT = JSON.parse(localStorage.getItem('datamodule1'));
  //   // this.data1 = dataT
  //   var data1 = dataT
  //   this.abc = data1
  //   this.M1page = false;
  //   this.M1page1 = true;
  //   this.dropdown1 = false;
  //   this.dropdown2 = false;
  //   // var msgSlice;

  // }

  exportAsCSV1() {
    // console.log("this.abc type",typeof(this.abc))
    this.es.exportAsCSVFile(this.abc.response_text, this.routerState['actualModule']);
    // this.openConfirmationBox = true;
    // this.messagePopup = response.response_message;
    // console.log("this.messagePopup", this.messagePopup)


  }




  datatable9() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      moduleId: this.routerState['moduleId'],
      table_Ulip: this.table_Ulip,
      table_Non: this.table_NonUlip,
      table_1M: this.table_1M,
      table_Annuity: this.table_Annuity,
      table_56: this.table_56,
      table_1E: this.table_1E,



    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.showloader = true;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;

      },
      (error) => {

        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown2 = false;
        this.DODPage = true;
      }
    );

  }


  datatable11() {
    this.showOverlay = true
    this.showloader = true;
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      tablename: this.tablename


    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        this.Data = response.response_text;
        console.log(this.Data, "maa")
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        // this.displayMessage=true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.showloader = true;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.showData = true;   
        this.isError = false;
        this.dropdown = false;

      },
      (error) => {

        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.dropdown = true;
      }
    );
  }


  datatable12() {
    this.showOverlay = true
    this.showloader = true;
    
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      // moduleId: this.routerState['moduleId'],
      Date: this.Dates,
      tablename: this.tablename


    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        // this.displayMessage=true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.showloader = true;

        this.noData = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;
        this.dropdown = false;
        this.Dateformatter = false


      },
      (error) => {

        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        this.Dateformatter = true;
      }
    );
  }

 
  datatable13(){
    this.showOverlay = true
    this.showloader = true;
    
    let obj = {
      module_id: this.moduleId,
      submodule_id: this.subModuleId,
      requested_by: 'Admin',
      request_action: 1,
      module: this.routerState['module'],
      actualModule: this.routerState['actualModule'],
      Ulip_Current_Month: this.Ulip_Current_Month,
    Ulip_Last_Month : this.Ulip_Last_Month ,
    Non_Ulip_Current_Month : this.Non_Ulip_Current_Month ,
    Non_Ulip_Last_Month : this. Non_Ulip_Last_Month ,
    _1M_Current_Month : this._1M_Current_Month ,
    _1M_Last_Month : this._1M_Last_Month ,
    _1E_Current_Month: this._1E_Current_Month,
    _1E_Last_Month : this._1E_Last_Month ,
    _56_Current_Month : this._56_Current_Month ,
    _56_Last_Month : this. _56_Last_Month ,
    Annuity_Current_Month: this.Annuity_Current_Month,
    Annuity_Last_Month : this.Annuity_Last_Month ,
    // Rinn_Raksha_Current_Month : this.Rinn_Raksha_Current_Month ,
    // Rinn_Raksha_Last_Month: this.Rinn_Raksha_Last_Month,
      
    }
    console.log('obj >>', obj);
    this.NU.submodule(obj).subscribe(
      (response) => {
        console.log('response_text 125', response.response_text);
        this.datamodule1 = response.response_text;
        console.log(' this.datamodule1', this.datamodule1);
        this.openConfirmationBox = true;
        // this.displayMessage=true;
        this.messagePopup = response.response_message;
        console.log("this.messagePopup", this.messagePopup)

        this.showOverlay = false;
        this.dropdown1 = false;
        this.dropdown2 = true;
        this.isError = false;
        this.dropdown = false;
        this.Dateformatter = false
        this.StatusIncon = false


      },
      (error) => {

        this.showOverlay = false;
        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.isError = true;
        this.displayMessage = true;
        this.dropdown1 = true;
        
      }
    );

  }
  

}





