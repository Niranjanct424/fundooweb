

import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable,Subject} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabelService {


  private labelUrl = environment.labelApiUrl;
  private createLabelUrl = environment.createLabelUrl;
private deleteLabelUrl = environment.deleteLabelUrl;
private updateLabelUrl = environment.updateLabelUrl;
private getLabelUrl = environment.getLabelsUrl;
private addLabelUrl = environment.addLabelUrl;

  constructor(private httpService:HttpService , private httpClient:HttpClient) { }

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json' ,token: localStorage.getItem("token")})
    };

  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }

  createLabel(label:any){
    return this.httpService.post(this.labelUrl+this.createLabelUrl,label,this.httpOptions).pipe(tap(()=>{ this.subject.next();}))
    
  }

  deleteLabel(label:any){
return this.httpService.delete(`${this.labelUrl}${this.deleteLabelUrl}?labelId=${label.labelId}` , this.httpOptions);
  }

  updateLabel(label:any){
    return this.httpService.put(`${this.labelUrl}${this.updateLabelUrl}?labelId=${label.labelId}`, label , this.httpOptions);
  }

  getAllLabels(){
    return this.httpService.get(this.labelUrl+this.getLabelUrl , this.httpOptions);
  }

  addLabel(labelId:number , noteId:number){
    return this.httpService.post(`${this.labelUrl}${environment.addLabelUrl}?labelId=${labelId}&noteId=${noteId}`,"" , this.httpOptions);
  }

  removeLabel(labelId:number , noteId:number){
    return this.httpService.post(`${this.labelUrl}${environment.removeLabelUrl}?labelId=${labelId}&noteId=${noteId}`,"" , this.httpOptions);
  }
}