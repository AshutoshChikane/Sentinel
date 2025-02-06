import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectTrackerService {

  constructor( private httpClient : HttpClient) { }

  public data : any=new BehaviorSubject('');
  public currentData :any = this.data.asObservable();


  public addData (data){
    let url = '/core/ProjectTrackerAdd';    //TO
    // let url="../../assets/projecttracker.json"
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      // params: processDetails
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , data, options ); //TODO remove comments
  }


  public existingData (data){
    let url = '/core/ProjectTrackerExisting';    //TO
    // let url="../../assets/projecttracker.json"
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      // params: processDetails
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , data, options ); //TODO remove comments
  }


  setMessage(data:any){
    this.data.next(data);
  }
  
  getMessage(){
    return this.currentData;
  }


  public Updated (data){
    let url = '/core/ProjectTrackerUpdate';    //TO
    // let url="../../assets/projecttracker.json"
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      // params: processDetails
    }; 

    // return this.httpClient.get<any>(url);
    return this.httpClient.post<any>(url , data, options ); //TODO remove comments
  }


  public Delete (data){
    let url = '/core/ProjectTrackerDelete';    //TO
    // let url="../../assets/projecttracker.json"
    console.log(url)
    let httpHeaders = new HttpHeaders( { 'Content-Type' : 'application/json' });    
    let options = {
      headers: httpHeaders,
      // params: processDetails
    }; 

    // return this.httpClient.delete<any>(url);
    return this.httpClient.post<any>(url , data, options ); //TODO remove comments
  }
}
