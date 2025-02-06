import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({  providedIn: 'root'}) 
export class DataQualityMisService {
  ColumnChart: any;

  constructor( private httpClient: HttpClient) { }

  
  public misdaily( processDetails ) {
    console.log('sendProcessDetails :: ', processDetails );
    // console.log(this.processMap[process]);
     
     let url = '/core/mis';     //new link used
    // let url="../../assets/misDQ.json" ;
  
    console.log('url ===', url);

    //Make a call to API and get response which will be displayed inside the dashboard table

    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: processDetails
    }; 

    return this.httpClient.post<any>(url , processDetails, options ); //TODO remove comments
    // return this.httpClient.get<any>(url);
  }


  public DQgraph( processDetails ) {
    console.log('sendProcessDetails :: ', processDetails );
    // console.log(this.processMap[process]);
     
     let url = '/core/misgraph';     //new link used
    // let url="../../assets/graph.json"
    console.log('url ===', url);

    //Make a call to API and get response which will be displayed inside the dashboard table

    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: processDetails
    }; 

    return this.httpClient.post<any>(url , processDetails, options ); //TODO remove comments
    // return this.httpClient.get<any>(url);
  }
  
 


  public selectMonth( processDetails ) {
    console.log('sendProcessDetails :: ', processDetails );
    // console.log(this.processMap[process]);
     
     let url = '/core/selectMonth';     //new link used
    // let url="../../assets/graph.json"
 
    console.log('url ===', url);

    //Make a call to API and get response which will be displayed inside the dashboard table

    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: processDetails
    }; 

    return this.httpClient.post<any>(url , processDetails, options ); //TODO remove comments
    // return this.httpClient.get<any>(url);
  }


  public QCData( processDetails ) {
    console.log('sendProcessDetails :: ', processDetails );
    // console.log(this.processMap[process]);
     
    let url = '/core/NegativeUnits';    //new link used
    // let url="../../assets/QC_data.json"
 
    console.log('url ===', url);

    //Make a call to API and get response which will be displayed inside the dashboard table

    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: processDetails
    }; 

    return this.httpClient.post<any>(url , processDetails, options ); //TODO remove comments
    // return this.httpClient.get<any>(url);
  }


  public AllModule( processDetails ) {
    console.log('sendProcessDetails :: ', processDetails );
    // console.log(this.processMap[process]);
     
     let url = '/core/all_Module';     //new link used
    // let url="../../assets/DQ_Module.json"
 
    console.log('url ===', url);

    //Make a call to API and get response which will be displayed inside the dashboard table

    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      params: processDetails
    }; 

    return this.httpClient.post<any>(url , processDetails, options ); //TODO remove comments
    // return this.httpClient.get<any>(url);
  }



 
}
  

