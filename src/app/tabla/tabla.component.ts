import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TablaService } from './tabla.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


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
  displayedColumns: string[] = ['id', 'name', 'weight', 'symbol', 'acciones'];

  dataSource = new MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // No tuve que modificar nada
  constructor(private elementos: TablaService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getElementos();
  }

  // Carga los elementos desde el servicio
  getElementos() {
    this.elementos.getElement().subscribe({
      next: (res) => {
        // Ciclo de vida de la paginacion 
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        alert('Error')
      }
    })
  }

  // Agregar 
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogl = this.dialog.open(DialogComponent, {
      width: '350px',
      height: '400px',
      enterAnimationDuration,
      exitAnimationDuration
    }).afterClosed().subscribe(val => {
      if (val === 'Guardar') {
        this.getElementos();
      }
    })
  }

  //Editar 
  editElement(row: any, enterAnimationDuration: string, exitAnimationDuration: string,) {
    this.dialog.open(DialogComponent, {
      width: '350px',
      height: '400px',
      data: row,
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(val => {
      if (val === 'Actualizar') {
        this.getElementos();
      }
    })
  }

  // Eliminar 
  deleteElement(id: number, message: string, action: string) {
    this.elementos.deleteElement(id)
      .subscribe({
        next: (res) => {
          this.getElementos();
          let snackBarRef = this.snackBar.open(message, action, { duration: 2000 });
        },
        error: () => {
          alert("Error al elimiar el elemento");
        }
      })

  }

  // Filtro 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
