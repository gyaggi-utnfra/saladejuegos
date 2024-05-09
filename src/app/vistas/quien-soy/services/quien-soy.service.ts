import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsService } from '../../../core/services/utils.service';


@Injectable({
  providedIn: 'root',
})
export class QuienSoyService {
  private urlApiGit: string = 'https://api.github.com/users/gyaggi-utnfra';
  constructor(private utilsSrv: UtilsService) {}

  getGit(): Observable<any> {
    return this.utilsSrv.getApiData(this.urlApiGit);
  }
}
