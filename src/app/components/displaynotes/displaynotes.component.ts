import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { MatSnackBar,MatDialog } from '@angular/material';
import { Router , ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { LabelService } from 'src/app/services/label.service';
import { ReminderComponent } from '../reminder/reminder.component';


@Component({
  selector: 'app-displaynotes',
  templateUrl: './displaynotes.component.html',
  styleUrls: ['./displaynotes.component.scss']
})
export class DisplaynotesComponent implements OnInit {

  trashedNotes: boolean = false;
  archiveNotes: boolean = false;
  pinnedNotes: boolean = false;

  others=new Array<Note>();
  notes = new Array<Note>();
  pinned = new Array<Note>();
  searchNotes: any;
  labelId:number;
  view:any;

  constructor(    private route: Router,
    private matSnackBar: MatSnackBar,
    private noteService:NoteService ,
    private matDialog: MatDialog,
     private router:ActivatedRoute,
     private labelService:LabelService) { }

   private param:any;

  ngOnInit() 
  {
    this.noteService.autoRefresh.subscribe(() => {
      this.getOtherNotes();
      this.getPinnedNotes();
    });

    this.router.queryParams.subscribe(params=>{this.param=params['note'];
    if (this.param == "archive") 
    {
      this.getArchivedNotes();
      this.getView();
    }
    else if(this.param == "trash")
    {
      this.getTrashedNotes();
    }
    else if(this.param == "rem")
    {
      this.reminderNotes();
    }
    // else if(this.param == "rem")
    // {
    //   this.reminderNotes();
    // }
//     else if(this.param == "view")
//     {
// this.view = params['view'];
// console.log("view type:",this.view);
// // this.getOtherNotes();
// this.getPinnedNotes();
//     }
    else if(this.param == "label" )
    {
      // this.pinnedNotes = false;
  // 
console.log("param labelId:",params['value']);
this.labelId = params['value'];
this.getLabelNotes();
    }
    else
    {
     this.getOtherNotes();
     this.getPinnedNotes();
     this.getView();
     
    }
    
    
    });
    this.getSearchNotes();
    
  }

  getOtherNotes(){

    this.trashedNotes = false;
    this.archiveNotes = false;

    this.noteService.getAllNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        console.log("notes:",response.object);
        this.others = response['object'];
         this.others.filter(note=>note.pinned===false&&note.archived===false&&note.trashed==false).map(note=>this.notes.push(note));
      },  
      (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000})
      }
    );
  }


  getArchivedNotes()
  {
    this.archiveNotes = true;
    this.trashedNotes = false;
    
    this.noteService.getArchieveNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        this.notes = response['object'];       
      });
    }


  getTrashedNotes(){
    this.trashedNotes = true;
   
    this.noteService.getTrashedNotes().subscribe(

      (response: any) => {
        console.log("response", response);
      
        this.notes = response['object'];
          
      }
    )
  }

  getPinnedNotes(){

    this.pinnedNotes = true;
    this.trashedNotes = false;
    this.archiveNotes = false;

    this.noteService.getPinnedNotes().subscribe(
    (response: any) => {
    console.log("response", response);
    console.log("notes:",response.object);
    this.pinned = response['object'];
    }
  // (error:any)=> {
  //   this.matSnackBar.open(error.error.message, "failed", {duration:5000})
  // }
    );
  }

  getSearchNotes()
  {
    this.noteService.getSearchNotes().subscribe(
    (message: any) => {
      console.log("searchtitle",message.notes);
      this.searchNotes = message.notes;
     });
    }

    getView()
   {
      this.noteService.getView().subscribe(
      (response:any)=>{
      this.view=response.view;
         });  
   }
   getLabelNotes(){
    this.labelService.getNotesByLabel(this.labelId).subscribe(
      (response: any) => {
        console.log("getnotesby labelID response", response);
      
        this.notes = response['object'];
          
      }
    )
  }
  reminderNotes()
  {
    this.noteService.getAllNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        console.log("notes:",response.object);
        this.others = response['object'];
         this.others.filter(note=>note.reminderDate != null).map(note=>this.notes.push(note));
      },  
      (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000})
      }
    );
  }


    


}

  










