import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private httpErrorMessage: string;
  router: any;

  get getErrorMessage(): string {
    return this.httpErrorMessage;
  }

  constructor(private http: HttpClient) {
  }

  public get currentUserValue(): User {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  login(userType: string, userName: string, password: string) {
    //TODO send userType also tocheck authentication
    localStorage.clear();
    sessionStorage.clear();

    //  var currentUser = '{"authenticated":true}';
    // var userDetailsObj = {
    //   "currentUser": currentUser,
    //   "validLogin": true
    // };

    // return userDetailsObj

    var url = '/core/login';

    return this.http.post(url, { userType: userType, login: userName, password: password })
      .toPromise().then((user => {
        console.log('checkUserDetails :: ', user);
        console.log('user id name', userName);
        // sessionStorage.setItem('currentUser', JSON.stringify(user)); //07-05-21
        sessionStorage.setItem('userName', userName);
        sessionStorage.setItem('userType', userType);
        var userDetailsObj = {
          "currentUser": JSON.stringify(user),
          "validLogin": true
        };
        setTimeout(() => {
          this.router.navigate(['login']);
          console.log('user logout');
        }, 14400000)

        // return true;
        return userDetailsObj;
      })).catch((error: HttpErrorResponse) => {
        console.log(error);
        this.errorHandler(error);
        return false;
      });
  }

  logout() {
    // sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('login');
    localStorage.clear();
  }

  errorHandler(error: HttpErrorResponse): boolean {
    if (error.status === 400) {
      this.httpErrorMessage = 'Server Error';
    } else if (error.status === 403) {
      this.httpErrorMessage = 'Forbidden!!';
    } else {
      this.httpErrorMessage = 'Server Error!!';
    }
    return false;
  }
}
