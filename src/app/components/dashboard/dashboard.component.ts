import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

title: String;
  value= '';
  constructor(private router:Router , private noteService:NoteService) { }

  ngOnInit() {
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


refresh() {
  console.log("reloading");
window.location.reload();
}

onArchive(){
  this.router.navigate(['dashboard/displaynote'],{queryParams:{note:'archive'}});
  
}

onTrash(){
  this.router.navigate(['dashboard/displaynote'],{queryParams:{note:'trash'}});
}

// searchNote() {
//   this.noteService.setSearchNoteData(this.title);
// }
}