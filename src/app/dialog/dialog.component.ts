import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ElementoS } from '../elemento-s';
import { PeriodicElement } from '../tabla/tabla.component';
import { TablaService } from '../tabla/tabla.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  datoForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ElementoS) {

    this.datoForm = this.formBuilder.group({
      name: ['', Validators.required],
      weight: ['', Validators.required],
      symbol: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }

}
