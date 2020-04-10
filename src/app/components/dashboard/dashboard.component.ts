import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  value= '';
  constructor(private router:Router) { }

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

onArchive(){
  this.router.navigate(['/dashboard/displaynote'],{queryParams:{note:'archive'}});
  
}

}