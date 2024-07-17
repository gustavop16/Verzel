import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { authGuard } from './shared/guard/auth.guard';
import { CarShowComponent } from './views/car/car-show/car-show.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'car/show/:id',
        component: CarShowComponent,
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login'
      }
    
];
