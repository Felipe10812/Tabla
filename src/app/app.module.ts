import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

// Componente de la tabla y modulos
import { TablaComponent } from './tabla/tabla.component';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
  ],
  imports: [
    BrowserModule,

    // Importacion de los modulos
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
