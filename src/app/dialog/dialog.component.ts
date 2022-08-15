import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  datoForm! : FormGroup;
  constructor( private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.datoForm = this.formBuilder.group({
      name : ['',Validators.required],
      weight: ['',Validators.required],
      symbol: ['',Validators.required],
    })
  }

  addElement(){
    console.log(this.datoForm.value);
  }

}
