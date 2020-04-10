
import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() note: Note;

  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar) { }

  
  ngOnInit() {
  }

  archieveNote()
  {
      this.noteService.archieveNote(this.note.noteId).subscribe(
      (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
      });
  }



}