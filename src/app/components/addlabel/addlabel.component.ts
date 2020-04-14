import { Component, OnInit ,Inject} from '@angular/core';
import { Label } from 'src/app/models/label.model';
import { Note } from 'src/app/models/note.model';
import { LabelService } from 'src/app/services/label.service';
import { MatSnackBar , MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.scss']
})
export class AddlabelComponent implements OnInit {

  noteId:number;
  labels: Label[];
  label:Label = new Label();

  constructor(public dialogRef: MatDialogRef<AddlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private labelService: LabelService, private matSnackBar: MatSnackBar) {

       this.noteId = data.note.noteId;
       this.getAllLabel();

     }

  ngOnInit() {
  }

  getAllLabel(){
    this.labelService.getAllLabels().subscribe(
      (response:any) => {
        console.log("label list", response);
        this.labels = response.object;
    
      }
    );
  }


  createLabel(input){
    this.label.labelName = input;
    this.labelService.createLabel(this.label).subscribe(
      (response:any) => {
        console.log("input:", input);
        console.log("response:", response);
        this.matSnackBar.open("Label Created","Ok",{duration:3000});
    
      }
    );

  }

  addLabel(labelId:any){

    this.labelService.addLabel(labelId , this.noteId).subscribe(
      (response:any) => {
        console.log("labelId:",labelId);
        console.log("noteId:",this.noteId);

        this.matSnackBar.open("Label added","Ok",{duration:3000});
    
      }
    );

  }



}