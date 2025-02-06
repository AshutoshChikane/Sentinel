import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NegativeUnitService {

  constructor(private httpClient : HttpClient) { }


  public submodule (data){
    console.log('inside fetchData DQ')
    let url = '/core/NegativeUnits';    //TO
    // let url="../../assets/valuation.json"
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      // params: processDetails
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , data, options ); //TODO remove comments
  }


  public Summary (data){
    console.log('inside fetchData DQ')
    let url = '/core/NegativeUnits';    //TO
    // let url="../../assets/summary.json"
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      // params: processDetails
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , data, options ); //TODO remove comments
  }

  public compareSummary (data){
    console.log('inside fetchData DQ');
    
    // let url="../../assets/compareSumm.json"
    let url = '/core/NegativeUnits';    //TO
    
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      // params: processDetails
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , data, options ); //TODO remove comments
  }
  
}
