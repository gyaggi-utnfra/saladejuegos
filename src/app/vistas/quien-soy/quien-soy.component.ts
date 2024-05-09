import { Component } from '@angular/core';
import { QuienSoyService } from './services/quien-soy.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [NavbarComponent,RouterLink],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.scss'
})
export class QuienSoyComponent {
  datosPersona: any = {};
  constructor(private qSSrv: QuienSoyService) {}
  ngOnInit() {
    this.llenarData();
  }
  llenarData() {
    this.qSSrv.getGit().subscribe((data) => {
      this.datosPersona = data;
    });
  }
}
