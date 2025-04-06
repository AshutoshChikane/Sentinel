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
import * as Module from 'module';
import { ValDashboardService } from '../Service/val-dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  // curr_project = [
  //   'DISCO_CHARGES',
  //   'ADMIN_CHARGES',
  //   'ALLOCATION_CHARGES',
  //   'NOT_IN_DUE_LIST',
  //   'STATUS_NOT_CHANGES',
  //   'ADMIN_SKIPPED_CASES',
  //   'MORTALITY_SKIPPED_CASES',
  //   'MORTALITY_CHARGES_UNITIZATION',
  //   'ADMIN_CHARGES_UNITIZATION',
  //   'ALLOCATION_AMOUNT_UNITIZATION'

  // ];

  //   curr_project_map = {
  //     //QC MODULE
  // 'DISCO_CHARGES':201,
  // 'ADMIN_CHARGES':202,
  // 'ALLOCATION_CHARGES':203,
  // 'NOT_IN_DUE_LIST':204,
  // 'STATUS_NOT_CHARGES':205,
  // 'ADMIN_SKIPPED_CASES':206,
  // 'MORTALITY_SKIPPED_CASES':207,
  // 'MORTALITY_CHARGES_UNITIZATION':208,
  // 'ADMIN_CHARGES_UNITIZATION':209,
  // 'ALLOCATION_AMOUNT_UNITIZATION':210

  //   };


  curr_projects = [
    'DISCONTINUANCE_CHARGES', 'ADMIN_CHARGES', 'ALLOCATION_CHARGES', 'ADMIN_SKIPPED_CASES',
    'MORTALITY_CHARGES_SKIPPED_CASES', 'MATURITY_OVER_BUT_STATUS_NOT_CHANGED', 'MORTALITY_CHARGES_UTILIZATION',
    'ADMIN_CHARGES_UTILIZATION', 'POLICIES_MATURED_BUT_NOT_IN_DUE_LIST', 'DEPOSIT_PRESENT_BUT_NOT_ALLOCATED',
    'ANNUITY_SKIPPED_CASES', 'NON_ULIP_INCREASING_SUMASSURED_BENEFITS', 'SB_SKIPPED_CASES',
    'ADDITIONAL_UNITIZATION_AT_THE_TIME_OF_REVIVAL', 'DEFERRED_MATURITY_PAYOUTS',
    'c', 'LOYALTY_ADDITIONS_ULIP_PRODUCTS', 'REBALANCING_PRODUCTS',
    'REBALANCING_SKIPPED_CASES', 'RIDER_SA_CAPPING', 'JOINT_BORROWER_RINNRAKSHA',
    'FUNDING_UNDER_PPWB_RIDER_CASES_ULIP', 'NEGATIVE_UNIT_PRESENT',
    'JOINT_BORROWER', 'UNIT_PRESENT_IN_EXIT_STATUS', 'UNIT_PRESENT_IN_PENDING_STATUS',
    'UNIT_PRESENT_IN_DISCO_AND_FUNDS',
    'Daily_report_tracker', 'Weekly_report_tracker', 'Monthly_report_tracker',
    'UNITS_INCONSISTENCY', 'STATIC_FIELDS', 'CRITICAL_FIELDS', 'BOUNDARY_CONDITION', 'PPA_CALCULATION',
    'UNITS_PRESENT_IN_PENDING_STATUS', 'UNITS_PRESENT_IN_EXIT_STATUS', 'NEGATIVE_UNITS_PRESENT',
    'UNITS_PRESENT_IN_DISCO_&_REGULAR_FUND', 'UNITS_EQUAL_TO _ZERO_IN_INFORCE_POLICES', '1M_UNITS_PRESENT_IN_DISCO_&_REGULAR_FUNDS', 'CORRECTNESS_OF_INCREASING_AND_DECREASING_SUM_ASSURED_BENEFIT_VALUATION',
    'LOAN_AMOUNT_PRESENT_IN_EXIT_CASES', 'Summary', 'ANNUITY_CERTAIN'

  ];

  curr_projects_map = {
    //DATA QUALITY 
    //Daily module
    'ALLOCATION_CHARGES': 3,
    'MORTALITY_CHARGES': 25,
    'DISCONTINUANCE_CHARGES': 1,
    'MATURITY_OVER_BUT_STATUS_NOT_CHANGED': 6,
    'ADMIN_CHARGES': 2,
    'ADMIN_SKIPPED_CASES': 4,
    'MORTALITY_CHARGES_SKIPPED_CASES': 5,
    'ALLOCATION_CHARGES_UNITIZATION': 23,
    'MORTALITY_CHARGES_UTILIZATION': 7,
    'ADMIN_CHARGES_UTILIZATION': 8,
    'POLICIES_MATURED_BUT_NOT_IN_DUE_LIST': 9,
    'DEPOSIT_PRESENT_BUT_NOT_ALLOCATED': 10,
    'STATUS_NOT_LAPSED_AFTER_GRACE_PERIOD': 72,
    'LTR_NOT_PROCEED_AFTER_LOCK-IN-PERIOD': 73,
    'SB_SKIPPED_CASES': 74,
    'UNCLAIM_': 76,
    

    //weekly module
    'SB_SKIPPED_CASES_OLD': 13,
    'ANNUITY_SKIPPED_CASES': 11,
    'SB_SKIPPED_CASES_NEW': 12,
    'ADDITIONAL_UNITIZATION_AT_THE_TIME_OF_REVIVAL': 14,

    //monthly module
    'CORRECTNESS_OF_INCREASING_AND_DECREASING_SUM_ASSURED_BENEFIT': 31,
    'DEFERRED_MATURITY_PAYOUTS': 32,
    'RIDER_SA_CAPPING': 33,
    'LTR_PROCESS_STATUS_CHANGES': 34,
    'CORRECTNESS_OF_LOYALTY_ADDITIONS_UNDER_ULIP_PRODUCTS': 35,
    'LOYALTY_ADDITION_NOT_APPLIED_ON_THRESHOLD_DATES': 36,
    'CORRECTNESS_OF_FUNDING_UNDER_WAIVER_CASES': 37,
    'FUNDING_NOT_DONE_UNDER_WAIVER_CASES': 38,
    'CORRECTNESS_OF_REBALANCING_EVENTS': 39,
    'REBALANCING_SKIPPED_CASES': 40,
    '_22_CORRECTNESS_CHECKING_OF_INCREASING_ANNUITY_OPT': 41,
    'RIDER_TERM_OVER_BUT_STATUS_NOT_CHANGED': 42,
    'PPA_CALCUATION_UNDER_FLEXI_SMART': 44,
    'FUND_VALUE_CALCUATION_UNDER_1M_FLEXI_SMART_PLUS': 45,
    'DOC_FUP_DATE_MISMATCH': 46,
    'EXTRANNEOUS_OD_AMOUNT': 47,
    'STATUS_NOT_MOVED_TO_LTR_POST_LOCK_IN_PERIOD_OVER': 48,
    'CLIENT_STATUS_DEATH_BUT_POLICY_STATUS_IS_INFORCE': 49,
    'CORRECTNESS_OF_AMOUNT_POLICY_DEPOSIT_PRESENT_IN_POLICY': 50,
    'PREMIUM_HOLIDAY_UNDER_PRODUCT_56_FLEXI_SMART': 51,
    'UNCLAIM': 77,
    'LOAN_AMOUNT_PRESENT_IN_EXIT_CASES': 52,
    '2W_PRODUCT_INCREASING_ANNUITY_OPTION_1.5_&_1.6': 53,
    'FULL_PREMIUM_NOT_RECEIVED_BUT_STATUS_MOVED_TO_PAID_UP': 54,
    'MINIMUM_PREMIUM_NOT_RECEIVED_BUT_STATUS_MOVED_TO_RPU': 55,
    'PENDING_ACTIVITY': 56,
    'INCREASING_ANNUITY': 57,
    'PAID_UP_VALUE': 58,
    'JOINT_BORROWER': 102,
    'CORRECTNESS_OF_SA_UNDER_SAMF_PRODUCTS': 59,
    'PPT_PT_FOR_LPPT': 60,
    '2M_CASH_BONUS': 151,
    'ANNUITY_SKIPPED_22_2W_2R': 153,
    '_2M_PRODUCT_PREMIUN_CHECK': 154,
    '_2W_CORRECTNESS_CHECKING_OF_COMPOUNDING_INTEREST_OPT_1.8_&_1.9': 155,
    'DECREASING_SUM_ASSURED': 156,
    'PPT_IS_GREATER_THAN_POLICY_TERM': 157,
    'MINOR_TO_MAJOR_CORRECTNESS': 158,
    'DEFERRED_ANNUITY_SKIP_DUE_CHECK': 159,
    'GUARANTEED_ADDITION': 160,
    'LOYALTY_SKIP': 161,
    'LOYALTY_CORRECTNESS': 162,
    'FULL_PREMIUM_RECEIVED_BUT_STATUS_MOVED_TO_RPU_LAPSED_PP': 163,
    'Annuity_skip_extraction_for_the_month': 164,
    'Correctness_of_SA_under_SAMF_Products_ulip': 165,
    'ANNUITY_CERTAIN': 166,
    'CASH_BONUS_DUE_SKIP':167,

    // Miscellaneous
    'FUND_VALUE_QUERY': 601,
    'ADMIN_DUPLICATE_CHARGES': 602,
    'PROBABLE_LTR': 603,
    'PROBABLE_SB': 604,
    'PROBABLE_MATURITY': 605,
    'POLICY_STATUS_EXPIRED_BUT_RIDER_STATUS_INFORCE': 43,
    'MORTALITY_DUPLICATE_CHARGES': 606,
    'VESTING_OF_ANNUITY_POLICY_PENSION_PRODUCT_1H_AND_1E': 152,
    'EMR_DURATION_PPT': 607,
    'Payout_process_Amount_in_OD': 608,

    //Adhoc
    'CORRECTNESS_CHECKING_OF_GUARANTEED_ADDITIONS': 61,
    'CASES_WHERE_PREMIUM_PAYING_TERM_IS_MORE_THAN_POLICY_TERM': 62,
    'CLIENT_ID_MERGER': 63,
    'CI_RIDER_PREMIUM_IS_ZERO_FOR_IN_FORCE_CASES': 64,
    'SB_NOT_PAID_POST_REVIVAL': 65,
    'MORTLITY_GOT_DEDUCTED_IN_WAIVER_POLICIES': 66,
    'UNITS_EQUAL_TO_ZERO_FOR_INFORCE_POLICIES': 67,
    'SUM_ASSURED_NOT_CHANGED_POST_REVIVAL': 68,
    'SB_PAID_FOR_RPU_CASES': 69,
    'GRACE_PERIOD_IS_OVER_BUT_POLICY_NOT_LAPSED': 70,
    'POLICY_STATUS_MOVED_BACK_FROM_EXIT_TO_INFORCE': 71,

    //Dashboard table && Report Tracker
    'Daily_report_tracker': 213,
    'Weekly_report_tracker': 214,
    'Monthly_report_tracker': 215,
    'Summary': 901,

    // Joint Borrower - Rinnraksha
    'NEGATIVE_UNIT_PRESENT': 101,
    'UNIT_PRESENT_IN_EXIT_STATUS': 103,
    'UNIT_PRESENT_IN_PENDING_STATUS': 104,
    'UNIT_PRESENT_IN_DISCO_AND_FUNDS': 105,

    //VALUATION DATA
    'UNITS_INCONSISTENCY': 301,
    'STATIC_FIELDS': 302,
    'CRITICAL_FIELDS': 303,
    'BOUNDARY_CONDITION': 304,
    'PPA_CALCULATION': 305,
    'CORRECTNESS_OF_INCREASING_AND_DECREASING_SUM_ASSURED_BENEFIT_VALUATION': 306,
    'LTR_PROCESS_STATUS_CHANGE': 307,
    'DUPLICATE_ENTRIES': 308,
    'RIDER_INCONSISTENCY': 309,
    'DOD_PRESENT_BUT_STATUS_NOT_DEATH': 310,


    //daily reports
    'ADMIN_CHARGES_Report':401,
    'ADMIN_UNIT_REPORT':402,
    'ADMIN_SKIPPED_CASES_REPORT':403,
    'ALLOCATION_CHARGES_REPORT':404,
    'ALLOCATION_UNIT_REPORT':405,
    'DISCO_CHARGES_ULIP_REPORT':406,
    'MORTALITY_CHARGES_REPORT':407,
    'NOT_IN_DUE_LIST_REPORT':408,
    'NOT_LAPSED_REPORT':409,
    'MORTALITY_UNITIZATION_REPORT':410,
    'SB_SKIP_REPORT':411,
    'STATUS_NOT_CHANGE_REPORT':412








  };

  QCloder: boolean;

  constructor(
    private router: Router,
    private moduleService: ModuleService,
    private processService: ProcessService,
    private dash: DashboardService,
    private valDash: ValDashboardService,
    // private ngZone : NgZone  ,
    public dialog: MatDialog
  ) {

  }

  moduleId = 0;
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

    console.log("params:",params)
    // add the module if you not access start date and end date (derect process)
    if (module === 'LOYALTY_ADDITIONS_ULIP_PRODUCTS' || module === 'FUNDING_UNDER_PPWB_RIDER_CASES_ULIP' ||
      module === 'MATURITY_OVER_BUT_STATUS_NOT_CHANGED' || module === 'POLICIES_MATURED_BUT_NOT_IN_DUE_LIST' ||
      module === 'DISCO_CHG_GI_BONUS_AND_FMC_UNDER_FLEXI_SMART_PLUS_1M' || module === '56_36_07_CALCULATIONS' ||
      module === 'RIDER_SA_CAPPING' || module === 'DEFERRED_MATURITY_PAYOUTS' || module === 'ANNUITY_SKIPPED_CASES' ||
      module === 'CORRECTIVENESS_OF_CHECKING_INCREASING_SUM_ASSURED_BENEFIT' || module === 'LTR_PROCESS_STATUS_CHANGES' ||
      module === 'DPF_LOCK_IN' || module === '_22_CORRECTNESS_CHECKING_OF_INCREASING_ANNUITY_OPT' ||
      module === 'ADDITIONAL_UNITIZATION_AT_THE_TIME_OF_RETRIVAL' || module === 'OD_AMT_PRESENT_IN_INFORCE_CASES' ||
      module === 'MO' || module === 'ANNUAL_MORTALITY_GREATER_THAN_ANNUAL_PREMIUM' ||
      module === 'CORRECTNESS_CHECKING_OF_GUARANTEED_ADDITIONS' || module === 'DOC_FUP_DATE_MISMATCH' ||
      module === 'JOINT_BORROWER_RINNRAKSHA' || module === 'RIDER_TERM_OVER_BUT_STATUS_NOT_CHANGED' ||
      module === 'POLICY_STATUS_EXPIRED_BUT_RIDER_STATUS_INFORCE' || module === 'SB_SKIPPED_CASES' || module === 'MORTALITY_DUPLICATE_CHARGES' ||
      //new update
      module === 'SB_SKIPPED_CASES_NEW' || module === 'DEPOSIT_PRESENT_BUT_NOT_ALLOCATED' || module === 'ADDITIONAL_UNITIZATION_AT_THE_TIME_OF_REVIVAL'
      || module === 'CORRECTNESS_OF_INCREASING_AND_DECREASING_SUM_ASSURED_BENEFIT'
      || module === 'LOYALTY_ADDITION_NOT_APPLIED_ON_THRESHOLD_DATES' || module === 'EXTRANNEOUS_OD_AMOUNT'
      || module === 'STATUS_NOT_MOVED_TO_LTR_POST_LOCK_IN_PERIOD_OVER' || module === 'CLIENT_STATUS_DEATH_BUT_POLICY_STATUS_IS_INFORCE'
      || module === 'CORRECTNESS_OF_AMOUNT_POLICY_DEPOSIT_PRESENT_IN_POLICY' || module === 'PREMIUM_HOLIDAY_UNDER_PRODUCT_56_FLEXI_SMART'
      || module === 'CASES_WHERE_PREMIUM_PAYING_TERM_IS_MORE_THAN_POLICY_TERM' || module === 'CLIENT_ID_MERGER' || module === 'CI_RIDER_PREMIUM_IS_ZERO_FOR_IN_FORCE_CASES'
      || module === 'SB_NOT_PAID_POST_REVIVAL' || module === 'MORTLITY_GOT_DEDUCTED_IN_WAIVER_POLICIES' || module === 'UNITS_EQUAL_TO_ZERO_FOR_INFORCE_POLICIES' || module === 'SUM_ASSURED_NOT_CHANGED_POST_REVIVAL'
      || module === 'SB_PAID_FOR_RPU_CASES' || module === 'GRACE_PERIOD_IS_OVER_BUT_POLICY_NOT_LAPSED' || module === 'POLICY_STATUS_MOVED_BACK_FROM_EXIT_TO_INFORCE'
      || module === 'UNCLAIM' || module === 'UNCLAIM_' || module === 'LOAN_AMOUNT_PRESENT_IN_EXIT_CASES' || module === '2W_PRODUCT_INCREASING_ANNUITY_OPTION_1.5_&_1.6' || module === 'FULL_PREMIUM_NOT_RECEIVED_BUT_STATUS_MOVED_TO_PAID_UP' ||
      module === 'MINIMUM_PREMIUM_NOT_RECEIVED_BUT_STATUS_MOVED_TO_RPU' || module === 'PENDING_ACTIVITY' || module === 'PAID_UP_VALUE' || module === 'INCREASING_ANNUITY' || module === 'JOINT_BORROWER' || module === 'CORRECTNESS_OF_SA_UNDER_SAMF_PRODUCTS'
      || module === 'PPT_PT_FOR_LPPT' || module === '2M_CASH_BONUS' || module === 'VESTING_OF_ANNUITY_POLICY_PENSION_PRODUCT_1H_AND_1E' || module === '_2M_PRODUCT_PREMIUN_CHECK' || module === 'EMR_DURATION_PPT' || module === 'Payout_process_Amount_in_OD'
      || module === '_2W_CORRECTNESS_CHECKING_OF_COMPOUNDING_INTEREST_OPT_1.8_&_1.9' || module === 'DECREASING_SUM_ASSURED' || module === 'PPT_IS_GREATER_THAN_POLICY_TERM' || module === 'MINOR_TO_MAJOR_CORRECTNESS' || module === 'DEFERRED_ANNUITY_SKIP_DUE_CHECK'
      || module === 'GUARANTEED_ADDITION' || module === 'LOYALTY_SKIP' || module === 'FULL_PREMIUM_RECEIVED_BUT_STATUS_MOVED_TO_RPU_LAPSED_PP'
      || module === 'ANNUITY_SKIPPED_22_2W_2R' || module === 'Annuity_skip_extraction_for_the_month' || module === 'Correctness_of_SA_under_SAMF_Products_ulip'
      || module === 'ANNUITY_CERTAIN'|| module ==='CASH_BONUS_DUE_SKIP'||module === 'PIPV_Fresh_Insurance' || module==='CSC_POS_SA_Check'
      // Miscellaneous
      // || module === 'FUND_VALUE_QUERY'  || module === 'ADMIN_DUPLICATE_CHARGES' || module === 'PROBABLE_LTR'|| module ==='PROBABLE_SB'
      // ||module === 'PROBABLE_MATURITY'
    ) {
      this.router.navigate(['fetch-all-data'], { state: params });
    }
    else {
      this.router.navigate(['fetch-data'], { state: params });
    }
  }

  process = [
    'DISCO_CHARGES',
    'ADMIN_CHARGES',
    'ALLOCATION_CHARGES',
    'NOT_IN_DUE_LIST',
    'STATUS_NOT_CHANGES',
    'ADMIN_SKIPPED_CASES',
    'MORTALITY_SKIPPED_CASES',
    'MORTALITY_CHARGES_UNITIZATION',
    'ADMIN_CHARGES_UNITIZATION',
    'ALLOCATION_AMOUNT_UNITIZATION',
    '1M',
    'ULIP_BASE',
    'SB_Skipped_Cases',
    '_UNCLAIM_',
  ];

  process_map = {
    //QC MODULE
    'DISCO_CHARGES': 201,
    'ADMIN_CHARGES': 202,
    'ALLOCATION_CHARGES': 203,
    'NOT_IN_DUE_LIST': 204,
    'STATUS_NOT_CHANGES': 205,
    'ADMIN_SKIPPED_CASES': 206,
    'MORTALITY_SKIPPED_CASES': 207,
    'MORTALITY_CHARGES_UNITIZATION': 208,
    'ADMIN_CHARGES_UNITIZATION': 209,
    'ALLOCATION_AMOUNT_UNITIZATION': 210,
    'DISCO_CHARGES-1M': 211,
    'DISCO_CHARGES-ULIP_BASE': 212,
    "STATUS_NOT_LAPSED_AFTER_GRACE_PERIOD": 213,
    "LTR_NOT_PROCESSED_AFTER_LOCK-IN_PERIOD": 214,
    'SB_Skipped_Cases': 216,
    '_UNCLAIM_': 217,
    'UNCLAIM-Death': 218,
    'UNCLAIM-Maturity': 219,
    'UNCLAIM-LTR': 220,
    'UNCLAIM-Policy_Deposit_Refund': 221,
    'DEPOSITE_PRESENT_BUT_NOT_ALLOCATED-NON_ULIP': 222,
    'DEPOSITE_PRESENT_BUT_NOT_ALLOCATED-ULIP': 223,
    'MORTALITY_CHARGE-STANDARD': 224,
    'MORTALITY_CHARGE-EXTRA': 225,
    'UNCLAIM-SB': 226,
  };


  curr_process = ['PROCESS_INPUT', 'PROCESS_LOGIC', 'PROCESS_OUTPUT'];
  curr_process_map = { 'PROCESS_INPUT': 1, 'PROCESS_LOGIC': 2, 'PROCESS_OUTPUT': 3, 'PROCESS_OUTPUT_FLAG': 4, 'VIEWQCDATA': 5 };

  spliced_data = [];
  page_event = { pageIndex: 0, pageSize: 0 }

  @ViewChild('messageDlg', { static: false })
  messageDlg: MessageDialogComponent;


  ngOnInit() {
    if (this.process.length <= 6) {
      this.spliced_data = this.process.slice(0).slice(0, 6);
    }
    else {
      this.spliced_data = this.process.slice(0).slice(0, 12);
    }
    console.log('spliced_data ::', this.spliced_data);
    // this.moduleService.getModules().subscribe(data => {
    //   console.log(data)
    // }, err => {
    //   console.log(err)
    // })
  }

  pageChangeEvent(event) {
    this.page_event.pageIndex = event.pageIndex
    this.page_event.pageSize = event.pageSize
    const offset = ((event.pageIndex + 1) - 1) * event.pageSize;
    this.spliced_data = this.process.slice(offset).slice(0, event.pageSize);
  }

  filterProjectName($event) {
    this.spliced_data = this.process.filter(s => s.includes($event.target.value))
    if (!$event.target.value) {
      console.log(this.page_event)
      const offset = ((this.page_event.pageIndex + 1) - 1) * this.page_event.pageSize;
      this.spliced_data = this.process.slice(offset).slice(0, this.page_event.pageSize);
    }
  }

  gotoPage(pageName: string, ele: string) {
    sessionStorage.setItem('name', ele)
    this.router.navigate([pageName])
  }

  projectInfo = {};

  sendProjectInfo(projectName: string) {
    console.log('sendProjectInfo called :: projectName : ', projectName);
    console.log(this.process_map[projectName]);
    this.projectInfo = { 'module': projectName, 'id': this.process_map[projectName] };
    console.log(this.projectInfo);

    this.router.navigate(['process'], { state: { moduleId: this.process_map[projectName] } });

  }

  // Changes for UI  

  hideDetails;

  module; //STAMPDUTY CHANGES
  menuenters(module) {
    // console.log('menuenter ::' , module); 
    this.module = module;
    console.log('menuenter ::', this.module);
    this.moduleId = this.process_map[module];
    console.log(this.moduleId, "abc")
    this.moduleName = module;
    this.subModuleId = 0;


  }

  menuentertable(module) {
    // console.log('menuenter ::' , module); 
    this.module = module;
    console.log('menuenter ::', this.module);
    this.moduleId = this.process_map[module];
    this.moduleName = module;
    this.subModuleId = 0;

  }

  subMenuEnter(module, subModuleId) {
    console.log('subMenuEnter ::', module, subModuleId);
    this.module = module;
    this.moduleId = this.process_map[module];
    this.moduleName = module;
    this.subModuleId = subModuleId;

  }

  processQcValue;
  processId;
  dialogData;

  selectedPayout(process, val?, data?) {
    this.processQcValue = val;
    this.dialogData = data;
    console.log(process, "prooooooooooooooooooooooo");


    if (process == 'VIEWQCDATA') {
      console.log(this.module, this.moduleId, this.moduleName, process, this.subModuleId);
      this.processId = this.curr_process_map[process];
      console.log('processId >>>>', this.processId);
      var params = {
        moduleId: this.moduleId,
        module: this.module,
        process: process,
        processId: this.processId,
        subModule_id: this.subModuleId
        //processId: this.curr_process_map['PROCESS_OUTPUT_FLAG'], 
        //requested_by: 'Admin'
      };
      console.log('params::', params);
      this.router.navigate(['view-qcdata'], { state: params });
    }
    else {
      this.processId = this.curr_process_map[process];
      console.log('sendProcessInfo called :: processId : ', this.processId, 'moduleId :', this.moduleId, 'moduleName :', this.moduleName, 'subModule :', this.subModuleId);
      if ((this.moduleId === 10 && this.subModuleId === 2 && this.processId === 1) || (this.moduleId === 11 && this.subModuleId === 2 && this.processId === 1)) {
        // this.showDateTime(this.dialogData,process);
        this.dialog.open(this.dialogData);

      }
      else {
        this.showOverlay = true;
        this.sendProcessInfo(process);
      }
    }
  }
  showDateTime() {
    console.log(this.startDate);
    console.log(this.endDate);
    this.dialog.closeAll()
    this.sendProcessInfo('PROCESS_INPUT');
    // this.sendProcessInfo(data);

  }
  startDate: string;
  endDate: string;
  addStartDate(event: MatDatepickerInputEvent<Date>) {
    this.startDate = `${event.value}`;
    this.startDate = formatDate(this.startDate, "dd/MM/yyyy", "en");
  }

  addEndDate(event: MatDatepickerInputEvent<Date>) {
    this.endDate = `${event.value}`;
    this.endDate = formatDate(this.endDate, "dd/MM/yyyy", "en");
  }
  policyData_;
  showOverlay = false;
  exportTo;
  displayColumns;

  messageType; //06-05-21
  displayMessage = false;  //06-05-21
  message; //06-05-21
  isError = false;
  messageDetails;

  sendProcessInfo(process: string) {
    console.log('sendProcessInfo called :: processId : ', this.processId, 'moduleId :', this.moduleId, 'moduleName :', this.moduleName, 'subModule :', this.subModuleId);

    let paramInfo = {
      'module_id': this.moduleId,
      'request_action': this.processId,
      'requested_by': 'Admin',
      'userid': this.userid,
      'moduleName': this.moduleName,
    };
    console.log('this.moduleId', this.moduleId)
    if (this.subModuleId > 0) {
      //'subModule_id': this.subModuleId;
      paramInfo['subModule_id'] = this.subModuleId;
    }
    if ((this.startDate && this.endDate && this.moduleId === 10 && this.subModuleId === 2 && this.processId === 1) || (this.startDate && this.endDate && this.moduleId === 11 && this.subModuleId === 2 && this.processId === 1)) {
      paramInfo['endDate'] = this.endDate;
      paramInfo['startDate'] = this.startDate;

    }
    console.log('paramInfo ::', paramInfo);
    console.log('module_id', paramInfo.module_id);

    // console.log(JSON.stringify(paramInfo));

    console.log(typeof (this.moduleId));
    console.log(typeof (this.processId));

    this.QCloder = true;

    this.processService.sendProcessDetails(paramInfo, process,).subscribe(
      (response) => {
        console.log('response received ::', response);
        console.log(typeof (response));
        this.QCloder = false;

        if (typeof (response) == 'string') {
          response = JSON.parse(response);
        }
        if (response.length > 0) {
          response = response[0];
          console.log('response received #2::', response);
          //  console.log('response received #3::', response.error_code);
        }

        if (response.response_message) {
          console.log('response.response_code #1');
          this.isError = false;

          this.messageType = 'Information Message :  ';
          console.log('messageType >>', this.messageType);

          this.message = 'server [ response_code : ' + response.response_code + ' ]';
          console.log('message >>', this.message);

          this.messageDetails = response.response_message;
          console.log('messageDetails >>>', this.messageDetails);
        } else {
          console.log('response.error_code #1');
          this.isError = true;

          this.messageType = 'Error Message :  ';
          console.log('messageType >>', this.messageType);

          this.message = 'server [ error_code : ' + response.error_code + ' ]';
          console.log('message >>', this.message);

          this.messageDetails = response.error_message;
          console.log('messageDetails >>>', this.messageDetails);
          //new         
          this.displayMessage = true;
          this.showOverlay = false;
          return;

        }

        if (response) {
          //console.log('response ==>', response);
          //this.showOverlay= false;

          if (process === 'PROCESS_INPUT') {
            this.showOverlay = false;
            console.log('PROCESS_INPUT >>', response);
            this.displayMessage = true;
            //alert( response );  //TODO
          }
          else if (process === 'PROCESS_LOGIC') {
            this.showOverlay = false;
            console.log('PROCESS_LOGIC >>', response);

            console.log('PROCESS_LOGIC #2>>', response.response_text);
            this.policyData_ = response.response_text;//new
            this.displayMessage = true;


            console.log('PROCESS_LOGIC policyData_ >>>', this.policyData_);
          }
          else if (process === 'PROCESS_OUTPUT') {
            this.showOverlay = false;
            console.log('PROCESS_OUTPUT >>', response);
            // this.policyData_=response;//TODOREMOVE
            console.log('policyData_  #2>>>', this.policyData_);
            console.log('typeof policyData_ >>', typeof (this.policyData_));

            console.log('PROCESS_OUTPUT ##::', response.response_text);//new 07-05-21

            var data = response.response_text;

            if (data && data.length > 0) {
              this.policyData_ = data;
            }
            console.log('policyData_  #3>>>', this.policyData_);
            // TODO COMMENTED FOR TESTING
            if (typeof (this.policyData_) == 'string') {
              this.policyData_ = JSON.parse(this.policyData_);
            }
            var _paramData = {
              policyData: this.policyData_,
              moduleId: this.moduleId,
              processId: this.curr_process_map['PROCESS_OUTPUT_FLAG'],
              requested_by: 'Admin',
              module: this.module
              // display_columns:(this.module=='STAMP_DUTY_NON_ULIP' ) ? this.dash.stamp_duty_display_columns : ( this.module=='NON_ULIP_PRE_CHECKING' )? this.dash.pre_checking_display_columns : this.dash.ulip_display_columns
            };

            console.log('module 123>>>>', this.module)

            if (this.subModuleId > 0) {
              //'subModule_id': this.subModuleId;
              _paramData['subModule_id'] = this.subModuleId;
            }

            if (this.module == 'STAMP_DUTY_NON_ULIP' || this.module == 'STAMP_DUTY_ULIP') {
              this.router.navigate(['stampduty-dashboard'], {
                state: _paramData
              });
              console.log(_paramData);

            }
            else if (this.module == 'NON_ULIP_PRE_CHECKING' || this.module == 'ULIP_PRE_CHECKING_1M') {
              this.router.navigate(['prechecking-dashboard'], {
                state: _paramData
              });
              console.log(_paramData);
            }
            else if (this.module == 'ULIP_PRE_CHECKING') {
              this.router.navigate(['ulip-prechecking-dashboard'], {
                state: _paramData
              });
              console.log(_paramData);

            }
            else if ((this.module == 'SURVIVAL_BENEFIT' && this.subModuleId == 2)
              || (this.module == 'ANNUITY_PAYOUT' && this.subModuleId == 2)) {
              this.router.navigate(['duelist-dashboard'], {
                state: _paramData
              });
            }
            //# pass fail builk dashboard            
            else if (this.module == 'ULIP_MATURITY' || this.module == 'NON_ULIP_MATURITY_CLAIM' || this.module == 'SURVIVAL_BENEFIT'
              || this.module == 'ANNUITY_PAYOUT' || this.module == 'NU_Pension & VIP_Maturity'
              || this.module == 'INDIGO_MATURITY_CLAIMS' || this.module == 'ULIP_SURRENDER'
              || this.module == 'NON_ULIP_SURRENDER' || this.module == 'NON_ULIP_DEATH_CLAIM' || this.module == 'ULIP_DEATH_CLAIM'
              // || this.module == 'LTR'
              || this.module == 'NON_ULIP_DEATH_REPUDIATION' || this.module == 'ULIP_DEATH_REPUDIATION'
              || this.module == 'NON_ULIP_FLC' || this.module == 'ULIP_FLC' || this.module == 'ANNUITY_DEATH_CLAIM'
              // rohit changes NON_ULIP_DEATH_REPUDIATION,ULIP_DEATH_REPUDIATION
              //rohit changes NON_ULIP_FLC, ULIP_FLC, ANNUITY_DEATH_CLAIM //[21-11-22] 
            ) {
              localStorage.setItem('policy', JSON.stringify(_paramData))
              this.router.navigate(['pass-fail-approval']);
              console.log(_paramData);

            }

            else {
              this.router.navigate(['dashboard'], {
                state: _paramData
              });
              console.log(_paramData);


            }
          }
        }
      },
      (error) => {

        // this.messageType = 'Error Message :  '
        console.log('Error ::', error);
        console.log(error.status);
        console.log(error.statusText);
        this.showOverlay = false;
        this.displayMessage = true;
        this.isError = true;

        this.messageType = 'Error Message :  ';
        console.log('messageType >>', this.messageType);

        this.message = 'client [ error_code : ' + error.status + ' ]';
        console.log('message >>', this.message);

        this.messageDetails = error.statusText;
        console.log('messageDetails >>>', this.messageDetails);
        return;

        //06-05-21
        // error = {
        //   "response_code": 'ORA-00911',
        //   "response_message": error.response_code +' : ' + error.response_message
        // }
        // this.message = error.status +' : ' + error.statusText;
        // this.message = '500 ' +' : ' + 'Internal Server Error';

        // alert('Error Occurred in Process');

        // error = {
        //   "error_code": 'ORA-00911',
        //   "error_message": 'Invalid Character'
        // }
        // alert('Error ' + error.error_code + ' : ' + error.error_message);
      }
    );

    //this.router.navigate( ['dashboard'], { state : { routeParam : this.routeParam } } );
  }

  showMessage() {
    this.displayMessage = false;
  }
  // showAlert(response: any) {
  //   this.openConfirmationBox = false;
  // }



  Dashboardtable(module) {
    // console.log('menuenter ::' , module); 
    this.module = module;
    console.log('menuenter ::', this.module);
    this.moduleId = this.process_map[module];
    this.moduleName = module;
    this.subModuleId = 0;
    this.router.navigate(['tabledashboard']);

  }

  // VALUATION

  menuenteri(module, actualModule_, subModuleId) {
    console.log('VALUATION DATA >>', module);
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
      'subModuleId': this.subModuleId,
    }


    //Add the table format and export to excel
    //    
    if (module === 'UNITS_INCONSISTENCY' || module === 'CORRECTNESS_OF_INCREASING_AND_DECREASING_SUM_ASSURED_BENEFIT_VALUATION' || module === 'CRITICAL_FIELDS'
      || module === 'RIDER_INCONSISTENCY' || module === 'BOUNDARY_CONDITION' || module === 'LTR_PROCESS_STATUS_CHANGE' || module === 'DUPLICATE_ENTRIES' || module === 'PPA_CALCULATION') {
      this.router.navigate(['VALUATION'], { state: params });
      console.log("if");

    }
    else if (module === 'DOD_PRESENT_BUT_STATUS_NOT_DEATH') {
      this.router.navigate(['VALUATION'], { state: params });

    }

    else {
      this.router.navigate(['valuation-data'], { state: params });
      console.log("else if");
    }
  }


  SummaryData(module, actualModule_, SubModuleId) {
    console.log('Summary DATA >>', module);
    this.moduleName = module;
    this.actualModule = actualModule_;
    this.moduleId = this.curr_projects_map[module];
    this.subModuleId = SubModuleId;
    console.log(this.moduleName, this.actualModule, this.moduleId, this.subModuleId, "---------------->summary data coming");


    var params = {
      'module': module,
      'moduleId': this.moduleId,
      'moduleName': this.moduleName,
      'actualModule': this.actualModule,
      'subModuleId': this.subModuleId,
    }

    if (module === "Summary") {
      this.router.navigate(['All-Summary'], { state: params });
    }
  }

  MBoundary(){
    this.router.navigate(['boundarys']);
  }

  backPage() {
    this.router.navigate(['ChooseDashboardComponent']);
  }

  showMISWindow() {
    this.router.navigate(['mis']);
  }


}

