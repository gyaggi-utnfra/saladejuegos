import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LetrasComponent } from './letras/letras.component';
import { Alert } from '../../../core/models/alert';
import { UtilsService } from '../../../core/services/utils.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [CommonModule,LetrasComponent],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.scss'
})
export class AhorcadoComponent {
  palabraOculta = '';
  palabrasOcultas: string[] = ['PROGRAMACION', 'LABORATORIO', 'ESTUDIANTE'];
  letrasSeleccionadas: string[] = [];
  palabraMostrada: string = '';
  juegoTerminado: boolean = false;
  contadorIncorrectas: number = 0;
  constructor(private utilsSrv: UtilsService) {}
  @ViewChild('ahorcado', { static: true }) ahorcadoElementRef!: ElementRef;
  imgAhorcado: string = '/../../../assets/img/ahorcado/ahorcado';
  imaMostrar: string =
    this.imgAhorcado + (this.contadorIncorrectas + 1) + '.png';
  listaBotones: any[] = [];
  ngOnInit() {
    this.generarPalbraOculta();
    this.actualizarPalabra();
  }

  letraSeleccionada(letra: string) {
    if (!this.letrasSeleccionadas.includes(letra)) {
      this.letrasSeleccionadas.push(letra);
      if (!this.palabraOculta.includes(letra)) {
        this.contadorIncorrectas++; // Incrementar el contador si la letra no está en la palabra oculta
        this.actualizarImg();
      }
      this.actualizarPalabra();
    }
  }

  actualizarPalabra() {
    this.palabraMostrada = this.palabraOculta
      .split('')
      .map((letra) => (this.letrasSeleccionadas.includes(letra) ? letra : '_'))
      .join(' ');

    setTimeout(() => {
      if (this.palabraMostrada.replace(/\s/g, '') === this.palabraOculta) {
        this.juegoTerminado = true;
        Alert.mensajeFinDelJuego(
          '¡Felicidades!',
          'Has adivinado la palabra.',
          'Reintentar'
        ).then((res) => {
          if (res.isConfirmed) {
            this.reiniciarJuego();
          } else {
            this.utilsSrv.routerLink('/');
          }
        });
      }
    }, 10);
  }

  moveImg() {
    this.imaMostrar =
      this.imgAhorcado + (this.contadorIncorrectas + 1) + '.png';
  }
  actualizarImg() {
    this.moveImg();
    if (this.contadorIncorrectas >= 6) {
      this.juegoTerminado = true;
      Alert.mensajeFinDelJuego(
        'Has perdido',
        'Se te acabaron los intentos',
        'Reintentar'
      ).then((res) => {
        if (res.isConfirmed) {
          this.reiniciarJuego();
        } else {
          this.utilsSrv.routerLink('/');
        }
      });
    }
  }

  generarPalbraOculta() {
    const index = Math.floor(Math.random() * 3);
    this.palabraOculta = this.palabrasOcultas[index];
  }

  reiniciarJuego() {
    this.letrasSeleccionadas = [];
    this.palabraMostrada = '';
    this.contadorIncorrectas = 0;
    this.generarPalbraOculta();
    this.actualizarPalabra();
    this.juegoTerminado = false;
    this.imaMostrar =
      this.imgAhorcado + (this.contadorIncorrectas + 1) + '.png';
    this.listaBotones.forEach((boton) => {
      boton.bloquearBoton = false;
    });
  }

  listB($event) {
    this.listaBotones = $event;
  }
}
