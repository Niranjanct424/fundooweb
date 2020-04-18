import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteService } from 'src/app/services/note.service';
import { Label } from 'src/app/models/label.model';
import { LabelService } from 'src/app/services/label.service';
import { MatDialog } from '@angular/material';
import { EditlabelComponent } from '../editlabel/editlabel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title: String;
  value= '';
  labelsList: Label[];
  
  constructor(private router:Router , private noteService:NoteService,private labelService: LabelService,
    private matDialog: MatDialog) {
    this.labelService.autoRefresh.subscribe(() => {
      this.getAllLabels();
    });
   }

    view: boolean = false;
    grid = "row";
    getView() {
      if(this.view==true){
        this.view=false;
        this.grid="row";
      }
      else{
        this.view=true;
        this.grid="column";
      }
        // this.router.navigate(['/dashboard/displaynote'], { queryParams: { note: 'view', view: this.grid } });
        this.noteService.setView(this.grid);
        console.log(this.view);
    }
   



  ngOnInit() {
    this.getAllLabels();
  }

  onClick()
  {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  getEmail()
  {
    return localStorage.getItem('email');
  }


  refresh()
   {
    console.log("reloading");
    window.location.reload();
  }

  onArchive()
  {
    this.router.navigate(['dashboard/displaynote'],{queryParams:{note:'archive'}});
  }

  onTrash()
  {
    this.router.navigate(['dashboard/displaynote'],{queryParams:{note:'trash'}});
  }

  searchNote() 
  {
    this.noteService.setSearchNoteData(this.title);
  }

  getAllLabels()
  {
    this.labelService.getAllLabels().subscribe(
      (response:any)=>
      {
        this.labelsList = response['object'];
      });
  }

  openEditLabelDialog() {
    const dialogRef = this.matDialog.open(EditlabelComponent,
      {
      width: "300px",
      height: "Auto",
      data:this.labelsList,
    }
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log("dialog closed");
    });
  }

  getNotes(label){
    this.router.navigate(['dashboard/displaynote'],{queryParams:{ note: 'label', value: label.labelId }});
  }
}