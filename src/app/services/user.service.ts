import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {User} from 'src/app/models/user.model';
import {Login} from 'src/app/models/login.model';
import {ForgotPassword} from 'src/app/models/forgot-password.model';
import {ResetPassword} from 'src/app/models/reset-password.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiUrl = environment.userApiUrl;

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json'})
    };

  constructor(private httpService:HttpService) { }

  userRegister(user:User):Observable<any>
  {
    console.log("user mail:"+user.emailId);
    console.log("user pass:"+user.password);
    return this.httpService.post(this.userApiUrl+environment.registerUrl,user,this.httpOptions);
  }

  userLogin(login:Login):Observable<any>
  {

     return this.httpService.post(this.userApiUrl+environment.loginUrl,login,this.httpOptions);
  }

  userForgotPassword(forgotPassword:ForgotPassword):Observable<any>
  {
    console.log(this.userApiUrl+environment.forgotPasswordUrl+"?emailId="+forgotPassword.emailId);
    return this.httpService.post(this.userApiUrl+environment.forgotPasswordUrl+"?emailId="+forgotPassword.emailId,'','');
  }

  userSetPassword(resetPassword:ResetPassword , token:String)
  {
    // console.log(this.userApiUrl+environment.resetPasswordUrl+token);
    return this.httpService.put(this.userApiUrl+environment.resetPasswordUrl+token,resetPassword,this.httpOptions);
  }

  userVerification(token:String)
  {
    return this.httpService.put(this.userApiUrl+environment.userVerificationUrl+token,"" , this.httpOptions);
  }
//   addCollaborator(user: number,email:any): Observable<any> 
//   { 
//     return this.httpService.post(environment.colaborators+'?email='+email+'&noteId='+user,{},{headers:new HttpHeaders({"token":localStorage.token})});
// }
addCollaborator(noteId:number , email:any)
{
  return this.httpService.post(`${this.userApiUrl}${environment.addCollaboratorUrl}?noteId=${noteId}&email=${email}`, {}, {headers:new HttpHeaders({'token':localStorage.token})});
}
deleteCollaborator(noteId:number , email:any)
{
  return this.httpService.delete(`${this.userApiUrl}${environment.deleteCollaboratorUrl}?email=${email}&noteId=${noteId}`, {headers:new HttpHeaders({'token':localStorage.token})}); 
}

getCollaborators(noteId:number)
{
  return this.httpService.get(`${this.userApiUrl}${environment.getCollaboratorsUrl}?noteId=${noteId}`, {headers:new HttpHeaders({'token':localStorage.token})});
}

}
