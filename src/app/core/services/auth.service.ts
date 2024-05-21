import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from '@angular/fire/auth';
import { User } from '../models/user';
import { UtilsService } from './utils.service';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly auth = inject(Auth);
  public user = null;

  constructor(private utilsSrv: UtilsService, private dbSrv: FirebaseService) {
    this.user = this.getUser();
  }

  async signIn(user: User): Promise<void> {
    await signInWithEmailAndPassword(this.auth, user.email, user.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        this.user = user;
        this.utilsSrv.setElementInLocalstorage('user', user);
        const logUser = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          date: new Date(),
        };
        await this.dbSrv.addDoc('loginUser', logUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw { errorCode, errorMessage };
      });
  }

  async signUp(user: User): Promise<void> {
    let nameUser = user.name;
    await createUserWithEmailAndPassword(this.auth, user.email, user.password)
      .then((userCredential) => {
        // Signed in
        this.upDateUser({ displayName: nameUser });
        this.logout();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw { errorCode, errorMessage };
      });
  }
  async logout() {
    await signOut(this.auth)
      .then(() => {
        this.utilsSrv.setElementInLocalstorage('user', null);
        this.user = null;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        throw { errorCode, errorMessage };
      });
  }

  upDateUser(user: any) {
    const theUser = this.auth.currentUser;
    if (theUser)
      updateProfile(theUser, user)
        .then(() => {
          this.utilsSrv.setElementInLocalstorage('user', theUser);
          this.user = theUser;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          throw { errorCode, errorMessage };
        });
  }

  getUser(): Observable<any> {
    return this.utilsSrv.getElementInLocalstorage('user');
  }
}
