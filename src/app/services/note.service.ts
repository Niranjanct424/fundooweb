import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {Note} from 'src/app/models/note.model';
import { Subject} from 'rxjs';
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { Color } from '../models/color.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  public noteColor: Color;

  private noteApiUrl = environment.noteApiUrl;
  private createNoteUrl = environment.createNoteUrl;
  private pinNoteUrl = environment.pinNoteUrl;
  private archieveNoteUrl = environment.archieveUrl;
  private trashNoteUrl = environment.trashUrl;
  private addColorUrl = environment.addColorUrl;
  private deleteNotePermanentlyUrl = environment.deletePermanentlyUrl;

  private getArchieveNoteUrl = environment.getArchieveUrl;
  private getTrashedNoteUrl = environment.getTrashedUrl;
  private getNotesUrl = environment.getAllNotesUrl;
  private getPinnedNoteUrl = environment.getPinnedNoteUrl;
  

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json' ,token: localStorage.getItem("token")})
    };

  constructor(private httpService:HttpService , private httpClient:HttpClient) { }

  // private subject = new Subject<any>();
  private _notesList = new Subject<any>();
  private _subject = new Subject<any>();
  private _content = new BehaviorSubject<number>(0);
  public share = this._content.asObservable();
  

  public get autoRefresh() {
    return this._subject;
  }

createNote(noteDetail:any):Observable<any>
{
  console.log("note:",noteDetail);
  return this.httpService.post(this.noteApiUrl+this.createNoteUrl,noteDetail,{headers:new HttpHeaders({'token':localStorage.token})});
}

pinNote(noteId:number)
{
  console.log("noteId:"+noteId);
  return this.httpService.put(this.noteApiUrl+this.pinNoteUrl+noteId,"",this.httpOptions);
}

getAllNotes(){
  
  return this.httpService.get(this.noteApiUrl+this.getNotesUrl,this.httpOptions);
}





// public deleteNote(noteId: number) {
//   console.log("service reached with id : " + noteId);
//   console.log(
//     `${environment.NOTE_API_URL}` +"/" +noteId +`${environment.DELETE_NOTE_URL}`);
//   return this.httpService
//     .deleteMethod(`${environment.NOTE_API_URL}` +"/" +noteId +`${environment.DELETE_NOTE_URL}`,
//     this.httpService.httpOptions)
//     .pipe(
//       tap(() => {
//         this._subject.next();
//       })
//     );
// }
archieveNote(noteId:number){
  return this.httpService.put(this.noteApiUrl+this.archieveNoteUrl+noteId , "" , this.httpOptions);
}



deleteNotePermanently(noteId:number)
{
  return this.httpService.delete(this.noteApiUrl+this.deleteNotePermanentlyUrl+noteId,this.httpOptions);
}

trashNote(noteId:number)
{
  return this.httpService.put(this.noteApiUrl+this.trashNoteUrl+noteId, "" , this.httpOptions);
}


public pinUnpinNote(noteId: number) 
{
  console.log("service reached with id : " + noteId);
  console.log(`${environment.noteApiUrl}` +"/" +noteId +`${environment.pinNoteUrl}`);
  return this.httpService
    .patchMethod(`${environment.noteApiUrl}` +"/" +noteId +`${environment.pinNoteUrl}`,"",this.httpOptions);
}

addColor(noteId:number , color:string){
  // var params = { color: colors };
  // var config = { params: params };
  return this.httpService.put(`${this.noteApiUrl}${this.addColorUrl}?noteId=${noteId}&color=${color}`, "" , this.httpOptions);
}


getArchieveNotes()
{
  return this.httpService.get(this.noteApiUrl+this.getArchieveNoteUrl,this.httpOptions);
}


getTrashedNotes():Observable<any>
{
  return this.httpService.get(this.noteApiUrl+this.getTrashedNoteUrl,this.httpOptions);
}

getPinnedNotes()
{
  return this.httpService.get(this.noteApiUrl+this.getPinnedNoteUrl , this.httpOptions);
}


}