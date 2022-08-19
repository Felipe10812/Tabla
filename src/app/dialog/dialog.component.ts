import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PeriodicElement } from '../tabla/tabla.component';
import { TablaService } from '../tabla/tabla.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  datoForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private _tablaService: TablaService, public dialogRef: MatDialogRef<DialogComponent>, 
    ) {
  /* @inject(MAT_DIALOG_DATA) public data: PeriodicElement */
      this.datoForm = this.formBuilder.group({
        name: ['', Validators.required],
        weight: ['', Validators.required],
        symbol: ['', Validators.required],
      })
  }

  ngOnInit(): void {
    
  }


}

/* @Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class elemnto{
  constructor( public ){

  }
} */