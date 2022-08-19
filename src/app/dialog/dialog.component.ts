import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from '../tabla/tabla.component';
import { TablaService } from '../tabla/tabla.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  datoForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private _tablaService: TablaService) {
    this.datoForm = this.formBuilder.group({
      name: ['', Validators.required],
      weight: ['', Validators.required],
      symbol: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    
  }

  addElement() {
    const element: PeriodicElement = {
      position: this.datoForm.value.position,
      name: this.datoForm.value.name,
      weight: this.datoForm.value.weight,
      symbol: this.datoForm.value.symbol,
    }
    console.log(element);
    this._tablaService.agregarElemento(element)
  }

}
