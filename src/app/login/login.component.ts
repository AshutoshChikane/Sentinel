import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageDialogComponent } from "../dialog/message/message.component";
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signInForm = new FormGroup({
    user_id: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
	user_type: new FormControl('', [
	  Validators.required
	])
  });
  
  forgot_password_flag = 'email';
  selected = 'None';
  
 
  @ViewChild('messageDlg', { static: false })
  messageDlg: MessageDialogComponent;

  constructor(private router: Router,
    private dialog: MatDialog,
    private login: LoginService) {
  }

  ngOnInit() {
    this.forgot_password_flag = 'email'
  }

  @ViewChild('forgotPassword', { static: true }) editDialog: TemplateRef<any>;
  openDialogWithTemplateRef(templateRef: TemplateRef<any>) {
    this.dialog.open(templateRef, { disableClose: true })
  }

  canSubmit(): boolean {
    return this.signInForm.valid;
  }
  
  canChangePassword() : boolean {
	  console.log(this.signInForm.controls['user_type'].value, this.signInForm.controls['user_id'].value);
	  
	  /*if( this.signInForm.controls['user_type'].value  != '' || this.signInForm.controls['user_id'].value != '' ) {
		  return true;		  
	  } else {
		  return false;
	  }
	  */
	  return this.signInForm.valid;
  }

  failedLoginAttempts: number = 0;
  account_locked: boolean = false;
  errorMessage ='';
  loginAttemptsDetails = {};
  showOverlay = false;
  
  displayMessage =false;
  isError=false;
  messageType;
  messageDetails;

  messagePopup;
  openConfirmationBox = false;
  privateKey = this.signInForm.controls['password']

  async submit() {
        
    // sessionStorage.setItem('login', 'true');
    // this.router.navigate(['dashboard-page']);
    // console.log(this.selected);
    
   
   //TODO remove comments
    if(this.signInForm.value['user_type']=='Product Calender'){
      this.router.navigate(['product-dashboard']);
    }
    else{
      let rel;
      rel = await this.login.login(this.signInForm.controls['user_type'].value,
       this.signInForm.controls['user_id'].value,
       'hdtjkmayjshyer725r69sjhgdt@#$ESGRY#@@#' + this.privateKey.value +'hdtjkmayjshyer725r69sjhgdt@#$ESGRY#@@#');
       console.log('after login :: rel ::', rel);
      if (rel && rel.validLogin) {
        // let user = JSON.parse(sessionStorage.getItem('currentUser'))
        let user = JSON.parse(rel.currentUser);//07-05-21
          localStorage.setItem('userid', rel.login )
        console.log('login: userDetails ::', user );
        console.log('user id name',user.login);
        console.log('user id name',user.name);



        if(user.user_already_active >= "1"){
          this.messagePopup = "User already active";
          this.openConfirmationBox = true;
          return
        }

        
        if (user['authenticated']) {
          // if( user['login_attempts'] && user['login_attempts'] == 0 ) {

          //   this.messagePopup = "Change the password first";//07-05-21
          //   this.openConfirmationBox = true;

          //   // var retVal = confirm("Change the password first");
          //   // if( retVal == true ) {
          //   //   //this.router.navigate(['change-password']);  
          //   //   this.router.navigate(['change-password'], { state: { 
          //   //       user_type: this.signInForm.controls['user_type'].value,
          //   //       user_id: this.signInForm.controls['user_id'].value
          //   //       } 
          //   //     }
          //   //   )        
          //   // } 
          //   // else{
          //   //   return;
          //   // }
          // }
          //else {
            sessionStorage.setItem('login', 'true');  
            if(this.signInForm.controls['user_type'].value === 'Group_user') {
              this.router.navigate(['groups-payout']);
            }   
            else {
              this.router.navigate(['ChooseDashboardComponent']);

            }     
         // }
        }
        else { 
          console.log('not valid login')  
          this.messageType = 'Error Message :  ';
          this.messageDetails = "Login credentials don't match";
          this.isError=true;  
          this.displayMessage =true;
          sessionStorage.setItem('login', 'false');
          // alert("Login credentials don't match")
          return
        }
      }
      else{
        console.log('not valid user');

      }
    }
  }

  showAlert(response) {
    this.displayMessage = false;
  }
  
  showMessage( response ) {
    this.openConfirmationBox = false;
    if ( response == 'OK' ) {
      // this.router.navigate(['change-password'], { state: { 
      //     user_type: this.signInForm.controls['user_type'].value,
      //     user_id: this.signInForm.controls['user_id'].value
      //     } 
      //   }
      // )
      return;
    }
    if ( response == 'CANCEL' ){
      return;
    }
    // this.ngZone.run(() =>{ console.log('view refreshed') });
  }
  
  changePassword() {
    if (this.forgot_password_flag == 'email') {
      this.forgot_password_flag = 'otp'
      return
    }
    if (this.forgot_password_flag == 'otp') {
      this.forgot_password_flag = 'pass'
      return
    }
    if (this.forgot_password_flag == 'pass') {
      this.forgot_password_flag = 'email'
      this.dialog.closeAll()
      return
    }
  }
}
