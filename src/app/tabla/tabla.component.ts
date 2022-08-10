import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TablaService } from './tabla.service';


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

export class TablaComponent implements OnInit{

  ELEMENT_DATA: PeriodicElement[] =[];

  // Nombre de las posibles columnas que se usaran 
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'acciones'];
  dataSource!: MatTableDataSource<any>

  @ViewChild(MatTable) table!: MatPaginator;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private _tablaservice: TablaService ){

  }

  ngOnInit(): void {
    this.cargarElementos();
  }

  // Carga los elementos desde el servicio
  cargarElementos(){
    this.ELEMENT_DATA = this._tablaservice.getElemento();
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  // Siclo de vida de la paginacion 
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
  eliminar( id: number ){
    console.log(id)
    // Se obtiene del servicio
    this._tablaservice.eliminarDato(id);
    this.cargarElementos();
  }

  

}
