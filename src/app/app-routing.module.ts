import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserVerificationComponent } from './components/user-verification/user-verification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreatenotesComponent } from './components/createnotes/createnotes.component';
import { NoteComponent } from './components/note/note.component';
import { DisplaynotesComponent } from './components/displaynotes/displaynotes.component';
import { UpdatenoteComponent } from './components/updatenote/updatenote.component';
import { AddLabelComponent } from './components/add-label/add-label.component';
// import { WorkshopComponent } from './components/workshop/workshop.component';

const routes: Routes = [
 
  {path:"registration" , component:RegistrationComponent},
  // {path:"" , component:LoginComponent},
  {path:"" , component:AddLabelComponent},

  {path:"login" , component:LoginComponent},
  {path:"forgotPassword" , component:ForgotPasswordComponent},
  {path:"resetPassword/:token" , component:ResetPasswordComponent},
  {path:"userVerification/:token" , component:UserVerificationComponent},


  // {path:"dashboard" , component:DashboardComponent,
  // children:[{path:"" , redirectTo: "/dashboard/displaynote", pathMatch: "full"},
  // {path:"createnotes" , component:CreatenotesComponent},
  // {path:"displaynote" , component:DisplaynotesComponent},]
  // },


  {path:"dashboard" , component:DashboardComponent,
  children:[{path:"" , component:DisplaynotesComponent},
  {path:"createnotes" , component:CreatenotesComponent},
  {path:"displaynote" , component:DisplaynotesComponent},
  {path:"update" , component:UpdatenoteComponent},
  {path:"note" , component:NoteComponent}
  ]},

  {path:"update" , component:UpdatenoteComponent},
  {path:"note" , component:NoteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
