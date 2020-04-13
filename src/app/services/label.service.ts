import { NoteService } from "src/app/services/note.service";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { HttpService } from "./http.service";
import { Subject } from "rxjs";
import { Label } from "../models/label.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LabelService {
  private _subject = new Subject<any>();

  constructor(private _httpservice: HttpService) {}

  private fetchAllLabelsUrl: string = `${environment.LABEL_API_URL +
    environment.GET_ALL_LABELS_URL}`;

  private createLabelUrl: string = `${environment.LABEL_API_URL +
    environment.CREATE_LABEL_URL}`;

  private renameLabelUrl: string = `${environment.LABEL_API_URL +
    environment.RENAME_LABEL_URL}`;

  private mapNoteToLabelUrl: string = `${environment.LABEL_API_URL +
    environment.MAP_NOTE_TO_LABEL}`;

  public get autoRefesh() {
    return this._subject;
  }

  public getAllLabelsList() {
    console.log("all list fetching from service : ");
    return this._httpservice.get(
      this.fetchAllLabelsUrl,
      this._httpservice.httpOptions
    );
  }
  public createLabel(newLabel: any) {
    console.log("create label service reached");
    return this._httpservice
      .post(this.createLabelUrl, newLabel, this._httpservice.httpOptions)
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public deleteLabel(labelId: number) {
    console.log("delete label service reached with label id : ", labelId);
    return this._httpservice
      .deleteMethod(
        `${environment.LABEL_API_URL}` +
          "/" +
          labelId +
          `${environment.DELETE_LABEL_URL}`,
        this._httpservice.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }

  public renameLabel(labelId: number, labelName: string) {
    console.log("rename label service reached ");
    return this._httpservice
      .put(
        `${environment.LABEL_API_URL}` +
          "/" +
          labelId +
          `${environment.RENAME_LABEL_URL}` +
          labelName,
        {},
        this._httpservice.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }
  public mapNoteToLabel(noteId: number, labelId: any) {
    console.log("map a note to level service reached ");
    console.log(
      this.mapNoteToLabelUrl + "labelId=" + labelId + "&noteId=" + noteId
    );
    return this._httpservice
      .put(
        this.mapNoteToLabelUrl + "labelId=" + labelId + "&noteId=" + noteId,
        {},
        this._httpservice.httpOptions
      )
      .pipe(
        tap(() => {
          this._subject.next();
        })
      );
  }
}