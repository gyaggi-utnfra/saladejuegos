import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-letras',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './letras.component.html',
  styleUrl: './letras.component.scss'
})
export class LetrasComponent {
  
  botons: any[] = [];
  letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  bloquearBoton: boolean = false;
  @Output() letraSeleccionada = new EventEmitter<string>();
  @Input() juegoTerminado: boolean = false;
  @Output() botones = new EventEmitter<any[]>();

  ngOnInit() {
    this.letras.forEach((element) => {
      this.botons.push({ letra: element, bloquearBoton: false });
    });
    this.botones.emit(this.botons);
  }

  seleccionarLetraBoton(boton: any) {
    if (!this.juegoTerminado) {
      boton.bloquearBoton = true;
      this.letraSeleccionada.emit(boton.letra);
      boton.this.buttonUsuado = true;
    }
  }
}
