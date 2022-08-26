import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TablaService } from './tabla.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})

export class TablaComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];

  // Nombre de las posibles columnas que se usaran 
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acciones'];

  // Ni idea de si funcionara :)
  // Si funciono pero no creo que sea de la forma correcta pero no se que mas hacer
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // No tuve que modificar nada
  constructor(private _tablaService: TablaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    /* this.cargarElementos(); */
  }

  // Carga los elementos desde el servicio
  /* cargarElementos() {
    this.ELEMENT_DATA = this._tablaService.getElemento();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  } */

  // Ciclo de vida de la paginacion 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Filtro 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Eliminar 
  eliminar(index: number) {
    /* console.log(index)
    // Se obtiene del servicio
    this._tablaService.eliminarDato(index);
    this.cargarElementos(); */
  }

  // Agregar 
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogl = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }

}
