import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss']
})
export class DisplaynotesComponent implements OnInit {

  constructor(    private router: Router,
    private matSnackBar: MatSnackBar,
    private noteService:NoteService) { }

    token:String;
   notes: Note[];
  others : Note[];
  note = new Note();
  // notes = new Array<Note>();

  ngOnInit() {
    this.noteService.autoRefresh.subscribe(() => {
      this.getAllNotes();
    });
    this.getAllNotes();
  }

  getAllNotes(){
    this.noteService.getAllNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        console.log("notes",response.object);
        this.notes = response['object'];

      },  
      (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000})
      }
    );
  }
}