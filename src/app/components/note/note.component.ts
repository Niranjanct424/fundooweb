import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar , MatDialog, MatDialogRef} from '@angular/material';
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { Label } from 'src/app/models/label.model';
import { LabelService } from "src/app/services/label.service";
import { DatePipe } from '@angular/common';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  
  isPinned: boolean;
  labelsList: Label[];
  collaborators:User[];
  datePipeString : string;
  displayReminder :string;


  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar,
    private _router: Router,
    private dialog: MatDialog,
    private userService:UserService,
    private labelService: LabelService,
    private datePipe: DatePipe,
    ) {
        this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
     }

  ngOnInit()
   {
    this.labelsList = this.note.labelsList;
    console.log('labelslist:',this.labelsList);
    // this.getCollaborators();
    console.log("type of reminder:",typeof this.note.reminderDate);
    this.slice();
  }

  slice()
  {
    var rem = this.note.reminderDate;
    console.log("")
    var today = this.datePipeString;
    if(rem!=null){
      console.log("rem  "+rem);
var res = rem.slice(0,-9);
console.log("res"+res);
    }
    else{
      res = null;
    }
console.log("result:",res);
console.log("this only:",today);

const cal = new Date();
cal.setDate(cal.getDate() + 1);
var reminderDate =cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
var tommorrowDate = this.datePipe.transform(reminderDate,'yyyy-MM-dd');

if(today==res)
{
  this.displayReminder = "Today,8:00PM"

}

else if(tommorrowDate==res){
this.displayReminder = "Tommorrow,8:00AM"
}

else{
  this.displayReminder = rem;
}

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

remove(label:any){
  this.labelService.removeLabel(label.labelId , this.note.noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
  );
}


removeReminder(noteId:any)
{
  this.noteService.deleteReminder(noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
  )
}

getCollaborators()
{
 this.userService.getCollaborators(this.note.noteId).subscribe(
  (response:any)=>{
    // this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
    this.collaborators = response['object'];
    console.log("collaborators list:",this.collaborators);
  },
  (error:any)=> {
      this.matSnackBar.open(error.error.message, "failed", {duration:5000});
    }
 ) 
}

 
}