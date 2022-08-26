import { Component, Inject, OnInit } from '@angular/core';
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

  datoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private elementos: TablaService) {

    this.datoForm = this.formBuilder.group({
      name: ['', Validators.required],
      weight: ['', Validators.required],
      symbol: ['', Validators.required],
      position: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }

  addElement(){
    console.log(this.datoForm.value);
    if( this.datoForm.valid){
      this.elementos.postElement(this.datoForm.value).subscribe({
        next:( res ) => {
          alert("Elemento añadido");
        },
        error:() => {
          alert("Error al añadir el elemento");
        }
      })
    }
  }

}
