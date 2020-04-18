import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {
  ownerName:String="Niranjan";
  ownerEmail;
  noteId:number;
  collaborators:User[];

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
  private noteService:NoteService,private userService:UserService,
  private matSnackBar: MatSnackBar) 
  {
    this.noteId = data.noteId;
  }
  
  
  ngOnInit() {
    this.ownerEmail = localStorage.getItem('email');
    this.getCollaborators();
  }

  addCollaborator(email)
  {
    console.log("email to add:",email);
    this.userService.addCollaborator(this.noteId , email).subscribe(
      (response:any)=>{
        this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      },
      (error:any)=> {
          this.matSnackBar.open(error.error.message, "failed", {duration:5000});
        }
    )
  }

  removeCollaborator(email)
  {
    console.log("email to remove:",email);
  this.userService.deleteCollaborator(this.noteId , email).subscribe(
    (response:any)=>{
      this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
    },
    (error:any)=> {
        this.matSnackBar.open(error.error.message, "failed", {duration:5000});
      }
  );
    }

    getCollaborators()
    {
     this.userService.getCollaborators(this.noteId).subscribe(
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
