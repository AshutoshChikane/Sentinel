import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DefectTrackerService } from '../Service/defect-tracker.service';
import { log } from 'console';

@Component({
  selector: 'app-update-data',
  templateUrl: './update-data.component.html',
  styleUrls: ['./update-data.component.scss']
})
export class UpdateDataComponent implements OnInit {
  data: any;
  dataPoint: any;
  updateForm: any;
  message: any;
  openConfirmationBox: boolean;
  showMessageButton: boolean;
  displayMessage: boolean;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
    private UpdateData: DefectTrackerService) {
    this.UpdateData.getMessage().subscribe((result) => {
      console.log(result, "ssssssssss")
      console.log("ID", result.Id);
      console.log("MONTH", result.MONTH);
      console.log("VAL_DQ_IRDA", result.VAL_DQ_IRDA);
      console.log("WHIZIBLE_ID", result.WHIZIBLE_ID);
      console.log("DEPT_RESPOSIBLE", result.DEPT_RESPOSIBLE);
      console.log("CATEGORY", result.CATEGORY);
      console.log("SYSTEM", result.SYSTEM);
      console.log("ASPECT", result.ASPECT);
      console.log("ULIP_NONULIP_GRPS_VIP", result.ULIP_NONULIP_GRPS_VIP);
      console.log("PRODUCT_ID_COVERED", result.PRODUCT_ID_COVERED);
      console.log("STATUS_OF_WHIZIBLE", result.STATUS_OF_WHIZIBLE_ID);
      console.log("ISSUES_IN_DETAIL", result.ISSUES_IN_DETAIL);
      console.log("IMPACTED_POLICIES", result.IMPACTED_POLICIES);
      console.log("SAMPLE_POL_CUST_ID", result.SAMPLE_POL_CUST_ID);
      console.log("AMOUNT_IMPACTED", result.AMOUNT_IMPACTED);
      console.log("REASON_FOR_CLOSING", result.REASON_FOR_CLOSING);
      console.log("DOR_TO_OPS_IT", result.DOR_TO_OPS_IT);
      console.log("REMARKS", result.REMARKS);
      console.log("FY", result.FY);
      console.log("RESOURCE", result.RESOURCE);
      console.log("DATE_CLOSURE", result.DATE_CLOSURE);
      console.log("SEVERITY", result.SEVERITY);
      console.log("SEVERITY", result.TYPEOF);

      this.dataPoint = result
    })
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      moduleId: '401',
      request_action: 'Defect Tracker',
      ID: [this.dataPoint.ID],
      MONTH: [this.dataPoint.MONTH],
      VAL_DQ_IRDA: [this.dataPoint.VAL_DQ_IRDA],
      WHIZIBLE_ID: [this.dataPoint.WHIZIBLE_ID],
      DEPT_RESPOSIBLE: [this.dataPoint.DEPT_RESPOSIBLE],
      // CATEGORY: [this.dataPoint.CATEGORY],
      SYSTEM: [this.dataPoint.SYSTEM],
      ASPECT: [this.dataPoint.ASPECT],
      ULIP_NONULIP_GRPS_VIP: [this.dataPoint.ULIP_NONULIP_GRPS_VIP],
      PRODUCT_ID_COVERED: [this.dataPoint.PRODUCT_ID_COVERED],
      STATUS_OF_WHIZIBLE_ID: [this.dataPoint.STATUS_OF_WHIZIBLE_ID],
      ISSUES_IN_DETAIL: [this.dataPoint.ISSUES_IN_DETAIL],
      IMPACTED_POLICIES: [this.dataPoint.IMPACTED_POLICIES],
      SAMPLE_POL_CUST_ID: [this.dataPoint.SAMPLE_POL_CUST_ID],
      AMOUNT_IMPACTED: [this.dataPoint.AMOUNT_IMPACTED],
      REASON_FOR_CLOSING: [this.dataPoint.REASON_FOR_CLOSING],
      DOR_TO_OPS_IT: [this.dataPoint.DOR_TO_OPS_IT],
      REMARKS: [this.dataPoint.REMARKS],
      FY: [this.dataPoint.FY],
      RESOURCE: [this.dataPoint.RESOURCE],
      DATE_CLOSURE: [this.dataPoint.DATE_CLOSURE],
      SEVERITY :  [this.dataPoint.SEVERITY],
      TYPEOF:  [this.dataPoint.TYPEOF],

    })


    // let itemId = this.route.snapshot.paramMap.get('Id');
    // console.log(itemId)
    // itemId && this.UpdateData.getUpdateData(itemId).subscribe((data)=>{
    //   console.log(data)


    // })
  }

  ID: any;
  MONTH: any;
  VAL_DQ_IRDA: any;
  Whizible_id: any;
  DEPT_RESPOSIBLE: any;
  // CATEGORY: any;
  SYSTEM: any;
  ASPECT: any;
  ULIP_NONULIP_GRPS_VIP: any;
  PRODUCT_ID_COVERED: any;
  STATUS_OF_WHIZIBLE_ID: any;
  ISSUES_IN_DETAIL: any;
  IMPACTED_POLICIES: any;
  SAMPLE_POL_CUST_ID: any;
  AMOUNT_IMPACTED: any;
  REASON_FOR_CLOSING: any;
  DOR_TO_OPS_IT: any;
  REMARKS: any;
  FY: any;
  RESOURCE: any;
  DATE_CLOSURE: any;
  SEVERITY : any;
  TYPEOF: any;

  backPage() {
    this.router.navigate(['DefectTracker']);
  }


  update() {
    this.data = this.updateForm.value
    console.log(this.data);
    //  let obj={
    //   data=this.updateForm.value

    //  }
    // this.UpdateData.update(this.data).subscribe(result => {
    //   console.log("result",result)
    //   // if (result) {
    //   //   // this.router.navigate(['DefectTracker'])
        
    //   // }
    
    // })
    
    this.UpdateData.update(this.data).subscribe(res => {
      console.log('submit data')
      console.log("res", res)

      console.log("res", res.response_message)

      this.message = res.response_message;
      this.openConfirmationBox = true;
      this.showMessageButton = true;
      this.displayMessage = true;

      //
    })
  }

  showMessage() {
    // this.displayMessage = false;
        this.router.navigate(['DefectTracker']);
 
  }


}
