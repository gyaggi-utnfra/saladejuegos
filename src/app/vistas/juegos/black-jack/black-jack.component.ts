import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Alert } from '../../../core/models/alert';
import { UtilsService } from '../../../core/services/utils.service';
import { BlackJack } from '../../../core/models/black-jack';

@Component({
  selector: 'app-black-jack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './black-jack.component.html',
  styleUrl: './black-jack.component.scss'
})
export class BlackJackComponent {
  dorso: string = '../../../../../assets/img/cartas/dorso.jpg';
  juegoBlackJack: BlackJack;
  turnoBanca: boolean = false;
  botonBloqueado: boolean = true;
  miPuntaje: number;
  bancaPuntaje: number;
  constructor(private utilsSrv: UtilsService) {}
  ngOnInit() {
    this.juegoBlackJack = new BlackJack();
    this.reiniciar();
  }
  pedirCarta() {
    this.botonBloqueado = true;
    this.juegoBlackJack.pedirCarta();
    if (this.juegoBlackJack.juegoTerminado) {
      this.mostrarResultado();
    } else {
      setTimeout(() => {
        this.botonBloqueado = false;
      }, 2000);
    }
  }
  plantarse() {
    this.botonBloqueado = true;
    this.juegoBlackJack.turnoBanca();
    if (this.juegoBlackJack.juegoTerminado) {
      this.mostrarResultado();
    }
  }

  reiniciar() {
    this.juegoBlackJack.reiniciarJuego();
    setTimeout(() => {
      this.botonBloqueado = false;
    }, 5000);
  }

  private mostrarResultado() {
    let title = 'Ganaste';
    let text = ``;
    this.sacarPuntajeMasAlto();
    if (this.miPuntaje > 21) {
      title = 'Perdiste';
      text = `Te pasaste de 21`;
    } else if (this.bancaPuntaje > 21) {
      text = `La banca se paso de 21`;
    } else if (this.bancaPuntaje <= 21) {
      text = `Tu puntaje: ${this.miPuntaje} | Banca puntaje: ${this.bancaPuntaje} `;
      if (this.miPuntaje <= 21 && this.bancaPuntaje > this.miPuntaje) {
        title = 'Perdiste';
      } else if (this.bancaPuntaje == this.miPuntaje) {
        title = 'Empate';
      }
    }
    setTimeout(() => {
      Alert.mensajeFinDelJuego(title, text, 'Repartir otra mano').then(
        (res) => {
          if (res.isConfirmed) {
            this.reiniciar();
          } else {
            this.utilsSrv.routerLink('/');
          }
        }
      );
    }, 2500);
  }

  sacarPuntajeMasAlto() {
    this.miPuntaje = this.juegoBlackJack.miPuntaje;
    if (
      this.miPuntaje < this.juegoBlackJack.miPuntajeAs &&
      this.juegoBlackJack.miPuntajeAs <= 21
    ) {
      this.miPuntaje = this.juegoBlackJack.miPuntajeAs;
    }

    this.bancaPuntaje = this.juegoBlackJack.bancaPuntaje;
    if (
      this.bancaPuntaje < this.juegoBlackJack.bancaPuntajeAs &&
      this.juegoBlackJack.bancaPuntajeAs <= 21
    ) {
      this.bancaPuntaje = this.juegoBlackJack.bancaPuntajeAs;
    }
  }
}
