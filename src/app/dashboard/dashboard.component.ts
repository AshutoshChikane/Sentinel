import { Component, NgZone, OnInit, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from "@angular/router";
import { MessageDialogComponent } from "../dialog/message/message.component";
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { DashboardService } from '../Service/dashboard.service';
import { formatDate } from '@angular/common';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { log } from 'console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<FormData>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // ngOnInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
  // showOverlay: boolean = true;
  // QCloder:boolean=false;
  displayedColumns: string[];
  table_data;
  data = [];
  edit_data = {}
  doc_choice = null
  doc_value = ''
  tabIndex = 0
  moduleId;
  requested_by;
  processId;
  exportTo;
  hideDetails;
  subModuleId;
  remarksValues: any;
  routerState;
  MODULENAME: any;

  @ViewChild('messageDlg', { static: false })
  messageDlg: MessageDialogComponent;


  constructor(private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private excelService: JsontoexcelService,
    private dashboardService: DashboardService,
    private ngZone: NgZone) {


    // this. showOverlay=true;


    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', this.routerState);

    this.MODULENAME = this.routerState.module
    console.log("this.MODULENAME", this.MODULENAME);
    // this.showOverlay=false;
    if (this.routerState) {
      if (this.routerState['policyData']) {
        var dataArray = [];
        this.data = this.routerState['policyData'];
        // dataArray = routerState['policyData'];

        if (this.data.length > 0) {
          for (var i = 0; i < this.data.length; i++) {
            if (this.routerState && this.routerState['moduleId'] == 23) {
              this.data[i]['PQ_QC_FLAG'] = 'PASS';
              this.data[i]['QC_REMARKS'] = 'Out of scope for checking calculation';
            }
            var dataObj = {};
            var dataKeys = Object.keys(this.data[i]);
            for (var j = 0; j < dataKeys.length; j++) {
              dataObj[dataKeys[j].toUpperCase()] = this.data[i][dataKeys[j]];
            }
            dataArray.push(dataObj);
          }
          this.data = dataArray;
        }
      }
      if (this.routerState['moduleId']) {
        this.moduleId = this.routerState['moduleId'];
      }
      if (this.routerState['requested_by']) {
        this.requested_by = this.routerState['requested_by'];
        console.log('requested_by :', this.requested_by);
      }
      if (this.routerState['processId']) {
        this.processId = this.routerState['processId'];
      }
      if (this.routerState['subModule_id']) {
        this.subModuleId = this.routerState['subModule_id'];
      }
    }

  }

  ngOnInit() {
    this.edit_data = {};
    this.displayedColumns = ['POLICY_NO', 'SYSTEM_VALUE', 'CALCULATED_VALUE', 'PQ_QC_FLAG', 'QC_REMARKS', 'actionsColumn'];
    this.remarksValues = this.dashboardService.qcRemarksValues
    this.setTableData();
    this.dataSource.paginator = this.paginator;
  }


  ngAfterViewInit() {
  }

  noData: boolean = false;
  dropValue: any[];
  

  setTableData() {
    setTimeout(() => {
      if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] === 12) {
        this.remarksValues = this.dashboardService.annuity_death_claims;
        return
      }
      else if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] === 8) {
        this.remarksValues = this.dashboardService.ulip_approved_death_claims
        return
      }
      else if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] === 16) {
        this.remarksValues = this.dashboardService.ulip_repudiated_death_claims
        return
      }
      else if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] === 7) {
        this.remarksValues = this.dashboardService.non_ulip_approved_death_claims
        return
      }
      else if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] === 15) {
        this.remarksValues = this.dashboardService.non_ulip_repudiated_death_claims
        return
      }
      else if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] == 18) {
        this.remarksValues = this.dashboardService.indigo_death_claims
        return
      }
      else if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] == 23) {
        this.remarksValues = this.dashboardService.indigo_death_claims
        return
      }
      else if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] === 21) {
        this.remarksValues = this.dashboardService.rt_group_death_claims
        return
      }
      else {
        this.remarksValues = this.dashboardService.qcRemarksValues

      }
    }, 100);
    console.log('setTableData called', this.data);
    this.dropValue = this.data[0].PQ_QC_REMARKS;
  
    console.log(this.dropValue,"dropValue" );
    
    this.ngZone.run(() => { console.log('view refreshed') });
    if (this.data) {
      if (this.data.length == 0) {
        this.noData = true;
      }
    }
    let data_ = [];
    this.table_data = new MatTableDataSource(data_);
    this.table_data.paginator = this.paginator;
    //this.table_data.data = this.data; TODO Commented

    if (this.data && this.data.length > 1000) {
      this.table_data.data = this.data.slice(0, 1000);
      // Object.keys(obj)
    } else {
      this.table_data.data = this.data;
    }
  }

  qcFlag = '';
  qcRemarks = '';

  selectedQcFlag: string;
  qcFlagValues = [
    { value: 'PASS', text: 'PASS' },
    { value: 'FAIL', text: 'FAIL' }
  ];

  selectedQcFlagValue(event) {
    console.log('selectedQcFlagValue called', event.value);
    this.qcFlag = event.value;
    console.log('qcFlag ::', this.qcFlag);
    if (this.qcFlag == "PASS") {
      this.inputDisabled = true
    }
    else {
      this.inputDisabled = false

    }
  }


  selectedQcRemarkValue(event) {
    console.log('selectedQcRemarkValue called');
    this.qcRemarks = event.value;
    console.log(this.qcRemarks);
  }

  openConfirmationBox = false;
  messagePopup;
  showMessageButton = false;
  processedPolicy;
  inputDisabled = false;
  getConfirmation(policy) {
    console.log('getConfirmation called :: policy = ', policy);
    this.processedPolicy = policy;
   
    if (policy['PQ_QC_FLAG'] == null && policy['QC_REMARK'] == null) {
      //alert('Please enter Qc flag and remarks');
      this.messagePopup = 'Please enter Qc flag and remarks';
      this.openConfirmationBox = true;
      return;
    }

    if (policy['QC_REMARK'] === 'other' && !policy['otherQC_REMARK']) {
      this.messagePopup = 'Please enter a remark in the input field.';
      this.openConfirmationBox = true;
      return;
  }



    else if (policy['PQ_QC_FLAG'] == null) {
      // alert('Please enter QC Flag');
      this.messagePopup = 'Please enter QC Flag';
      this.openConfirmationBox = true;
      return;
    }
    else if (policy['QC_REMARK'] == null) {
      // alert('Please enter QC Remarks');
      this.messagePopup = 'Please enter QC Remarks';
      this.openConfirmationBox = true;
      return;
    }
    // else if(!policy['QC_REMARKS'] && policy['PQ_QC_FLAG']=="Fail"){
    //   this.messagePopup = 'Please enter QC_REMARKS remarks';
    //   this.openConfirmationBox = true;
    //   return
    // }
    else if (policy['PQ_QC_FLAG'] != null && policy['QC_REMARK'] != null) {
      if (policy['PQ_QC_FLAG'] == "FAIL" && policy['QC_REMARK'] == null) {
        this.messagePopup = 'Please enter QC_REMARKS remarks';
        this.openConfirmationBox = true;
        return
      } else {
        this.messagePopup = 'Policy Details Changed. Do you want to continue ?';
        this.openConfirmationBox = true;
        this.showMessageButton = true;
      }
      // this.messagePopup = 'Policy Details Changed. Do you want to continue ?';
      // this.openConfirmationBox = true;
      // this.showMessageButton = true;
    }
  }

  retVal = false;

  showMessage(response) {
    this.openConfirmationBox = false;
    if (this.processedPolicy['QC_REMARKS']) {
      this.processedPolicy['QC_REMARKS'] = this.processedPolicy['QC_REMARKS'] + ", " + "QC_REMARKS : " + this.processedPolicy['QC_REMARKS'];
      delete this.processedPolicy['QC_REMARKS'];
    }

    console.log(this.processedPolicy);
    if (response == 'OK') {
      if (this.processedPolicy['QC_REMARK'] === 'other') {
        this.processedPolicy['QC_REMARK'] = this.processedPolicy['otherQC_REMARK'];
        delete this.processedPolicy['otherQC_REMARK'];
    }
      // this.retVal = true;
      this.modifyPolicyDetails(this.processedPolicy);
    }
    if (response == 'CANCEL') {
      return;
      // this.retVal= false;
    }
    // this.ngZone.run(() =>{ console.log('view refreshed') });


  }

  showAlert(response) {
    this.openConfirmationBox = false;
    this.displayMessage = false;
    // return;

  }
  policyData = {};
  isError = false;
  displayMessage = false;



  userName_ = sessionStorage.getItem('userName');

  userid = this.userName_

  modifyPolicyDetails(policy) {
    // this.showOverlay=false;
    // this.QCloder=true;
    console.log('modifyPolicyDetails called :: policy = ', policy);

    this.dashboardService.updatePolicyData(policy,policy.UNI_ID_POL_DT, this.moduleId, this.processId, this.requested_by, this.subModuleId, this.userid).subscribe(
      (response) => {
        console.log('userid 287', this.userid)
        console.log('module_id', this.moduleId)
        for (var i = 0; i < this.data.length; i++) {
          if (this.data[i]['POLICY_NO'] == policy['POLICY_NO']) {
            this.data.splice(i, 1, policy);
            this.data[i]['edit'] = true;
          }
        }
        // this.showOverlay=true;
        // this.QCloder=false;
        this.ngZone.run(() => { console.log('view refreshed modifyPolicyDetails') });
      },
      (error) => {
        console.log('Error Received ', error);
        this.isError = true;
        //TODO Remove from here

        // for( var i = 0; i < this.data.length; i++ ) {
        //   if(this.data[i]['POLICY_NO'] == policy['POLICY_NO']){
        //     this.data.splice(i, 1, policy);
        //     this.data[i]['edit'] = true;
        //   }
        // }
        // this.ngZone.run(() =>{ console.log('view refreshed modifyPolicyDetails')}); 

        //tillhere
        // this.messagePopup = 'Error occured while submitting policy : ' + error.status + '  '+ error.statusText; 

        this.messageType = 'Error Message :  ';
        this.message = 'Error occured while submitting policy :'
        this.messageDetails = error.status + '  ' + error.statusText;
        this.displayMessage = true;
        this.showMessageButton = false;
        // alert('Error occured while submitting policy');
      }
    );
  }
  messageType;
  messageDetails;
  message;
  refreshPolicyData() {
    console.log('refreshPolicyData ::: data >>', this.data);

    if (this.data) {
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i]['edit'] == true) {
          this.data.splice(i, 1);
          i--;
        }
      }
      if (this.data.length == 0) {
        this.noData = true;
      }
      else if (this.data && this.data.length > 10) {
        this.table_data.data = this.data.slice(0, 10);
      }
      else if (this.data && this.data.length <= 10) {
        this.table_data.data = this.data;
      }
      console.log('refreshPolicyData ::: data #2 >>>', this.data, this.data.length);
    }
    this.ngZone.run(() => { });
    
  }
  openDialogWithTemplateRef(templateRef: TemplateRef<any>, element) {
    this.tabIndex = 0
    this.edit_data = element
    this.doc_choice = ''
    this.doc_value = ''
    let config = {
      position: {
        top: '0px',
        right: '0px'
      },
      height: '100%',
      width: '100vw',
      panelClass: 'full-screen-modal',
    };
    this.dialog.open(templateRef, config)
  }

  gotoPage(pageName: string) {
    this.router.navigate([pageName])
  }

  noMatchFound = false;
  applyFilter(filterValue: string) {
    console.log('applyFilter ::: ', filterValue);
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    console.log('applyFilter #2::: ', filterValue);
    if (filterValue) {
      this.table_data.data = this.data;
      this.noData = false;
    }
    else {
      if (this.data && this.data.length == 0) {
        this.noData = true;
      }
      else if (this.data && this.data.length > 10) {
        this.noData = false;
        this.table_data.data = this.data.slice(0, 10);
      }
      else if (this.data && this.data.length <= 10) {
        this.noData = false;
        this.table_data.data = this.data;
      }
    }


    if (this.table_data && this.data) {
      this.table_data.filter = filterValue;
      if (this.table_data['filteredData'].length == 0) {
        this.noMatchFound = true;
      }
      else {
        this.noMatchFound = false;
      }
    }
  }

  searchPolicyValue;
  keyupSearchPolicy(value) {
    this.searchPolicyValue = value;
    this.applyFilter(value);

  }

  //TODO : Use If want to search policies on click of search
  searchPolicyDetails() {
    this.applyFilter(this.searchPolicyValue);

  }

  capture() {
    this.tabIndex = 2
  }

  closeDialog() {
    this.dialog.closeAll()
  }

  onNextMethod() {
    if (!this.doc_choice) {
      alert("Please select an ID")
      return
    }
    if (this.doc_choice == 0) {
      this.tabIndex = 1
    }
    if (this.doc_choice == 2 && this.doc_value.length != 12) {
      alert('Please enter valid Aadhaar Card Number')
      return
    }
    if (this.doc_choice == 2 && this.doc_value.length == 12) {
      //TODO api call
      this.tabIndex = 1
    }
  }
  exportAsXLSX() {
    // this.showOverlay=true;
    // this.QCloder=true;

    this.excelService.exportAsExcelFile(this.data, 'policyData');
    // this.showOverlay=false;
    // this.QCloder=false;

    console.log(this.policyData);
  }

  checkClass() {
    if (this.hideDetails) {
      return 'visible';
    }
  }


}
