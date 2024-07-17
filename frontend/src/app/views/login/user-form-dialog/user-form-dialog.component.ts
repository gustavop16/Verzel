import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { UserService } from '../../../shared/services/user.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.css'
})
export class UserFormDialogComponent {

  public userForm!: FormGroup;

  durationInSeconds = 3;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    public dialogRef: MatDialogRef<UserFormDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  createUser(){        
    this.userService.create(this.userForm.value).subscribe({
      next: (response) => {
        this.cancel();
        this.alertSnack('Cadastro realizado com sucesso!')
      },
      error: (error) => {
        this.alertSnack(error);
      }
    });
  }

  cancel(){
    this.dialogRef.close(true);
    this.userForm.reset();
  }

  alertSnack(msg: string){
    return this._snackBar.open(msg, 'X', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    })
  }
}
