import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';

import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserVerificationComponent } from './components/user-verification/user-verification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreatenotesComponent } from './components/createnotes/createnotes.component';
import { DisplaynotesComponent } from './components/displaynotes/displaynotes.component';
import { NoteComponent } from './components/note/note.component';
import { from } from 'rxjs';
import { IconsComponent } from './components/icons/icons.component';
import { NotePipe } from './pipes/pipes/note.pipe';
import { UpdatenoteComponent } from './components/updatenote/updatenote.component';
import { AddlabelComponent } from './components/addlabel/addlabel.component';
import { EditlabelComponent } from './components/editlabel/editlabel.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import { AmazingTimePickerModule } from 'amazing-time-picker';
import { LabelPipe } from './pipes/pipes/label.pipe';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
// @import "~ng-pick-datetime/assets/style/picker.min.css";

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    UserVerificationComponent,
    DashboardComponent,
    CreatenotesComponent,
    DisplaynotesComponent,
    NoteComponent,
    IconsComponent,
    NotePipe,
    UpdatenoteComponent,
    AddlabelComponent,
    EditlabelComponent,
    LabelPipe,
    CollaboratorComponent,

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSidenavModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatDividerModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatListModule,
    MatChipsModule,
    AmazingTimePickerModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
    

  ],
  entryComponents: [
    EditlabelComponent,
    CollaboratorComponent
  ],
  


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }