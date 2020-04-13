import { Router } from "@angular/router";
import { NoteService } from "src/app/services/note.service";
import { LabelService } from "src/app/services/label.service";
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from "@angular/material";
import { Component, OnInit, Inject, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { Note } from 'src/app/models/note.model';
import { Label } from 'src/app/models/label.model';

@Component({
  selector: "app-add-label",
  templateUrl: "./add-label.component.html",
  styleUrls: ["./add-label.component.scss"]
})
export class AddLabelComponent implements OnInit {
  fetchedNote: Note;
  label: Label;
  labelsList: Label[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _labelService: LabelService,
    private dialogRef: MatDialogRef<AddLabelComponent>,
    private _noteService: NoteService,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {
    // saving the fetched data to a variable
    this.fetchedNote = this.data.note;
    this._labelService.autoRefesh.subscribe(() => {
      this.displayAllLabels();
    });
  }

  ngOnInit() {
    //  it will display during page load
    this.displayAllLabels();
  }

  displayAllLabels() {
    this._labelService.getAllLabelsList().subscribe(response => {
      console.log("response : ", response);
      // transfering all data of response to a listArray variable
      this.labelsList = response.obj;
      console.log("labels list after transfering data : ", this.labelsList);
    });
  }
  done() {
    console.log("dialog ref is closed .");
    this.dialogRef.close();
  }

  addNoteToLabel(label) {
    console.log("fetched lebel : ", label, "fetched note : ", this.fetchedNote);
    this._labelService
      .mapNoteToLabel(this.fetchedNote.noteId, label.labelId)
      .subscribe(
        response => {
          console.log("response : ", response);
          this._matSnackBar.open(response.message, "ok", {
            duration: 4000
          });
        },
        errors => {
          console.log("errors : ", errors);
          if (errors.error.statusCode === 401) {
            localStorage.clear();
            this._router.navigateByUrl(`${environment.LOGIN_URL}`);
            this._matSnackBar.open(
              errors.error.message + " , login to continue.",
              "Opps!",
              {
                duration: 5000
              }
            );
          } else {
            this._matSnackBar.open(errors.error.message, "ok", {
              duration: 4000
            });
          }
        }
      );
  }
}