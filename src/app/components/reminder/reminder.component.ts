import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA , MatDialog ,MatSnackBar} from '@angular/material';
import { NoteService } from 'src/app/services/note.service';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';  
const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput:'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

interface Time {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ReminderComponent implements OnInit {

  date = new FormControl(moment());
  noteId:number;

  constructor(@Inject(MAT_DIALOG_DATA) public data : any ,private matSnackBar: MatSnackBar, private noteService:NoteService ,private matDialog: MatDialog) { 
    this.noteId = data.noteId;
  }

  ngOnInit() {
  }

  reminderTime:string;
  reminderDate:any;
  setReminder:any;

  times: Time[] = [
    {value: '9:00', viewValue: ' Morning 8:00 AM'},
    {value: '2:00', viewValue: 'Afternoon 1:00 PM'},
    {value: '7:00', viewValue: 'Evening 6:00 PM'},
    {value: '9:00', viewValue: 'Night 8:00 PM'}
  ];

  repeatReminder = [ {value: 'Does not repeat'},
  {value: 'Daily'},
  {value: 'Weekly'},
  {value: 'Monthly'},
  {value: 'Yearly'}];


saveReminder(date:any){
  console.log("noteId to add rem:",this.noteId)
  console.log("reminder date:" , date)
  console.log("reminder time:",this.reminderTime);

  this.setReminder = date+","+this.reminderTime+":00";

  console.log("reminder to add:",this.setReminder);
  
  let newDate = new Date(this.setReminder);
  console.log("formatted date:",newDate);
  
  let reminder={
    reminderDate:newDate
  }
  this.noteService.addReminder(this.noteId , reminder).subscribe(
    response => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "ok", { duration: 4000
      });
    }
  );
}
setTime(time:any){
  this.reminderTime = time;
}

dateFormat(){
  
  
}

}