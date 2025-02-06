import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValDashboardService {

  constructor( private httpClient : HttpClient) { }

  public data : any = new BehaviorSubject('');
  public currentData :any = this.data.asObservable();

  public monthOnMonth : any = new BehaviorSubject('');
  public currentMonthOnMonth :any = this.monthOnMonth.asObservable();

  public checklist(value: any) {
    const url = '/core/CheckList';
    // const url="../../assets/monthonmonth.json";
    //  let url="../../assets/valChecklist.json"
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {
      headers: httpHeaders
    };

    console.log('Request URL:', url);
    console.log('Request Body:', value);

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url, value, options);
  }


// For Month on Month check-list

   public checklistSave(data: any)  {
    let url ='/core/SaveCheckList' ;
    // let url="http://localhost:3000/UpdatedData"
    //  let url="../../assets/monthonmonth.json"
    const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = {
      headers: httpHeaders,
    };
// return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url, data, options);
  }


  setMessage(Data:any){
    this.data.next(Data);
  }
  
  getMessage(){
    return this.currentData;
  }


  setMonthOnMonth(Data: any){
    this.monthOnMonth.next(Data);
  }

  getMonthOnMonth(){
    return this.currentMonthOnMonth
  }
}
