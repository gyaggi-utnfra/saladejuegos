import { UtilsService } from '../services/utils.service';
import { Alert } from './alert';
import { Carta } from './cartas/carta';
import { Mazo } from './cartas/mazo';

export class BlackJack {
  private mazo: Mazo;
  juegoTerminado: boolean;
  miPuntaje: number;
  miPuntajeAs: number;
  bancaPuntaje: number;
  bancaPuntajeAs: number;
  misCartas: Carta[];
  bancaCartas: Carta[];
  private tengoAs: boolean;
  private bancaAs: boolean;
  constructor() {}
  reiniciarJuego() {
    this.mazo = new Mazo('52');
    this.juegoTerminado = false;
    this.miPuntaje = 0;
    this.miPuntajeAs = 0;
    this.bancaPuntaje = 0;
    this.bancaPuntajeAs = 0;
    this.misCartas = [];
    this.bancaCartas = [];
    this.tengoAs = false;
    this.bancaAs = false;
    this.repartirCartaInicio();
  }

  pedirCarta() {
    const nuevaCarta = this.mazo.seleccionarCarta();
    if (nuevaCarta.valor > 10) {
      nuevaCarta.valor = 10;
    }
    this.miPuntaje += nuevaCarta.valor;
    this.miPuntajeAs += nuevaCarta.valor;
    nuevaCarta.imagenMostrar = nuevaCarta.img;
    this.misCartas.push(nuevaCarta);
    if (nuevaCarta.valor == 1 && !this.tengoAs) {
      this.miPuntajeAs += 10;
    }
    if (this.miPuntaje > 21 || this.miPuntajeAs == 21 || this.miPuntaje == 21) {
      this.turnoBanca();
    }
  }
  bancaPideCartas() {
    const nuevaCarta = this.mazo.seleccionarCarta();
    if (nuevaCarta.valor > 10) {
      nuevaCarta.valor = 10;
    }
    this.bancaPuntaje += nuevaCarta.valor;
    if (this.bancaCartas.length != 1) {
      nuevaCarta.imagenMostrar = nuevaCarta.img;
    }
    this.bancaPuntajeAs += nuevaCarta.valor;
    if (nuevaCarta.valor == 1 && !this.bancaAs) {
      this.bancaPuntajeAs += 10;
    }
    this.bancaCartas.push(nuevaCarta);
  }

  turnoBanca() {
    this.bancaCartas[1].imagenMostrar = this.bancaCartas[1].img;
    for (
      ;
      this.bancaPuntajeAs < 17 ||
      (this.bancaPuntajeAs > 21 && this.bancaPuntaje < 17);

    ) {
      this.bancaPideCartas();
    }
    this.juegoTerminado = true;
  }

  repartirCartaInicio() {
    for (let index = 1; index <= 4; index++) {
      if (index % 2 == 0) {
        setTimeout(() => {
          this.bancaPideCartas();
        }, 1000 * index);
      } else {
        setTimeout(() => {
          this.pedirCarta();
        }, 1000 * index);
      }
    }
  }
}
