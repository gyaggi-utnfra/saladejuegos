import { Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { SignUpComponent } from './vistas/sign-up/sign-up.component';
import { QuienSoyComponent } from './vistas/quien-soy/quien-soy.component';
import { HomeComponent } from './vistas/home/home.component';
import { authGuard } from './core/guards/auth-guard.guard';
import { JuegosComponent } from './vistas/juegos/juegos.component';
import { MayorMenorComponent } from './vistas/juegos/mayor-menor/mayor-menor.component';
import { AhorcadoComponent } from './vistas/juegos/ahorcado/ahorcado.component';
import { PreguntadosComponent } from './vistas/juegos/preguntados/preguntados.component';
import { BlackJackComponent } from './vistas/juegos/black-jack/black-jack.component';


export const routes: Routes = [
    
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'quien-soy', component: QuienSoyComponent },
    { path: 'home', component: HomeComponent, data: {midata: "El home de la aplicacion para usuarios logueados."},canActivate: [authGuard]},
    {
        path: 'juegos',
        component: JuegosComponent,
        children: [
            {
                path: 'mayor-menor',
                component: MayorMenorComponent
            },
            {
                path: 'ahorcado',
                component: AhorcadoComponent
            },
            {
                path: 'preguntados',
                component: PreguntadosComponent
            },
            {
                path: 'black-jack',
                component: BlackJackComponent
            }
        ]
    },

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' } 

];
