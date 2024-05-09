import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  onSnapshot,
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { Mensaje } from '../../../../../core/models/mensaje';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  public path: string = 'chat';
  public mensajes: any[] = [];
  unsub: any;
  messagesRef = collection(this.db, this.path);
  constructor(private db: Firestore) {}

  getMessages() {
    this.unsub = onSnapshot(this.messagesRef, (snapshot) => {
      snapshot.docChanges().forEach((valor) => {
        this.mensajes.push(valor.doc.data());
      });
      this.mensajes.sort((a, b) => {
        let fecha1 = new Date(a.fullDate);
        let fecha2 = new Date(b.fullDate);

        if (fecha1 === fecha2) return 0;
        return fecha1 > fecha2 ? 1 : -1;
      });
    });

    onSnapshot(this.messagesRef, (snapshot) => {});
  }
  addMessage(message: Mensaje) {
    return addDoc(this.messagesRef, message);
  }
}
