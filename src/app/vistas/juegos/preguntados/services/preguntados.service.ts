import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilsService } from '../../../../core/services/utils.service';
@Injectable({
  providedIn: 'root',
})
export class PreguntadosService {
  private URL: string = 'https://rickandmortyapi.com/api/character/';

  constructor(private utilsSrv: UtilsService) {}

  getApi(): Observable<any> {
    let personaje = [];
    while (personaje.length < 4) {
      const numeroRandom = Math.floor(Math.random() * 50) + 1;
      if (!personaje.includes(numeroRandom)) {
        personaje.push(numeroRandom);
      }
    }
    const res = `${personaje[0]},${personaje[1]},${personaje[2]},${personaje[3]}`;
    console.log(res);
    return this.utilsSrv.getApiData(this.URL + res);
  }
}
