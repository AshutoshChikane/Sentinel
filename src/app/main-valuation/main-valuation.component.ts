import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../dialog/message/message.component";
import { ModuleService } from '../Service/module.service';
import { ProcessService } from '../Service/process.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DashboardService } from '../Service/dashboard.service';
import { stringify } from '@angular/compiler/src/util';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { formatDate } from '@angular/common';
import { NegativeUnitService } from '../Service/negative-unit.service';

@Component({
  selector: 'app-main-valuation',
  templateUrl: './main-valuation.component.html',
  styleUrls: ['./main-valuation.component.scss']
})
export class MainValuationComponent implements OnInit {


  curr_projects = [
    'UNITS_INCONSISTENCY', 'STATIC_FIELDS', 'CRITICAL_FIELDS', 'BOUNDARY_CONDITION', 'PPA_CALCULATION',
    'UNITS_PRESENT_IN_PENDING_STATUS', 'UNITS_PRESENT_IN_EXIT_STATUS', 'NEGATIVE_UNITS_PRESENT',
    'UNITS_PRESENT_IN_DISCO_&_REGULAR_FUND', 'UNITS_EQUAL_TO _ZERO_IN_INFORCE_POLICES', '1M_UNITS_PRESENT_IN_DISCO_&_REGULAR_FUNDS','CORRECTNESS_OF_INCREASING_AND_DECREASING_SUM_ASSURED_BENEFIT_VALUATION',
    '_2M_Bonus'

  ];

  curr_projects_map = {

    //VALUATION DATA
    'UNITS_INCONSISTENCY': 301,
    'STATIC_FIELDS': 302,
    'CRITICAL_FIELDS': 303,
    'BOUNDARY_CONDITION': 304,
    'PPA_CALCULATION': 305,
    'CORRECTNESS_OF_INCREASING_AND_DECREASING_SUM_ASSURED_BENEFIT_VALUATION':306,
    'LTR_PROCESS_STATUS_CHANGE' : 307,
    'DUPLICATE_ENTRIES' :308,
    'RIDER_INCONSISTENCY' : 309,
    'DOD_PRESENT_BUT_STATUS_NOT_DEATH' : 310,
    'CRITICAL_FIELDS_SUMMARY':311,
    'STATIC_FIELDS_SUMMARY':312,
    'Age_mismatch_NB_EB':313,
    'Diff_DOB_for_same_client_ID':314,
    '_2M_Bonus':315,
    'Paid_Up_value':316,
    'STATUS_INCONSISTENCY': 317,
    'NEGATIVE_ANNUALIZED_PREMIUM' :318,
    'RIDER_PPT_GREATER_THAN_POLICY_TERM':319,
    'DOC_AND_FUP_DIFFERENT_GREATER_THAN_PPT':320,
    '_1W_JL_RIDER_SA_IS_NOT_NULL_AND_RIDER_PREMIUM_IS_NULL':321,
    'PENDING_STATUS_CASES':322,
    'BONUS_CHECK':323,
    

    // 21 modules
    '_1_DOD_BLANK_FOR_DEATH_RELATED_STATUSES' : 351,
    '_2_SURRENDER_DATE_BLANK_FOR_SURRENDER_RELATED_STATUSES':352,
    '_3_NON_ZERO_SURRENDER_DATE_FOR_OTHER_THAN_SURRENDER_RELATED_STATUSES':353,
    '_4_NON_ZERO_DATE_OF_DEATH_FOR_OTHER_THAN_DEATH_RELATED_STATUSES':354,
    '_5_FUP_BLANK':355,
    '_6_FUP_AFTER_DATE_OF_VALUATION_FOR_LAPSED_CASES':356,
    '_7_BASIC_SA_BASIC_PREMIUM_POLICY_TERM_PPT_ZERO_IN_NON_SP_NULL_ZERO':357,
    '_8_NEGATIVE_PREMIUMS':358,
    '_9_DEATH_SURRENDER_CHANGES_IN_FUP_DOD_DOI_SURRENDER_DATES': 359,
    '_10_LA_GENDER_BLANK_NULL_INVALID_VALUE' : 360,
    '_11_POLICYHOLDER_GENDER_BLANK_NULL_INVALID_VALUE': 361,
    '_12_DISTRIBUTION_CHANNEL_IS_BLANK_NULL': 362,
    '_13_ANNUITY_OPTION_CHANGED_FOR_POLICIES' : 363,
    '_14_SMOKER_FLAG_NULL_INVALID_BLANK_2N_AND_45_V07' : 364,
    '_15_RIDER_TERM_NOT_WITHIN_BASE_TERM': 365,
    '_16_SUM_ASSURED_ZERO_FOR_POLICIES_IN_PROTECTION_AND_SDF_DATA' : 366,
    '_17_1B_MATURED_INFORCE_LUMPSUM_MATURITY_FLAG_AS_Y' : 367,
    '_18_1B_MATURED_LUMPSUM_MATURITY_FLAG_AS_N_OR_NULL': 368,
    '_19_35_MATURED_INFORCE_FOR_ENDOWMENT_POLICIES': 369,
    '_20_35_MATURED_WHOLELIFE_POLICIES': 370,
    '_21_POLICY_TERM_ZERO_IN_SDF_DATA': 371,

    };

    Curr_Summary={
 //             Summary 
 'STATIC_FIELDS_SUMMARY1':501,
 'CRITICAL_FIELDS_SUMMARY1':502,
 
    };

  QCloder: boolean;


  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private processService: ProcessService,
    private dash: DashboardService,
    // private ngZone : NgZone,
    public dialog: MatDialog,
    private negative :NegativeUnitService
  ) {  }

  moduleId =0 ;
  subModuleId = 0;
  moduleName = '';
  moduleClicked: boolean = false;
  actualModule = '';
  userName_ = sessionStorage.getItem('userName');
  userid = this.userName_

  menuenter(module, actualModule_, subModuleId) {
    console.log('DQ module >>', module);
    this.moduleName = module;
    this.actualModule = actualModule_;
    // this.moduleClicked = true;
    console.log('moduleClicked >>', this.moduleClicked);
    this.moduleId = this.curr_projects_map[module];
    // this.startDate= '';
    this.subModuleId = subModuleId;

    var params = {
      'module': module,
      'moduleId': this.moduleId,
      'moduleName': this.moduleName,  
      'actualModule': this.actualModule,
      'subModuleId': this.subModuleId
    }
   
    // add the module if you not access start date and end date 
    if (module === 'LOYALTY_ADDITIONS_ULIP_PRODUCTS' || module === 'FUNDING_UNDER_PPWB_RIDER_CASES_ULIP' ||
      module === 'MATURITY_OVER_BUT_STATUS_NOT_CHANGED' || module === 'POLICIES_MATURED_BUT_NOT_IN_DUE_LIST' ||
      module === 'DISCO_CHG_GI_BONUS_AND_FMC_UNDER_FLEXI_SMART_PLUS_1M' || module === '56_36_07_CALCULATIONS' ||
      module === 'RIDER_SA_CAPPING' || module === 'DEFERRED_MATURITY_PAYOUTS' || module === 'ANNUITY_SKIPPED_CASES' ||
      module === 'CORRECTIVENESS_OF_CHECKING_INCREASING_SUM_ASSURED_BENEFIT' || module === 'LTR_PROCESS_STATUS_CHANGES' ||
      module === 'DPF_LOCK_IN' || module === 'CORRECTNESS_CHECKING_OF_INCREASING_ANNUITY_OPT' ||
      module === 'ADDITIONAL_UNITIZATION_AT_THE_TIME_OF_RETRIVAL' || module === 'OD_AMT_PRESENT_IN_INFORCE_CASES' ||
      module === 'MO' || module === 'ANNUAL_MORTALITY_GREATER_THAN_ANNUAL_PREMIUM' ||
      module === 'CORRECTNESS_CHECKING_OF_GUARANTEED_ADDITIONS' || module === 'DOC_FUP_DATE_MISMATCH' ||
      module === 'JOINT_BORROWER_RINNRAKSHA' || module === 'RIDER_TERM_OVER_BUT_STATUS_NOT_CHANGED' ||
      module === 'POLICY_STATUS_EXPIRED_BUT_RIDER_STATUS_INFORCE' || module === 'SB_SKIPPED_CASES' ||
      //new update
      module === 'SB_SKIPPED_CASES_NEW' || module === 'DEPOSIT_PRESENT_BUT_NOT_ALLOCATED' || module === 'ADDITIONAL_UNITIZATION_AT_THE_TIME_OF_REVIVAL'
      || module === 'CORRECTNESS_OF_INCREASING_AND_DECREASING_SUM_ASSURED_BENEFIT'
      || module === 'LOYALTY_ADDITION_NOT_APPLIED_ON_THRESHOLD_DATES' || module === 'EXTRANNEOUS_OD_AMOUNT'
      || module === 'STATUS_NOT_MOVED_TO_LTR_POST_LOCK_IN_PERIOD_OVER' || module === 'CLIENT_STATUS_DEATH_BUT_POLICY_STATUS_IS_INFORCE'
      || module === 'CORRECTNESS_OF_AMOUNT_POLICY_DEPOSIT_PRESENT_IN_POLICY' || module === 'PREMIUM_HOLIDAY_UNDER_PRODUCT_56_FLEXI_SMART'
      || module === 'CASES_WHERE_PREMIUM_PAYING_TERM_IS_MORE_THAN_POLICY_TERM' || module === 'CLIENT_ID_MERGER' || module === 'CI_RIDER_PREMIUM_IS_ZERO_FOR_IN_FORCE_CASES'
      || module === 'SB_NOT_PAID_POST_REVIVAL' || module === 'MORTLITY_GOT_DEDUCTED_IN_WAIVER_POLICIES' || module === 'UNITS_EQUAL_TO_ZERO_FOR_INFORCE_POLICIES' || module === 'SUM_ASSURED_NOT_CHANGED_POST_REVIVAL'
      || module === 'SB_PAID_FOR_RPU_CASES' || module === 'GRACE_PERIOD_IS_OVER_BUT_POLICY_NOT_LAPSED' || module === 'POLICY_STATUS_MOVED_BACK_FROM_EXIT_TO_INFORCE'|| module === 'FUND_VALUE_QUERY' 
      || module === 'UNCLAIM'  || module ==='UNCLAIM_') {
      this.router.navigate(['fetch-all-data'], { state: params });
    }
     
    else {
      this.router.navigate(['fetch-data'], { state: params });
    }
  }


  spliced_data = [];
  page_event = { pageIndex: 0, pageSize: 0 }

  @ViewChild('messageDlg', { static: false })
  messageDlg: MessageDialogComponent;


  ngOnInit() {

  }

  gotoPage(pageName: string, ele: string) {
    sessionStorage.setItem('name', ele)
    this.router.navigate([pageName])
  }

  projectInfo = {};
  startDate: string;
  endDate: string;
  policyData_;
  showOverlay = false;
  exportTo;
  displayColumns;
  messageType; //06-05-21
  displayMessage = false;  //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;



  // VALUATION

  menuenteri(module, actualModule_, subModuleId) {
    console.log('VALUATION DATA >>', module);
    this.moduleName = module;
    this.actualModule = actualModule_;
    // this.moduleClicked = true;
    console.log('moduleClicked >>', this.moduleClicked);
    this.moduleId = this.curr_projects_map[module];
    console.log(this.moduleId, "id");
    // this.startDate= '';
    this.subModuleId = subModuleId;

    var params = {
      'module': module,
      'moduleId': this.moduleId,
      'moduleName': this.moduleName,
      'actualModule': this.actualModule,
      'subModuleId': this.subModuleId
    }


    //Add the table format and export to excel
    //    
    if (module === 'UNITS_INCONSISTENCY' ||  module === 'CORRECTNESS_OF_INCREASING_AND_DECREASING_SUM_ASSURED_BENEFIT_VALUATION' || module ==='CRITICAL_FIELDS'  || module === 'CRITICAL_FIELDS_SUMMARY'
    || module === 'RIDER_INCONSISTENCY' || module === 'BOUNDARY_CONDITION'  || module === 'LTR_PROCESS_STATUS_CHANGE' || module === 'DUPLICATE_ENTRIES'   ||module === 'PPA_CALCULATION' ||module == 'Age_mismatch_NB_EB'
    ||module === 'Diff_DOB_for_same_client_ID' || module === '_2M_Bonus' || module === 'Paid_Up_value' || module ==='PENDING_STATUS_CASES' || module === 'BONUS_CHECK') {
      this.router.navigate(['VALUATION'], { state: params });
      console.log("if");

    }
    else if(module === 'DOD_PRESENT_BUT_STATUS_NOT_DEATH' || module === '_1_DOD_BLANK_FOR_DEATH_RELATED_STATUSES' || module === '_2_SURRENDER_DATE_BLANK_FOR_SURRENDER_RELATED_STATUSES' || 
    module ==='_3_NON_ZERO_SURRENDER_DATE_FOR_OTHER_THAN_SURRENDER_RELATED_STATUSES' || module === '_4_NON_ZERO_DATE_OF_DEATH_FOR_OTHER_THAN_DEATH_RELATED_STATUSES' || module ==='_5_FUP_BLANK'||
    module ==='_6_FUP_AFTER_DATE_OF_VALUATION_FOR_LAPSED_CASES' || module === '_7_BASIC_SA_BASIC_PREMIUM_POLICY_TERM_PPT_ZERO_IN_NON_SP_NULL_ZERO' || module === '_8_NEGATIVE_PREMIUMS' || 
    module === '_10_LA_GENDER_BLANK_NULL_INVALID_VALUE' || module === '_11_POLICYHOLDER_GENDER_BLANK_NULL_INVALID_VALUE' || module === '_12_DISTRIBUTION_CHANNEL_IS_BLANK_NULL' || module === '_14_SMOKER_FLAG_NULL_INVALID_BLANK_2N_AND_45_V07'
    || module === '_15_RIDER_TERM_NOT_WITHIN_BASE_TERM' || module === '_16_SUM_ASSURED_ZERO_FOR_POLICIES_IN_PROTECTION_AND_SDF_DATA' || module=== '_17_1B_MATURED_INFORCE_LUMPSUM_MATURITY_FLAG_AS_Y' || module === '_18_1B_MATURED_LUMPSUM_MATURITY_FLAG_AS_N_OR_NULL' ||
    module ==='_19_35_MATURED_INFORCE_FOR_ENDOWMENT_POLICIES' || module === '_20_35_MATURED_WHOLELIFE_POLICIES' || module === '_21_POLICY_TERM_ZERO_IN_SDF_DATA' || module === 'STATUS_INCONSISTENCY'){
      this.router.navigate(['VALUATION'], { state: params});
  
    }
    
    else{
    this.router.navigate(['valuation-data'], { state: params });
    console.log("else if");
    }
  }


  SummaryTable(module, actualModule_, subModuleId){
    this.moduleName = module;
    this.actualModule = actualModule_;    
    this.subModuleId = subModuleId;
    this.moduleId = this.Curr_Summary[module];
    console.log('moduleClicked >>', this.moduleClicked);
    console.log(this.moduleId, "id");
   
    
    var params = {
      'module': module,
      'moduleId': this.moduleId,
      'moduleName': this.moduleName,
      'actualModule': this.actualModule,
      'subModuleId': this.subModuleId,
    }
    
    if(module === 'STATIC_FIELDS_SUMMARY1' || module === 'CRITICAL_FIELDS_SUMMARY1'|| module === 'UNITS_INCONSISTENCY_SUMMARY'){
      this.router.navigate(['val-summary'], { state: params});
     
    }

  }

  backPage(){
  this.router.navigate(['ChooseDashboardComponent']);
  }

  // showMISWindow(){
  //   this.router.navigate(['mis']);
  // }

}



