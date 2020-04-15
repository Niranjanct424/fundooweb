import { Component, OnInit ,Inject} from '@angular/core';
import { Label } from 'src/app/models/label.model';
import { LabelService } from 'src/app/services/label.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {

  label: Label = new Label();
  labelsList: Label[];
  labelName:string;
  // labelsList: Label[];

  constructor(public matDialogRef: MatDialogRef<EditlabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private labelService:LabelService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit() {

    this.labelsList = this.data;
    console.log("labels for edit:",this.labelsList);
  }

  createLabel(){
    this.labelService.createLabel(this.label).subscribe(
      (response:any)=>{
        this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      },
      (error:any)=> {
          this.matSnackBar.open(error.error.message, "failed", {duration:5000});
        }
    );
  }

  deleteLabel(label:Label){
    this.labelService.deleteLabel(label).subscribe(
      (response:any)=>{
        this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      },
      (error:any)=> {
          this.matSnackBar.open(error.error.message, "failed", {duration:5000});
        }
    );
  }

  updateLabel(label:Label,input:any){
    label.labelName = input.value;
    console.log("labelName to update:",label.labelName)
    this.labelService.updateLabel(label).subscribe(
      (response:any)=>{
        this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      },
      (error:any)=> {
          this.matSnackBar.open(error.error.message, "failed", {duration:5000});
        }
    );
  }

  done(){
    this.matDialogRef.close();
  }
}
