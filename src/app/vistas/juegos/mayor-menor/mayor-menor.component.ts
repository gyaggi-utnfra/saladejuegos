import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Alert } from '../../../core/models/alert';
import { MayorMenor } from '../../../core/models/mayor-menor';
import { Carta } from '../../../core/models/cartas/carta';
import { UtilsService } from '../../../core/services/utils.service';

@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.scss'
})
export class MayorMenorComponent {
  dorso: string = '../../../../../assets/img/cartas/dorso.jpg';
  juegoMayorMenor: MayorMenor;
  cartaActual: Carta;
  siguienteCarta?: Carta;
  constructor(private utilsSrv: UtilsService) {}
  ngOnInit() {
    this.juegoMayorMenor = new MayorMenor();
    this.cartaActual = this.juegoMayorMenor.cartaActual;
    this.siguienteCarta = this.juegoMayorMenor.siguienteCarta;
  }
  compararRespuesta(respuesta: string) {
    if (this.juegoMayorMenor.compararRespuesta(respuesta)) {
      Alert.mensajeFinDelJuego(
        '¡Juego terminado!',
        `Puntaje final: ${this.juegoMayorMenor.puntaje}`,
        'Reintentar'
      ).then((res) => {
        if (res.isConfirmed) {
          this.juegoMayorMenor.reiniciarJuego();
        } else {
          this.utilsSrv.routerLink('/');
        }
      });
    }
  }
}
