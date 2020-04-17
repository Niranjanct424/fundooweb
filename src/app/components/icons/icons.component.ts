import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import { MatTooltip, MatDialog } from '@angular/material';
import { AmazingTimePickerService } from "amazing-time-picker";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ReminderDto } from 'src/app/models/reminder-dto.model';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() note: Note;
  // dialog: any;

  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar,private matDialog: MatDialog,
    private _amazingTimePicker: AmazingTimePickerService,
    private _router: Router,
    // private atp: AmazingTimePickerService,
    ) { }

// start reminderDate
    ngOnInit() {}
    selectedTime: string;
    // reminderDate: string;
    today: any;

    openTimePicker(noteId) {
      // pop up for setting alarm
      console.log("fetched note id for remainder : ", noteId);
      const amazingTimePicker = this._amazingTimePicker.open({
        time: this.selectedTime,
        // time: this.reminderDate,
        theme: "dark",
        arrowStyle: {
          background: "red",
          color: "white"
        }
      });
      // after choosing time from clock
      amazingTimePicker.afterClose().subscribe(time => {
      // storing the selected time in a variable with some string concatination
      this.selectedTime = time + ":00 hours";
      console.log("time selected : ", this.selectedTime);
      // this.note.reminderDate = this.selectedTime;
      console.log("time selected : ", this.note.reminderDate);
      // after getting data from clock call for remainder operation
      this.noteService.addRemainderToNote(noteId, this.selectedTime).subscribe(
        (response:any) => {
          console.log("response : ", response);
          this.matSnackBar.open(response.message, "ok", {
            duration: 4000
          });
        },
        errors => {
          console.log("errors", errors);
          if (errors.error.statusCode === 401) {
            localStorage.clear();
            this._router.navigateByUrl(`${environment.LOGIN_URL}`);
            this.matSnackBar.open(
              errors.error.message + " , login to continue.",
              "Opps!",
              {
                duration: 5000
              }
            );
          } else if (errors.error.statusCode === 502) {
            console.log(
              "alarm already set for that time : ",
              this.selectedTime
            );
            this.matSnackBar.open(errors.error.message, "Opps!", {
              duration: 5000
            });
          } else {
            this.matSnackBar.open(errors.error.message, "ok", {
              duration: 5000
            });
          }
        }
      );
    });
  }
// end




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




}