import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl , FormGroup} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import {Note} from 'src/app/models/note.model';
import { HttpResponse , HttpHeaders } from '@angular/common/http';
import { ReminderComponent } from '../reminder/reminder.component';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-createnotes',
  templateUrl: './createnotes.component.html',
  styleUrls: ['./createnotes.component.scss']
})
export class CreatenotesComponent implements OnInit {

  constructor(private noteService:NoteService,private router:Router,private matSnackBar:MatSnackBar,
    private matDialog: MatDialog ,private datePipe: DatePipe) { 
      this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
    }

  // @Input() note: Note;
  // noteId: number;

  noteModel:Note = new Note();

  reminderDate:string;
  datePipeString : string;
  tommorrowDate:string;
  setReminderDate:string;
  newDate:any=null;

  ngOnInit() {
  }

  title=new FormControl('',[Validators.required]);
  description=new FormControl('',[Validators.required]);

  open:boolean = false;

  openNote(){
    this.open = true;
  }

  onSubmit()
  {
  if(this.title.value&&this.description.value!=null)
  {
    this.noteModel.title = this.title.value;
    this.noteModel.description = this.description.value;
    this.noteModel.reminderDate = this.newDate;

    console.log("reminder to set:",this.newDate);
    this.noteService.createNote(this.noteModel).subscribe(

      (response:any)=>{
        console.log("message:"+response.message);
        this.matSnackBar.open("note created" ,"success" , {duration:5000})
      },
      (error:any)=>{
        this.matSnackBar.open("Note not created", "failed", {duration:5000})
      }
    );
  }

  else{
    this.matSnackBar.open("Notes not created", "failed", {duration:5000})
  }
    }
  
    datePicker() {
      this.matDialog.open(ReminderComponent, {
        data : " ",
        panelClass: 'custom-dialog-container'
      });
      
      }
    
nextWeek()
  {
  let time:string="9:00";
  const cal = new Date();
  cal.setDate(cal.getDate() + ((1 + 7 - cal.getDay()) % 7)+2);  
  this.reminderDate = cal.getMonth() + 1 + '-' + cal.getDate() + '-' + cal.getFullYear();
  console.log(" remider next week "+this.reminderDate);
  this.setReminderDate = this.reminderDate+","+time+":00";


  this.newDate = new Date(this.setReminderDate);
  
}


  
  today()
  {
    let time:string="9:00";
  this.reminderDate = this.datePipeString+","+time+":00";
  this.newDate = new Date(this.reminderDate);
  console.log("Formated date:",this.newDate);
  }





  
  tommorrow()
  {
    let time:string="9:00";
    const cal = new Date();
    cal.setDate(cal.getDate() + 1);
    this.reminderDate =cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
    this.tommorrowDate = this.datePipe.transform(this.reminderDate,'yyyy-MM-dd');
    console.log("tommorrow date:",this.tommorrowDate);
    this.setReminderDate = this.tommorrowDate+","+time+":00";
  
  
    // this.reminderDate = cal.getFullYear() + ':' + cal.getMonth() + ':' + cal.getDate();
    console.log("set date:",this.setReminderDate);
    this.newDate = new Date(this.setReminderDate);
  console.log("Formated date:",this.newDate);
  
  }
  }