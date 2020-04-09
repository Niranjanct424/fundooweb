import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {ResetPassword} from 'src/app/models/reset-password.model';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword:ResetPassword = new ResetPassword();

  constructor(private userService:UserService,private router:Router,private route:ActivatedRoute,private matSnackBar:MatSnackBar) { }

  token:string;

  ngOnInit() {
    
    this.token = this.route.snapshot.paramMap.get("token");
  }

  
  password= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  confirmPassword= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);



   getPasswordErrorMessage(){
    return this.password.hasError('required')? "Enter Password":
    this.password.hasError('pattern')? "minimum 8 characters required":
     "";
   }

   getConfirmPasswordErrorMessage(){
    return this.confirmPassword.hasError('required')? "Enter Password":
    this.confirmPassword.hasError('pattern')? "minimum 8 characters required":
     "";
   }

   onSubmit()
   {
    if(this.password.value===this.confirmPassword.value){
    this.resetPassword.password = this.password.value;
    this.resetPassword.confirmPassword = this.confirmPassword.value;
    this.userService.userSetPassword(this.resetPassword , this.token).subscribe(
      (response:any) =>{
        
        console.log("token:"+this.token);
         this.matSnackBar.open("Password reset success", "success", {duration:5000})
         this.router.navigate(["/login"]);
      },
      (error:any)=> {
        this.matSnackBar.open("Check credentials", "failed", {duration:5000})
      }

    );
   }
   else
   {
    this.matSnackBar.open("Password mismatch", "Failed", {duration:5000})
   }
   }

}