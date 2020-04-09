import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import {ForgotPassword} from 'src/app/models/forgot-password.model';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword:ForgotPassword = new ForgotPassword();

  constructor(private userService:UserService,private matSnackBar:MatSnackBar) { }



  ngOnInit() {
  }

  email = new FormControl(null,[Validators.required,Validators.email]);

  getEmailErrorMessage(){
    return this.email.hasError('required')? "Enter Email Id":
    this.email.hasError('email')? "EmailId not valid":
     "";
   }

   onSubmit(){

    this.forgotPassword.emailId = this.email.value;
     this.userService.userForgotPassword(this.forgotPassword).subscribe(

      (response:any) => {
        console.log(response.message);
        this.matSnackBar.open("Check mail to verify", "succesfull", {duration:5000})
     },

     (error:any)=> {
       this.matSnackBar.open(error.error.message, " " , {duration:5000})
     }
     );
   }

}