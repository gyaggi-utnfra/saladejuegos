import { Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { SignUpComponent } from './vistas/sign-up/sign-up.component';
import { QuienSoyComponent } from './vistas/quien-soy/quien-soy.component';
import { HomeComponent } from './vistas/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';


export const routes: Routes = [
    
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'home', component: HomeComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' } 
    /*{
 
        path: 'login',
        loadComponent: () => import('./vistas/login/login.component').then((m) => m.LoginComponent)
    },
   */
];
