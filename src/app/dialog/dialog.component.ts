import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TablaService } from '../tabla/tabla.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  datoForm!: FormGroup;
  actionBta: string = "Agregrar elemento";
  actionBtn: string = "Guardar";
  durationInseconds = 5;

  constructor(private formBuilder: FormBuilder, private elementos: TablaService, private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any, private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
    this.datoForm = this.formBuilder.group({
      name: ['', Validators.required],
      weight: ['', Validators.required],
      symbol: ['', Validators.required],
    });

    if (this.editData) {
      this.actionBta = "Editar elemento";
      this.actionBtn = "Actualizar";
      this.datoForm.controls['name'].setValue(this.editData.name);
      this.datoForm.controls['weight'].setValue(this.editData.weight);
      this.datoForm.controls['symbol'].setValue(this.editData.symbol);
    }
  }

  addElement() {
    console.log(this.datoForm.value);
    if (!this.editData) {
      if (this.datoForm.valid) {
        this.elementos.postElement(this.datoForm.value).subscribe({
          next: (res) => {
            this.datoForm.reset();
            this.dialogRef.close('Guardar');
          },
          error: () => {
            alert("Error al añadir el elemento");
          }
        })
      }
    } else {
      this.updateElement();
    }
  }

  updateElement() {
    this.elementos.putElement(this.datoForm.value, this.editData.id).subscribe({
      next: (res) => {
        this.datoForm.reset();
        this.dialogRef.close('Actualizar');
      },
      error: () => {
        alert("Ocurrio un error");
      }
    })
  }

  openSnackBar(message: string, action: string) {
    let snackBarRef = this.snackBar.open(message, action, {duration: 2000});

    snackBarRef.afterDismissed().subscribe(() => {

    });

    snackBarRef.onAction().subscribe(() => {

    });

  }
}
