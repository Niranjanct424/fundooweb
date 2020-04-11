import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpOptions(arg0: string, arg1: {}, httpOptions: any) {
    throw new Error("Method not implemented.");
  }

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
  public patchMethod(url: any, body: any, options: any): Observable<any> {
    return this.http.patch(url, body, options);
  }

  public deleteMethod(url: string, options: any): Observable<any> {
    return this.http.delete(url, options);
  }
}