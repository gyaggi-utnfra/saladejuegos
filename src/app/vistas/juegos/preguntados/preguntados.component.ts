import { Component } from '@angular/core';
import { PreguntadosService } from './services/preguntados.service';
import { UtilsService } from '../../../core/services/utils.service';
import { Alert } from '../../../core/models/alert';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.scss'
})
export class PreguntadosComponent {
  respuesta: any = { name: '', image: '' };
  listaOpciones: any[];
  puntuacion: number;
  botonBloqueado: boolean = false;
  constructor(
    public preSrv: PreguntadosService,
    private utilsSrv: UtilsService
  ) {}

  ngOnInit() {
    this.reiniciarJuego();
  }

  reiniciarJuego() {
    this.puntuacion = 0;
    this.generarPregunta();
  }

  generarPregunta() {
    this.botonBloqueado = true;
    this.preSrv.getApi().subscribe((res) => {
      let indice = Math.floor(Math.random() * res.length);
      this.respuesta = res[indice];
      indice = Math.floor(Math.random() * res.length);
      this.listaOpciones = this.mezclarArray(res);
    });
    setTimeout(() => {
      this.botonBloqueado = false;
    }, 1000);
  }

  responde(respuesta) {
    this.botonBloqueado = true;
    if (respuesta.name == this.respuesta.name) {
      console.log(true);
      this.puntuacion++;
      this.generarPregunta();
    } else {
      Alert.mensajeFinDelJuego(
        'Perdiste',
        `El personaje se llama ${this.respuesta.name} | Tu puntaje: ${this.puntuacion}`,
        'Reintentar'
      ).then((res) => {
        if (res.isConfirmed) {
          this.reiniciarJuego();
        } else {
          this.utilsSrv.routerLink('/');
        }
      });
    }
    setTimeout(() => {
      this.botonBloqueado = false;
    }, 1000);
  }

  mezclarArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio entre 0 y i, inclusive
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Intercambia los elementos en los índices i y j
    }
    return arr;
  }
}
