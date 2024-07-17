import { Component } from '@angular/core';
import {Validators,FormGroup, FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { NgIf } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, NgIf, MatInputModule, MatButtonModule, ReactiveFormsModule],
  providers:[AuthService, Router],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formLogin!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {

    this.formLogin = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
    });

  }
  
  ngOnInit(): void {
   
  }

  addUser(): void {
    const dialogRef = this.dialog.open(UserFormDialogComponent);
  }
  
  criarForm(){
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  logar(){
    this.authService.login(this.formLogin.value.email, this.formLogin.value.password).subscribe({
      next: () =>{  
        this.router.navigate(['home']);
      },
      error: () => console.log("erro")
    })
  }

}
