import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  ulip_approved_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Incorrect PPA/Fund value', text: 'Incorrect PPA/Fund value' },
    { value: 'Incorrect Horizon/Platinum cover benefit calculation', text: 'Incorrect Horizon/Platinum cover benefit calculation' },
    { value: 'Incorrect recovery of unpaid/mortality premium', text: 'Incorrect recovery of unpaid/mortality premium' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];
  ulip_repudiated_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];
  non_ulip_approved_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Incorrect Bonus/GA  calculation', text: 'Incorrect Bonus/GA calculation' },
    { value: 'Incorrect PPA calculation', text: 'Incorrect PPA calculation' },
    { value: 'Incorrect ISA logic', text: 'Incorrect ISA logic' },
    { value: 'Incorrect SA', text: 'Incorrect SA' },
    { value: 'Incorrect Rider payout', text: 'Incorrect Rider payout' },
    { value: 'Incorrect recovery of Unpaid/terminal premium', text: 'Incorrect recovery of Unpaid/terminal premium' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];
  non_ulip_repudiated_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Incorrect Bonus/GA calculation', text: 'Incorrect Bonus/GA calculation' },
    { value: 'Incorrect PPA calculation', text: 'Incorrect PPA calculation' },
    { value: 'Incorrect ISA logic', text: 'Incorrect ISA logic' },
    { value: 'Incorrect PUSA factor applied', text: 'Incorrect PUSA factor applied' },
    { value: 'Incorrect RPU logic', text: 'Incorrect RPU logic' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];
  annuity_death_claims = [
    { value: 'Incorrect death benefit calculation', text: 'Incorrect death benefit calculation' },
    { value: 'Incorrect Rider payout', text: 'Incorrect Rider payout' },
    { value: 'Clear Case', text: 'Clear Case' }
  ];
  indigo_death_claims = [
    { value: 'Out of scope for checking calculation', text: 'Out of scope for checking calculation' }
  ];
  rt_group_death_claims = [
    { value: 'Out of scope for checking calculation', text: 'Out of scope for checking calculation' }
  ];
  qcRemarksValues = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Clear case but MF not recovered', text: 'Clear case but MF not recovered' },
    { value: 'Medical case but MF not recovered', text: 'Medical case but MF not recovered' },
    { value: 'Medical case but MF not recovered & Calculation difference is <= Rs.10/-', text: 'Medical case but MF not recovered & Calculation difference is <= Rs.10/-' },
    { value: 'Medical case but MF not recovered & Calculation difference is > Rs.10/-', text: 'Medical case but MF not recovered & Calculation difference is > Rs.10/-' },
    { value: 'Clear case with Calculation difference is <= Rs.10/-', text: 'Clear case with Calculation difference is <= Rs.10/-' },
    { value: 'Failed case with Calculation difference is > Rs.10/-', text: 'Failed case with Calculation difference is > Rs.10/-' }
  ];

  ulip_non_ulip_maturity = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Incorrect calculation', text: 'Incorrect calculation' },

  ]
  ulip_non_ulip_maturity_lock = [
    { value: 'Clear Case', text: 'Clear Case' },
    { value: 'Incorrect calculation', text: 'Incorrect calculation' },
    { value: 'Out Of Scope Lock-In Future SV Case', text: 'Out Of Scope Lock-In Future SV Case' }

  ]
  currentDate = new Date();
  constructor(private httpClient: HttpClient,
    //private datePipe: DatePipe
  ) {
    //this.currentDate = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');              
  }



  public updatePolicyData(policyData,uniqueid, moduleId, processId, requested_by, subModuleId, userid) {
    console.log('updatePolicyData :: policyData =>', policyData, moduleId, processId, requested_by, subModuleId, userid);

    console.log('currentDate >>', new Date());
    console.log(formatDate(new Date(), 'dd/MM/yyyy', 'en'));
    var date = new Date();
    var hours: any = date.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    var minutes: any = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var seconds: any = date.getMilliseconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    else if (seconds > 99) {
      seconds = seconds.toString().slice(0, 2);
    }
    // console.log('time>>')

    var timeStamp = hours + ':' + minutes + ':' + seconds;
    var dateStamp = formatDate(date, 'dd/MM/yyyy', 'en')
    console.log('timeStamp ::::', timeStamp);
    console.log('dateStamp ::::', dateStamp);

    let policyDetail = {
      'module_id': moduleId,
      'request_action': processId,
      'requested_by': requested_by,
      'policy_no': policyData['POLICY_NO'],
      'system_value': policyData['SYSTEM_VALUE'],
      'pq_qc_flag': policyData['PQ_QC_FLAG'],
      'qc_remarks': policyData['QC_REMARK'],
      'qc_date': dateStamp,
      'qc_time': timeStamp,
      'userid': userid,
      'UNI_ID_POL_DT':uniqueid
    };

    console.log('policyDetail ::', policyDetail);

    //let url = "../../assets/newData.json";
    //let url = 'http://localhost:6543/core/processOutputFlag';
  //  let url="../../assets/bulk_surrender.json"
  // let url="../../assets/payoutCalculate.json"
     let url = '/core/updateData';
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
      params: policyDetail
    };

    // console.log('policyDetail == ', policyDetail);
    return this.httpClient.post<any>(url, policyDetail, options);
   //  return this.httpClient.get<any>(url);

  }

  public fetchAfterQCPolicyData(moduleId, processId, subModuleId, startDate, endDate) {
    let detail = {
      'module_id': moduleId,
      'request_action': processId,
      'subModuleId': subModuleId,
      'startDate': startDate,
      'endDate': endDate
    };
    console.log('detail ::', detail);

    let url = '/core/fetchAfterQCData';//todo
    // let url = "../../assets/newData_afterQC.json";
    //  let url="../../assets/dataQuality.json"

    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
      params: detail
    };

    return this.httpClient.post<any>(url, detail, options);
    // return this.httpClient.get<any>(url);
  }

  public updateBulkPolicyData(policyData, moduleId, processId, requested_by, subModuleId) {
    console.log('updatePolicyData :: policyData =>', policyData);
    var date = new Date();
    var hours: any = date.getHours();
    if (hours < 10) {
      hours = '0' + hours;
    }
    var minutes: any = date.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    var seconds: any = date.getMilliseconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    else if (seconds > 99) {
      seconds = seconds.toString().slice(0, 2);
    }
    // console.log('time>>')

    var timeStamp = hours + ':' + minutes + ':' + seconds;
    var dateStamp = formatDate(date, 'dd/MM/yyyy', 'en')
    let policyArray = []
    for (let index = 0; index < policyData.length; index++) {
      let policyDetail = {
        'module_id': moduleId,
        'request_action': processId,
        'requested_by': requested_by,
        'policy_no': policyData[index]['POLICY_NO'],
        'system_value': policyData[index]['SYSTEM_VALUE'],
        'uni_id': policyData[index]['UNI_ID'],
        'pq_qc_flag': policyData[index]['PQ_QC_FLAG'],
        'qc_remarks': policyData[index]['QC_REMARKS'],
        'qc_date': dateStamp,
        'qc_time': timeStamp
      };
      policyArray.push(policyDetail)

    }
    console.log(policyArray);

    //let url = "../../assets/newData.json";
    // let url = 'http://localhost:6543/core/processOutputFlag';
     //let url="../../assets/bulk.json"
      // let url="../../assets/payoutCalculate.json"
   let url = '/core/updateData'; //TODO
    let httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    let options = {
      headers: httpHeaders,
      params: policyArray[0]
    };


    return this.httpClient.post<any>(url, policyArray, options);
    // return this.httpClient.get<any>(url);//TODO

  }

}
