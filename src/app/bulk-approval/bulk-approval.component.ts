import {
  Component,
  NgZone,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MessageDialogComponent } from '../dialog/message/message.component';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { JsontoexcelService } from '../Service/jsontoexcel.service';
import { DashboardService } from '../Service/dashboard.service';
import { SelectionModel } from '@angular/cdk/collections';
export interface PeriodicElement {
  policy_no: string;
  system_value: string;
  CALCULATED_VALUE: string;
  flag: string;
  remark: string;
  edit: string;
}

@Component({
  selector: 'app-bulk-approval',
  templateUrl: './bulk-approval.component.html',
  styleUrls: ['./bulk-approval.component.scss'],
})
export class BulkApprovalComponent implements OnInit {
  displayedColumns: string[];
  table_data;
  data = [];
  edit_data = {};
  doc_choice = null;
  doc_value = '';
  tabIndex = 0;
  moduleId;
  requested_by;
  processId;
  exportTo;
  hideDetails;
  subModuleId;
  remarksValues: any;
  routerState;
  selection;
  bulkMessagePopup;
  openBulkBox: boolean = false;
  qcFlag = '';
  qcRemarks = '';
  selectedQcFlag: string;
  noData: boolean = false;
  openConfirmationBox = false;
  messagePopup;
  showMessageButton = false;
  processedPolicy;
  inputDisabled = false;
  bulkData = [];
  retVal = false;
  policyData = {};
  isError = false;
  displayMessage = false;
  messageType;
  messageDetails;
  message;
  noMatchFound = false;
  searchPolicyValue;
  newArray;
  blockPrevious: boolean = false
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.table_data.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.bulkMessagePopup = 'Policy Details Changed. Do you want to continue ?';
    this.openBulkBox = true;
    this.showMessageButton = true;
    if (this.isAllSelected()) {
      this.selection.clear();
      this.openBulkBox = false;
      this.showMessageButton = false;
      return;
    }

    this.selection.select(...this.table_data.data);

  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.policy_no + 1
      }`;
  }
  @ViewChild('messageDlg', { static: false })
  messageDlg: MessageDialogComponent;
  newData;
  groupPayout: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private excelService: JsontoexcelService,
    private dashboardService: DashboardService,
    private ngZone: NgZone
  ) {
    this.routerState = this.router.getCurrentNavigation().extras.state;
    console.log('routerState :: dashboard component :: ', this.routerState);
    if (this.routerState && this.routerState['payout']) {
      this.groupPayout = true;
    }
    this.newData = this.routerState;
    console.log(this.newData);

    if (this.routerState) {
      if (this.routerState['policyData']) {
        var dataArray = [];
        this.data = this.routerState['policyData'];
        // dataArray = routerState['policyData'];
        console.log(this.data);

        if (this.data.length > 0) {
          for (var i = 0; i < this.data.length; i++) {
            // console.log(this.data[i]);
            if (this.routerState['processQcValue'] == 'PASS') {
              this.data[i]['PQ_QC_FLAG'] = 'PASS';
              if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] == 23) {
                this.data[i]['QC_REMARKS'] = 'Out of scope for checking calculation';
              }
              else if (this.routerState && this.routerState['moduleId'] && this.routerState['subModule_id'] && this.routerState['moduleId'] == 5 && this.routerState['subModule_id'] == 4) {
                this.data[i]['QC_REMARKS'] = 'Out Of Scope Lock-In Future SV Case';
              }
              //rohit ashwini changes 17-11-22 
              else {
                // this.data[i]['QC_REMARKS'] = 'Clear Case';
                if (this.data[i]['ASSIGNMENT_FLAG'] == 'Y') {
                  this.data[i]['QC_REMARKS'] = 'Clear Case Please check for Assignment';
                }
                if (this.data[i]['ASSIGNMENT_FLAG'] !== 'Y') {
                  this.data[i]['QC_REMARKS'] = 'Clear Case';
                }
              }
              this.data[i]['EDIT'] = true;
            }

            var dataObj = {};
            var dataKeys = Object.keys(this.data[i]);
            for (var j = 0; j < dataKeys.length; j++) {
              dataObj[dataKeys[j].toUpperCase()] = this.data[i][dataKeys[j]];
            }
            // console.log(dataArray);

            dataArray.push(dataObj);
          }
          this.data = dataArray;
          console.log(this.data);


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
    console.log(this.newData);
    console.log(this.routerState);

    this.edit_data = {};
    if (this.routerState
      && this.routerState['moduleId'] != 7 //NON_ULIP_DEATH_CLAIM
      && this.routerState['moduleId'] != 8  //ULIP_DEATH_CLAIM
      && this.routerState['moduleId'] != 15 //NON_ULIP_DEATH_REPUDIATION
      && this.routerState['moduleId'] != 16 //ULIP_DEATH_REPUDIATION
      && this.routerState['processQcValue'] == 'PASS'
    ) {
      this.displayedColumns = [
        'SELECT',
        'POLICY_NO',
        'SYSTEM_VALUE',
        'CALCULATED_VALUE',
        'PQ_QC_FLAG',
        'QC_REMARKS',
        'QC_REMARKS',
        'actionsColumn',
      ];
    }
    // else if (this.routerState  && this.routerState['moduleId']==7 && 
    // this.routerState['subModule_id'] && this.routerState['subModule_id'] == 1 
    // && this.routerState['processQcValue'] == 'PASS') {
    else if (this.routerState
      &&
      (this.routerState['moduleId'] == 7
        || this.routerState['moduleId'] == 8
        || this.routerState['moduleId'] == 15
        || this.routerState['moduleId'] == 16)
      && this.routerState['processQcValue'] == 'PASS'
    ) {
      this.displayedColumns = [
        'SELECT',
        'POLICY_NO',
        'SYSTEM_VALUE',
        'CALCULATED_VALUE',
        'PQ_QC_FLAG',
        'QC_REMARKS',
        'QC_REMARKS',
        'QC_Calculated_Value',
        'actionsColumn',
      ];
    }
    // else if (this.routerState  && this.routerState['moduleId']== 7 && this.routerState['subModule_id'] 
    // && this.routerState['subModule_id'] == 1 && this.routerState['processQcValue'] == 'FAIL') {
    else if (this.routerState
      &&
      (this.routerState['moduleId'] == 7
        || this.routerState['moduleId'] == 8
        || this.routerState['moduleId'] == 15
        || this.routerState['moduleId'] == 16)
      && this.routerState['processQcValue'] == 'FAIL'
    ) {
      this.displayedColumns = [
        'POLICY_NO',
        'SYSTEM_VALUE',
        'CALCULATED_VALUE',
        'PQ_QC_FLAG',
        'QC_REMARKS',
        'QC_REMARKS',
        'QC_Calculated_Value',
        'actionsColumn',
      ];
    }
    // else if (this.routerState  && this.routerState['moduleId']==7
    //  && this.routerState['subModule_id'] && this.routerState['subModule_id'] != 1 && this.routerState['processQcValue'] == 'PASS') {
    //   this.displayedColumns = [
    //     'SELECT',
    //     'POLICY_NO',
    //     'SYSTEM_VALUE',
    //     'CALCULATED_VALUE',
    //     'PQ_QC_FLAG',
    //     'QC_REMARKS',
    //     'QC_REMARKS',
    //     'actionsColumn',
    //   ];
    // } 
    // else if (this.routerState  && this.routerState['moduleId']== 7 && this.routerState['subModule_id'] && this.routerState['subModule_id'] != 1 && this.routerState['processQcValue'] == 'FAIL') {
    //   this.displayedColumns = [
    //     'POLICY_NO',
    //     'SYSTEM_VALUE',
    //     'CALCULATED_VALUE',
    //     'PQ_QC_FLAG',
    //     'QC_REMARKS',
    //     'QC_REMARKS',
    //     'actionsColumn',
    //   ];
    // } 
    else {
      this.displayedColumns = [
        'POLICY_NO',
        'SYSTEM_VALUE',
        'CALCULATED_VALUE',
        'PQ_QC_FLAG',
        'QC_REMARKS',
        'QC_REMARKS',
        'actionsColumn',
      ];
    }
    this.remarksValues = this.dashboardService.qcRemarksValues;
    // this.setTableData();
  }

  qcFlagValues = [
    { value: 'PASS', text: 'PASS' },
    { value: 'FAIL', text: 'FAIL' },
  ];

  selectedQcFlagValue(event, data) {
    console.log('selectedQcFlagValue called', event.value);
    this.qcFlag = event.value;
    console.log('qcFlag ::', this.qcFlag);
    if (this.qcFlag == 'PASS') {
      //  data['edit']=true
      this.inputDisabled = true;
    } else {
      //  data['edit']=false

      this.inputDisabled = false;
    }
  }

  selectedQcRemarkValue(event) {
    console.log('selectedQcRemarkValue called');
    this.qcRemarks = event.value;
    console.log(this.qcRemarks);
  }

  new() {
    console.log('clicked');
    console.log(this.selection);

  }
  subData(val) {
    console.log(val);

  }

  getConfirmation(policy) {
    console.log('getConfirmation called :: policy = ', policy);
    this.processedPolicy = policy;
    console.log(this.processedPolicy);
    console.log(this.selection);

    if (policy['PQ_QC_FLAG'] == null && policy['QC_REMARKS'] == null) {
      //alert('Please enter Qc flag and remarks');
      this.messagePopup = 'Please enter Qc flag and remarks';
      this.openConfirmationBox = true;
      return;
    } else if (policy['PQ_QC_FLAG'] == null) {
      // alert('Please enter QC Flag');
      this.messagePopup = 'Please enter QC Flag';
      this.openConfirmationBox = true;
      return;
    } else if (policy['QC_REMARKS'] == null) {
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
    else if (policy['PQ_QC_FLAG'] != null && policy['QC_REMARKS'] != null) {
      if (policy['PQ_QC_FLAG'] == 'FAIL' && policy['QC_REMARKS'] == null) {
        this.messagePopup = 'Please enter QC_REMARKS remarks';
        this.openConfirmationBox = true;
        return;
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

  unableDisable(data) {
    data['EDIT'] = false;
  }

  filteredData;

  bulkMessageBox(res) {
    this.openBulkBox = false;
    if (res == 'ok') {
      console.log(this.selection._selected);
      // for (let i = 0; i < this.selection._selected.length; i++) {
      //   const element = this.selection._selected[i];
      //   if(element['edit']==true){
      //     console.log('edit');
      //     element.splice(i,1)
      //   }
      //   console.log(element);

      // }
      this.filteredData = this.selection._selected.filter(function (data) {
        return data.edit != true
      })
      console.log(this.filteredData, this.filteredData.length);

      this.getBulkConfirmation();
    }
  }

  getBulkConfirmation() {
    this.bulkData.length = 0;
    if (this.filteredData.length) {
      for (let index = 0; index < this.filteredData.length; index++) {
        if (this.filteredData[index]['QC_REMARKS']) {
          console.log('QC_REMARKS');
          this.filteredData[index]['QC_REMARKS'] = this.filteredData[index]['QC_REMARKS'] + ', ' + 'QC_REMARKS : ' + this.filteredData[index]['QC_REMARKS'];
          delete this.filteredData[index]['QC_REMARKS'];
        }
        this.bulkData.push(this.filteredData[index]);
        console.log(this.bulkData);

        // if (this.bulkData['QC_REMARKS']) {
        //   console.log('inside');

        //   this.bulkData['QC_REMARKS'] = this.bulkData['QC_REMARKS'] + ', ' + 'QC_REMARKS : ' + this.bulkData['QC_REMARKS'];
        //   delete this.bulkData['QC_REMARKS'];
        // }
      }
      console.log(this.bulkData);
    }

    this.modifyPolicyDetails(this.bulkData);
  }

  userName_ = sessionStorage.getItem('userName');
  userid =this.userName_
  modifyPolicyDetails(policy) {
    console.log('modifyPolicyDetails called :: policy = ', policy);
    console.log(this.bulkData);
    if (this.routerState['processQcValue'] == 'PASS') {
      this.dashboardService.updateBulkPolicyData(policy, this.moduleId, this.processId, this.requested_by, this.subModuleId).subscribe(
        (response) => {
          console.log(this.data);

          for (var i = 0; i < this.selection._selected.length; i++) {
            for (let j = 0; j < policy.length; j++) {
              if (this.selection._selected[i]['POLICY_NO'] == policy[j]['POLICY_NO']) {
                this.selection._selected[i]['edit'] = true;
              }
            }

          }
          console.log(this.selection._selected);
          this.blockPrevious = true
          this.ngZone.run(() => {
            console.log('view refreshed modifyPolicyDetails');
          });
        },
        (error) => {
          console.log('Error Received ', error);
          this.isError = true;
          this.blockPrevious = false

          //TODO Remove from here


          for (var i = 0; i < this.selection._selected.length; i++) {
            for (let j = 0; j < policy.length; j++) {
              if (this.selection._selected[i]['POLICY_NO'] == policy[j]['POLICY_NO']) {
                this.selection._selected[i]['edit'] = true;
              }
            }

          }
          this.ngZone.run(() => {
            console.log('view refreshed modifyPolicyDetails');
          });

          //tillhere
          // this.messagePopup = 'Error occured while submitting policy : ' + error.status + '  '+ error.statusText;

          this.messageType = 'Error Message :  ';
          this.message = 'Error occured while submitting policy :';
          this.messageDetails = error.status + '  ' + error.statusText;
          this.displayMessage = true;
          this.showMessageButton = false;
          // alert('Error occured while submitting policy');
        }
      );

      console.log(this.data);
      console.log(this.table_data);


    } else {
      this.dashboardService.updatePolicyData(policy,policy, this.moduleId, this.processId, this.requested_by, this.subModuleId, this.userid)
        .subscribe(
          (response) => {
            console.log(response);

            for (var i = 0; i < this.data.length; i++) {
              if (this.data[i]['POLICY_NO'] == policy['POLICY_NO']) {
                this.data.splice(i, 1, policy);
                this.data[i]['edit'] = true;
              }
            }
            this.blockPrevious = true

            this.ngZone.run(() => {
              console.log('view refreshed modifyPolicyDetails');
            });
          },
          (error) => {
            console.log('Error Received ', error);
            this.isError = true;
            this.blockPrevious = false

            //TODO Remove from here

            for (var i = 0; i < this.data.length; i++) {
              if (this.data[i]['POLICY_NO'] == policy['POLICY_NO']) {
                this.data.splice(i, 1, policy);
                this.data[i]['edit'] = true;
              }
            }
            this.ngZone.run(() => {
              console.log('view refreshed modifyPolicyDetails');
            });

            //tillhere
            // this.messagePopup = 'Error occured while submitting policy : ' + error.status + '  '+ error.statusText;

            this.messageType = 'Error Message :  ';
            this.message = 'Error occured while submitting policy :';
            this.messageDetails = error.status + '  ' + error.statusText;
            this.displayMessage = true;
            this.showMessageButton = false;
            // alert('Error occured while submitting policy');
          }
        );
      console.log(this.table_data);

    }
  }

  showMessage(response) {
    this.openConfirmationBox = false;
    if (this.processedPolicy['QC_REMARKS']) {
      this.processedPolicy['QC_REMARKS'] =
        this.processedPolicy['QC_REMARKS'] +
        ', ' +
        'QC_REMARKS : ' +
        this.processedPolicy['QC_REMARKS'];
      delete this.processedPolicy['QC_REMARKS'];
    }

    console.log(this.processedPolicy);
    if (response == 'OK') {
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


  splicedData = [];

  refreshBulkPolicyData() {
    console.log('refreshBulkPolicyData ::: data >>', this.data);
    if (this.data) {
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i]['edit'] == true) {
          //  this.splicedData= this.data.splice(i, 1);
          this.splicedData.push(...this.data.splice(i, 1))
          i--;
        }
      };
      console.log(this.splicedData);

      if (this.data.length == 0) {
        this.noData = true;
      }
      else if (this.routerState && this.routerState['moduleId'] && this.routerState['moduleId'] === 11 ||
        this.routerState['moduleId'] === 10 || this.routerState['moduleId'] === 3 ||
        this.routerState['moduleId'] === 9 || this.routerState['moduleId'] === 6 ||
        this.routerState['moduleId'] === 4 || this.routerState['moduleId'] === 5 ||
        this.routerState['moduleId'] === 301
       
        //rohit changes [module id -301] 02-11-22 
        //rohit changes[module id -1,2,12] 21-11-22
      ) //added by sonamk -changes for ltr refresh

      {
        if (this.data && this.data.length > 100) {
          this.table_data.data = this.data.slice(0, 100);
        } else if (this.data && this.data.length <= 100) {
          this.table_data.data = this.data;
        }
        console.log('refreshBulkPolicyData >>', this.table_data.data.length);
      }

      else if (this.data && this.data.length > 15) {
        this.table_data.data = this.data.slice(0, 15);
      } else if (this.data && this.data.length <= 15) {
        this.table_data.data = this.data;
      }
      console.log(
        'refreshBulkPolicyData ::: data #2 >>>',
        this.data,
        this.data.length
      );
    }
    this.ngZone.run(() => { });
  }

  refreshPolicyData() {
    console.log('refreshPolicyData ::: data >>', this.data);

    if (this.data) {
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i]['edit'] == true) {
          this.splicedData.push(...this.data.splice(i, 1))
          i--;
        }
      }
      console.log(this.splicedData);

      if (this.data.length == 0) {
        this.noData = true;
      } else if (this.data && this.data.length > 10) {
        this.table_data.data = this.data.slice(0, 10);
      } else if (this.data && this.data.length <= 10) {
        this.table_data.data = this.data;
      }
      console.log(
        'refreshPolicyData ::: data #2 >>>',
        this.data,
        this.data.length
      );
    }
    this.ngZone.run(() => { });
  }

  openDialogWithTemplateRef(templateRef: TemplateRef<any>, element) {
    this.tabIndex = 0;
    this.edit_data = element;
    this.doc_choice = '';
    this.doc_value = '';
    let config = {
      position: {
        top: '0px',
        right: '0px',
      },
      height: '100%',
      width: '100vw',
      panelClass: 'full-screen-modal',
    };
    this.dialog.open(templateRef, config);
  }

  gotoPage(pageName: string) {
    this.router.navigate([pageName]);
  }


  applyFilter(filterValue: string) {
    console.log('applyFilter ::: ', filterValue);
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    console.log('applyFilter #2::: ', filterValue);
    if (filterValue) {
      this.table_data.data = this.data;
      this.noData = false;
    } else {
      if (this.data && this.data.length == 0) {
        this.noData = true;
      } else if (this.data && this.data.length > 10) {
        this.noData = false;
        this.table_data.data = this.data.slice(0, 10);
      } else if (this.data && this.data.length <= 10) {
        this.noData = false;
        this.table_data.data = this.data;
      }
    }

    if (this.table_data && this.data) {
      this.table_data.filter = filterValue;
      if (this.table_data['filteredData'].length == 0) {
        this.noMatchFound = true;
      } else {
        this.noMatchFound = false;
      }
    }
  }


  keyupSearchPolicy(value) {
    this.searchPolicyValue = value;
    this.applyFilter(value);
  }

  //TODO : Use If want to search policies on click of search

  searchPolicyDetails() {
    this.applyFilter(this.searchPolicyValue);
  }

  capture() {
    this.tabIndex = 2;
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  onNextMethod() {
    if (!this.doc_choice) {
      alert('Please select an ID');
      return;
    }
    if (this.doc_choice == 0) {
      this.tabIndex = 1;
    }
    if (this.doc_choice == 2 && this.doc_value.length != 12) {
      alert('Please enter valid Aadhaar Card Number');
      return;
    }
    if (this.doc_choice == 2 && this.doc_value.length == 12) {
      //TODO api call
      this.tabIndex = 1;
    }
  }

  exportAsXLSX() {
    this.excelService.exportAsExcelFile(this.data, 'policyDetails');
  }

  checkClass() {
    if (this.hideDetails) {
      return 'visible';
    }
  }

  navigateToPrevious() {
    console.log(this.routerState);
    if (this.routerState && this.routerState['processQcValue']) {
      if (this.routerState['processQcValue'] == "PASS") {
        this.refreshBulkPolicyData();
      } else {
        this.refreshPolicyData()
      }
    }
    console.log(this.splicedData);

    let newData = []
    this.splicedData = this.splicedData.filter(val => {
      return val.edit == true
    })
    console.log(this.splicedData);

    for (var i = 0; i < this.splicedData.length; i++) {
      var dataObj = {};
      var dataKeys = Object.keys(this.splicedData[i]);
      for (var j = 0; j < dataKeys.length; j++) {
        dataObj[dataKeys[j].toLowerCase()] = this.splicedData[i][dataKeys[j]];
      }
      newData.push(dataObj);
    }
    this.routerState['policyData'] = newData;
    console.log(this.routerState);
    console.log(this.routerState['policyData']);

    this.router.navigate(['pass-fail-approval'], {
      state: this.routerState
    });
  }

}
