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
  private getNotesUrl = environment.getAllNotesUrl;
  private pinNoteUrl = environment.pinNoteUrl;
  private archieveNoteUrl = environment.ARCHIVE_NOTE_URL;
  private trashNoteUrl = environment.trashUrl;
  private addColorUrl = environment.CHANGE_COLOR_NOTE_URL;
  private getArchieveNoteUrl = environment.getArchieveUrl;
  private getTrashedNoteUrl = environment.getTrashedUrl;
  private getPinnedNoteUrl = environment.getPinnedNoteUrl;
  private deleteNotePermanentlyUrl =environment.DELETE_FOREVER_NOTE_URL;

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

getAllNotes(){
  
  return this.httpService.get(this.noteApiUrl+this.getNotesUrl,this.httpOptions);
}



archieveNote(noteId:number){
  return this.httpService.put(this.noteApiUrl+this.archieveNoteUrl+noteId, "" , this.httpOptions);
}

public deleteNote(noteId: number) {
  console.log("service reached with id : " + noteId);
  console.log(
    `${environment.NOTE_API_URL}` +"/" +noteId +`${environment.DELETE_NOTE_URL}`);
  return this.httpService
    .deleteMethod(`${environment.NOTE_API_URL}` +"/" +noteId +`${environment.DELETE_NOTE_URL}`,
    this.httpService.httpOptions)
    .pipe(
      tap(() => {
        this._subject.next();
      })
    );
}


public archiveNote(noteId: number) {
  console.log("service reached with id : " + noteId);
  console.log(`${environment.NOTE_API_URL}` +"/" +noteId +`${environment.ARCHIVE_NOTE_URL}`
);
  return this.httpService
    .deleteMethod(`${environment.NOTE_API_URL}` +"/" +noteId +`${environment.ARCHIVE_NOTE_URL}`,this.httpService.httpOptions)
    .pipe(tap(() => {
        this._subject.next();
      })
    );
}

trashNote(noteId:number){
  return this.httpService.put(`${environment.noteApiUrl}` +"/" +noteId +`${environment.trashUrl}`,"",this.httpOptions);
}


public pinUnpinNote(noteId: number) {
  console.log("service reached with id : " + noteId);
  console.log(`${environment.noteApiUrl}` +"/" +noteId +`${environment.pinNoteUrl}`);
  return this.httpService
    .patchMethod(`${environment.noteApiUrl}` +"/" +noteId +`${environment.pinNoteUrl}`,"",this.httpOptions);
}

addColor(noteId:number , color:string){
  return this.httpService.put(`${this.noteApiUrl}${this.addColorUrl}?color=${color}&noteId=${noteId}`, "" , this.httpOptions);
}

public changeColorOfNote(noteId: number, color: string) {
  console.log("service reached with id : " + noteId);
  console.log(
    `${environment.NOTE_API_URL}` +
      "/" +
      noteId +
      `${environment.CHANGE_COLOR_NOTE_URL}${color}`
  );
  return this.httpService
    .patchMethod(
      `${environment.NOTE_API_URL}` +
        "/" +
        noteId +
        `${environment.CHANGE_COLOR_NOTE_URL}${color}`,
      {},
      this.httpService.httpOptions
    )
    .pipe(
      tap(() => {
        this._subject.next();
      })
    );
}

getArchieveNotes()
{
  return this.httpService.get(this.noteApiUrl+this.getArchieveNoteUrl,this.httpOptions);
}


getTrashedNotes()
{
  return this.httpService.get(this.noteApiUrl+this.getTrashedNoteUrl,this.httpOptions);
}

getPinnedNotes()
{
  return this.httpService.get(this.noteApiUrl+this.getPinnedNoteUrl , this.httpOptions);
}


}