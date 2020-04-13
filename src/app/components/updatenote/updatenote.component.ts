import { Component, OnInit ,Inject } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {

  note:Note;

  constructor(private noteService: NoteService,public matDialogRef: MatDialogRef<UpdatenoteComponent>,
    private snackbar: MatSnackBar , @Inject(MAT_DIALOG_DATA) public data: any) {
      this.note=this.data.note;
     }

  ngOnInit() {
  }

  onSubmit(){
    this.matDialogRef.close();
    this.noteService.updateNote(this.note.noteId , this.note).subscribe(
      (response: any) => {
        this.snackbar.open(response['message'], "ok", {duration: 4000});
      },
      errors => {
        this.snackbar.open(errors.error.message, "failed", {duration: 4000 });
      }
    );
  }

}