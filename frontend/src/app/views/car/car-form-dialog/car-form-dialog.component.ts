import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { CarService } from '../../../shared/services/car.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-form-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './car-form-dialog.component.html',
  styleUrl: './car-form-dialog.component.css'
})
export class CarFormDialogComponent {

  public carForm!: FormGroup;
  
  durationInSeconds = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<CarFormDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private carService: CarService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carForm = this.fb.group({
      brand:  [this.data?.brand   || '', [Validators.required]],
      model:  [this.data?.model   || '', [Validators.required]],
      year:   [this.data?.year    || '', [Validators.required,  Validators.pattern('^[0-9]*$'), Validators.minLength(4), Validators.maxLength(4)]],
      price:  [this.data?.price   || '', [Validators.required], Validators.pattern('^[0-9]*$')],
      mileage:[this.data?.mileage || '', [Validators.required], Validators.pattern('^[0-9]*$')]
    });
  }

  save(){
    (this.data?.id) ? this.update(this.data.id) : this.create();
  }

  create(){
    this.carService.create(this.carForm.value).subscribe({
      next: (response) => {
        this.cancel();
        this.alertSnack('Cadastro realizado com sucesso!').afterDismissed().subscribe(() => {
          window.location.reload()
        });
      },
      error: (error) => {
        this.alertSnack(error);
      }
    });
  }

  update(id: number){
    this.carService.update(id, this.carForm.value).subscribe({
      next: (response) => {
        this.cancel();
        this.alertSnack('Registro alterado com sucesso!').afterDismissed().subscribe(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        this.alertSnack(error);
      }
    });
  }

  cancel(){
    this.dialogRef.close(true);
    this.carForm.reset();
  }

  alertSnack(msg: string){
    return this._snackBar.open(msg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    })
  }

}
