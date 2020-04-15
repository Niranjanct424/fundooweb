import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import { MatTooltip, MatDialog } from '@angular/material';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() note: Note;
  // dialog: any;

  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar,private matDialog: MatDialog) { }

  colorsList = [
    
    [
      { colorCode: "rgba(255,255,255,1)", name: "white" },
      { colorCode: "rgba(231, 116, 113,1)", name: "Red" },
      { colorCode: "rgba(249, 150, 107,1)", name: "Orange" },
      { colorCode: "rgba(233, 171, 23,1)", name: "Yellow" }
    ],
    [
      { colorCode: "rgba(137, 195, 92,1)", name: "Green" },
      { colorCode: "rgba(132, 139, 121,1)", name: "Teal" },
      { colorCode: "rgba(198, 222, 255,1)", name: "Blue" },
      { colorCode: "rgba( 114, 143, 206,1)", name: "Dark blue" }
    ],
    [
      { colorCode: "rgba( 158, 123, 255,1)", name: "Purple" },
      { colorCode: "rgba(230, 169, 236,1)", name: "Pink" },
      { colorCode: "rgba(194, 178, 128,1)", name: "Brown" },
      { colorCode: "rgba(229, 228, 226,1)", name: "Gray" }
    ]
  ]

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
  

deleteNote(){
  this.noteService.trashNote(this.note.noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
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

openLabel(note): void {
  const dialogRef = this.matDialog.open(AddlabelComponent, {
    width: '250px', height: 'auto', data: { note }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('matdialog closed');
  });
}

addLabelToNoteDialog(note) {
  console.log(
    "fetched Note on add label Click sending the data to add label component : ",
    note
  );
  const dialogReference = this.matDialog.open(AddlabelComponent, {
    width: "280px",
    height: "auto",
    data: { note }
  });
  dialogReference.afterClosed().subscribe(result => {
    console.log("dialog closed with out any change");
  });
}

// openLabel(note): void {
//   const dialogRef = this.matDialog.open(AddlabelComponent, {
//     width: '250px', height: 'auto', data: { note }
//   });
//   dialogRef.afterClosed().subscribe(result => {
//     console.log('matdialog closed');
//   });
// }



}