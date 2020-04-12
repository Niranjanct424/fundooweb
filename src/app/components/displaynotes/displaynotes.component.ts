import { Component, OnInit } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router , ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';


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

  constructor(    private route: Router,
    private matSnackBar: MatSnackBar,
    private noteService:NoteService , private router:ActivatedRoute) { }

   private param:any;

  ngOnInit() {
    this.router.queryParams.subscribe(params=>{this.param=params['note'];
    if (this.param == "archive") 
    {
      this.getArchivedNotes();
    }
    else if(this.param == "trash")
    {
      this.getTrashedNotes();
    }
    else
    {
     this.getOtherNotes();
     this.getPinnedNotes();
     
    }
    
  
    });
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


  getArchivedNotes(){

    this.archiveNotes = true;
    this.trashedNotes = false;
    
    this.noteService.getArchieveNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        this.notes = response['object'];
          
      }
    );
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


}













// import { Component, OnInit } from '@angular/core';
// import { Note } from 'src/app/models/note.model';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { Router } from '@angular/router';
// import { NoteService } from 'src/app/services/note.service';
// import { filter } from 'rxjs/operators';

// @Component({
//   selector: 'app-displaynotes',
//   templateUrl: './displaynotes.component.html',
//   styleUrls: ['./displaynotes.component.scss']
// })
// export class DisplaynotesComponent implements OnInit {

//   constructor(    private router: Router,
//     private matSnackBar: MatSnackBar,
//     private noteService:NoteService) { }

//     token:String;
//    notes: Note[];
//   others : Note[];
//   note = new Note();
//   // notes = new Array<Note>();

//   ngOnInit() {
//     this.noteService.autoRefresh.subscribe(() => {
//       this.getAllNotes();
//     });
//     this.getAllNotes();
//   }

//   getAllNotes(){
//     this.noteService.getAllNotes().subscribe(

//       (response: any) => {
//         console.log("response", response);
//         console.log("notes",response.object);
//         this.notes = response['object'];

//       },  
//       (error:any)=> {
//         this.matSnackBar.open(error.error.message, "failed", {duration:5000})
//       }
//     );
//   }
// }