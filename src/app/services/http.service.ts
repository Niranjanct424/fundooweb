import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }

  public post(url:any , body:any , head:any){

    return this.http.post(url,body,head);
  }

  public put(url:any , body:any , head:any){

    return this.http.put(url,body,head);
  }

  public get(url :any,options :any):any{
    return this.http.get(url,options);
  }
}