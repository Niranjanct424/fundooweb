import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { NoteService } from 'src/app/services/note.service';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  onenote: any;
  email: any;
  user:User=new User();
  collarr: any; 

  email1 = new FormControl();
  message:string;
  ToData: any[];

  constructor(private userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  
  
  ngOnInit() {
    this.email = localStorage.getItem('email');
  }

  writeEmail() {
    console.log(this.email1.value);
    let addColl = {
      "email ": this.email1.value
    }
    console.log("Add coll-->", addColl);
    console.log("data-->", this.data);
        this.userService.addCollaborator(this.data.noteId,this.email1.value).subscribe((res: any) => {
  console.log("Getting all collab users--->", res);

    })
  }

}
