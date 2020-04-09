import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  isPinned: boolean;

  // colorsList = [
  //   [
  //     { 
  //       colorCode: "rgba(198, 222, 255,1)", name: "Blue" 
  //     },
  //     { 
  //       colorCode: "rgba(229, 228, 226,1)", name: "Gray" 
  //     },
  //     { 
  //       colorCode: "rgba(230, 169, 236,1)", name: "Pink" 
  //     },
  //   ],
  //   [
  //     { 
  //       colorCode: "rgba(233, 171, 23,1)", name: "Yellow" 
  //     },
  //     { 
  //       colorCode: "rgba(249, 150, 107,1)", name: "Orange" 
  //     },
  //     { 
  //       colorCode: "rgba(255,255,255,1)", name: "white" 
  //     },
  //   ]
  // ]

  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar,
    private _router: Router,
    // private dialog: MatDialog,
    ) { }

  ngOnInit() {
  }

//   pinNote()
//   {
//   this.noteService.pinNote(this.note.noteId).subscribe(
//   (response :any) => {
//     console.log("response : ", response);
//     this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
//   },
//   (error:any)=>{
//     this.matSnackBar.open("note pinned ", "failed to pin note", {duration:5000})
//   }
// );
  
// }
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

}