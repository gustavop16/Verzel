import {Component, OnInit} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DatePipe} from '@angular/common';
import { CarService } from '../../../shared/services/car.service';
import { CarModel } from '../../../shared/models/car.model';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { CarFormDialogComponent } from '../car-form-dialog/car-form-dialog.component';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatProgressSpinnerModule, 
    MatTableModule, 
    MatSortModule, 
    MatIconModule,
    MatPaginatorModule, 
    DatePipe,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl:'./list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['brand', 'model', 'year', 'price', 'mileage', 'action'];
  dataSource = new MatTableDataSource(); 
  orderPrice: boolean = true;
  orderMileage : boolean = true;

  durationInSeconds = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private carService: CarService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.getCar();
   }
 
   getCar(){
    this.carService.getAll().subscribe(response => { 
      this.dataSource.data = response.data;
    });
  }

  addCar(): void {
    this.dialog.open(CarFormDialogComponent);
  }

  edit(car: CarModel){
    this.dialog.open(CarFormDialogComponent, {
      data: car
    });
  }

  show(id: number){
    this.router.navigate(['car/show/'+id]);
  }

  destroy(id: number){
    this.carService.destroy(id).subscribe({
      next: (response) => {
        this.getCar();
        this.alertSnack('Registro excluído!')
      },
      error: (error) => {
        this.alertSnack(error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      return data.brand.toLowerCase().includes(filter) || data.year.toString().includes(filter);
    };
  }

  sortData(column: string) {
      switch (column) {
        case 'mileage': {
          const isAsc = this.orderMileage;
          this.orderMileage = (!this.orderMileage);
          return this.sortBy(column, isAsc )
        }
        case 'price': {
          const isAsc = this.orderPrice;
          this.orderPrice = (!this.orderPrice);
          return this.sortBy(column, isAsc );
        }
        default: return 0;
      }
  }

  sortBy(field: string, order: boolean ) {
    this.dataSource.data = this.dataSource.data.sort((a: any, b: any) => {
      if(order){
        return a[field] < b[field] ? -1 : 1;
      }else{
        return b[field] < a[field] ? -1 : 1;
      }
    });
  }

  alertSnack(msg: string){
    return this._snackBar.open(msg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    })
  }
  
}

