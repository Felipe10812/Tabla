import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Importaciones de Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';


@NgModule({
  declarations: [],

  // Angular Material 
  exports:[
    CommonModule,
    BrowserAnimationsModule,
    MatSliderModule,

  ]
})
export class MaterialModule { }
