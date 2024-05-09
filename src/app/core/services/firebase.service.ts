import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private db: Firestore) {}
  dato: any;
  async addDoc(key: string, obj: any) {
    return await addDoc(collection(this.db, key), obj);
  }
}
