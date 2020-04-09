// import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-workshop',
//   templateUrl: './workshop.component.html',
//   styleUrls: ['./workshop.component.scss']
// })
// export class WorkshopComponent implements OnInit {
//   public displayName = true;
//   public name = "Niranjan";
//   public isDisabled=true;
//   public myId = "nameId"
//   public siteUrl = window.location.href;
//   public myname = "";
//   public hasError = true;
//   public isSpecial = false;
//   public  successClasss = true;
//   public myfavcol = "orange"
//   public clickinfo ="";
//   public banna ="yellow";
//   public messageClasses = {
//     "text-success":this.successClasss,
//     "text-danger":!this.hasError,
//     "text-isSpecial":this.isSpecial
//   }

//   @Input('parentData') personname;
//   @Output() public childEvent = new EventEmitter();
//   public message="";

//   public colors =["red","green","pink","yelow"];

//   constructor() { }

//   ngOnInit() {
//   }

//   public funName()
//   {
//     return this.name;
//   }

//   public fireEvent()
//   {
//     this.childEvent.emit('Hello angular comes from child to parent');
//   }

//   public onClick(event)
//   {
//     console.log(event);
    
//     this.clickinfo="thank u for click";
//   }
//   logMessage(value)
//   {
//     console.log(value);
//   }

// }
