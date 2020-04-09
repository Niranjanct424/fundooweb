import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Login} from 'src/app/models/login.model';
import { HttpResponse , HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login:Login = new Login();

  constructor(private userService:UserService,private router:Router,private matSnackBar:MatSnackBar) { }

  ngOnInit() {
  }

  email = new FormControl(null,[Validators.required,Validators.email]);
  password= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);

  getEmailErrorMessage(){
    return this.email.hasError('required')? "Enter Email Id":
    this.email.hasError('email')? "EmailId not valid":
     "";
   }

   getPasswordErrorMessage(){
    return this.password.hasError('required')? "Enter Password":
    this.password.hasError('pattern')? "minimum 8 characters required":
     "";
   }

onSubmit()
{
  if(this.email.value&&this.password.value!=null){
this.login.emailId = this.email.value;
this.login.password = this.password.value;

this.userService.userLogin(this.login).subscribe(

  (response:any) =>{
console.log("message:"+response.message);
console.log("token:"+response.token);
    
localStorage.setItem('token' , response.token);
localStorage.setItem('email' , this.email.value);

this.matSnackBar.open(response.message , "Success", {duration:5000})
this.router.navigate(["/dashboard"]);
  
 },
 (error:any)=> {
   this.matSnackBar.open(error.error.message, "failed", {duration:5000})
 }

);
  }
  else{
    this.matSnackBar.open("enter the fields", "failed", {duration:5000})
  }

}

}