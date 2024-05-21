import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NavbarComponent,RouterLinkActive],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.scss'
})
export class JuegosComponent {

}
