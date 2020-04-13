import { Component, OnInit, Inject } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { Label } from 'src/app/models/label.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {
  fetchedNote: Note;
  label: Label;
  labelsList: Label[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private _labelService: LabelService,
    private dialogRef: MatDialogRef<AddLabelComponent>,
    private _noteService: NoteService,
    private _matSnackBar: MatSnackBar,
    private _router: Router
  ) {
    // saving the fetched data to a variable
    // this.fetchedNote = this.data.note;
    // this._labelService.autoRefesh.subscribe(() => {
    //   this.displayAllLabels();
    // });
  }

  ngOnInit() {
  }

}
