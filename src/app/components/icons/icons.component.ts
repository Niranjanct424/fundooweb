
import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from "@angular/material";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() note: Note;

  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar,
    private _matSnackBar: MatSnackBar,
    private _router: Router,
    // private _amazingTimePicker: AmazingTimePickerService,
    private _matDialog: MatDialog
    ) { }

    colorsList = [
      [
        { 
          colorCode: "rgba(198, 222, 255,1)", name: "Blue" 
        },
        { 
          colorCode: "rgba(229, 228, 226,1)", name: "Gray" 
        },
        { 
          colorCode: "rgba(230, 169, 236,1)", name: "Pink" 
        },
      ],
      [
        { 
          colorCode: "rgba(233, 171, 23,1)", name: "Yellow" 
        },
        { 
          colorCode: "rgba(249, 150, 107,1)", name: "Orange" 
        },
        { 
          colorCode: "rgba(255,255,255,1)", name: "white" 
        },
      ]
    ]

  ngOnInit() {
  }

  archieveNote()
  {
      this.noteService.archiveNote(this.note.noteId).subscribe(
      (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
      });
  }

  archive() {
    console.log("note fetched for archive", this.note);
    this.noteService.archiveNote(this.note.noteId).subscribe(
      response => {
        console.log("response : ", response);
        // archive
        if (response.statusCode === 200) {
          this._matSnackBar.open(response.message + " sucessfully", "ok", {
            duration: 4000
          });
          // urarchive
        } else {
          this._matSnackBar.open(response.message + " sucessfully", "ok", {
            duration: 4000
          });
        }
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

  changeColor(color){
    console.log(color.name);
    this.noteService.addColor(this.note.noteId , color.name).subscribe(
      response => {
        console.log("response : ", response);
        this.matSnackBar.open(response['message'], "ok", {
          duration: 4000
        });
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


}