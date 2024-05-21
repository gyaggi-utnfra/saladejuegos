import { Carta } from './carta';

export class Mazo {
  cartas: Carta[];

  constructor(juego: string) {
    this.cartas = [];
    if (juego == '52') {
      this.generarCartas52();
    } else {
      this.generarCartas13();
    }
  }

  /* 
  genera cartas para el mazo
  */
  generarCartas13() {
    for (let i = 1; i <= 13; i++) {
      let img = '../../../../../assets/img/cartas/cartaN' + i + '.jpg';
      this.cartas.push(new Carta(img, i));
    }
  }
  generarCartas52() {
    for (let i = 1; i <= 4; i++) {
      this.generarCartas13();
    }
  }
  /* 
  saca una carta random del mazo y lo retorna
  */
  seleccionarCarta() {
    const indice = Math.floor(Math.random() * this.cartas.length);
    let cartaActual: Carta = this.cartas[indice];
    this.cartas.splice(indice, 1);
    return cartaActual;
  }
}
