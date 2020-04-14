import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar , MatDialog, MatDialogRef} from '@angular/material';
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Label } from 'src/app/models/label.model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  labels:Label[];
  isPinned: boolean;
 


  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar,
    private _router: Router,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.labels = this.note.labels;
    console.log('labels:',this.labels);
  }

  open(note) {
    console.log("note updating", note);
    const matDialogueReference = this.dialog.open(UpdatenoteComponent, {
      width: "auto",
      height: "auto",
      data: { note }
      });
      matDialogueReference.afterClosed().subscribe(result => {
      console.log("note updated");
    });
  }

pinned() {
  console.log("note fetched for pinn operation ", this.note);
  this.noteService.pinUnpinNote(this.note.noteId).subscribe(
    response => {
      console.log("response : ", response);
      if (response.statusCode === 200) {
        console.log("response code pinned", response.message);
        this.isPinned = true;
        this.matSnackBar.open(response.message, "Ok", {
          duration: 2000
        });
      } else {
        console.log("response code unpinned", response.message);
        this.isPinned = false;
        this.matSnackBar.open(response.message, "Ok", {
          duration: 2000
        });
      }
    },
    errors => {
      console.log("errors : ", errors);
      if (errors.error.statusCode === 401) {
        localStorage.clear();
        this._router.navigateByUrl(`${environment.loginUrl}`);
        this.matSnackBar.open(
          errors.error.message + " , login to continue.",
          "Opps!",
          {
            duration: 5000
          }
        );
      } else {
        this.matSnackBar.open(errors.error.message, "ok", {
          duration: 4000
        });
      }
    }
  );
}


deleteNote(){
  this.noteService.trashNote(this.note.noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
    );
}


deletePermanently(){
  this.noteService.deleteNotePermanently(this.note.noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
  );
}


 
}