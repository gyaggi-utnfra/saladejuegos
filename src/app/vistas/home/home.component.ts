import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ChatComponent } from "../../shared/components/chat/chat/chat.component";
import { TarjetaJuegosComponent } from "./components/tarjeta-juegos/tarjeta-juegos.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule,RouterLink, NavbarComponent, ChatComponent, TarjetaJuegosComponent]
})
export class HomeComponent {
    juegos = [
        {
          img: '../../../assets/img/imagen-juegos/mayor-menor.png',
          nombre: 'MAYOR O MENOR',
          link: '/juegos/mayor-menor',
        },
        {
            img: '../../../assets/img/imagen-juegos/ahorcado.png',
            nombre: 'AHORCADO',
            link: '/juegos/ahorcado',
        },
        {
            img: '../../../assets/img/imagen-juegos/preguntados.png',
            nombre: 'PREGUNTADOS',
            link: '/juegos/preguntados',
        },
        {
            img: '../../../assets/img/imagen-juegos/black-jack.png',
            nombre: 'BLACK-JACK',
            link: '/juegos/black-jack',
        },
      ];
}
