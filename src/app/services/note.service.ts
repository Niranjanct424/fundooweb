import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {Note} from 'src/app/models/note.model';
import { Subject} from 'rxjs';
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private noteApiUrl = environment.noteApiUrl;
  private createNoteUrl = environment.createNoteUrl;
  private getNotesUrl = environment.getAllNotesUrl;
  private pinNoteUrl = environment.pinNoteUrl;
  private archieveNoteUrl = environment.archieveUrl;
  private trashNoteUrl = environment.trashUrl;
  private addColorUrl = environment.addColorUrl;
  private getArchieveNoteUrl = environment.getArchieveUrl;
  private getTrashedNoteUrl = environment.getTrashedUrl;
  private getPinnedNoteUrl = environment.getPinnedNoteUrl;

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json' ,token: localStorage.getItem("token")})
    };

  constructor(private httpService:HttpService , private httpClient:HttpClient) { }

  private subject = new Subject<any>();
  

  public get autoRefresh() {
    return this.subject;
  }

createNote(noteDetail:any):Observable<any>
{
  console.log("note:",noteDetail);
return this.httpService.post(this.noteApiUrl+this.createNoteUrl,noteDetail,{headers:new HttpHeaders({'token':localStorage.token})});
}

getAllNotes(){
  
  return this.httpService.get(this.noteApiUrl+this.getNotesUrl,this.httpOptions);
}

// pinNote(noteId:number)
// {
//   console.log("noteId",noteId);
//   this.httpService.put(this.noteApiUrl+"/"+noteId+this.pinNoteUrl,"",this.httpOptions);
// }

archieveNote(noteId:number){
  return this.httpService.put(this.noteApiUrl+"/"+noteId+this.archieveNoteUrl , "" , this.httpOptions);
}

trashNote(noteId:number){
  return this.httpService.put(this.noteApiUrl+"/"+noteId+this.trashNoteUrl, "" , this.httpOptions);
}


public pinUnpinNote(noteId: number) {
  console.log("service reached with id : " + noteId);
  console.log(`${environment.noteApiUrl}` +"/" +noteId +`${environment.pinNoteUrl}`);
  return this.httpService
    .patchMethod(`${environment.noteApiUrl}` +"/" +noteId +`${environment.pinNoteUrl}`,"",this.httpOptions);
}

addColor(noteId:number , color:string){
  return this.httpService.put(`${this.noteApiUrl}${this.addColorUrl}?noteId=${noteId}&color=${color}`, "" , this.httpOptions);
}


}