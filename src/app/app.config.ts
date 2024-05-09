import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    importProvidersFrom(
      AngularFirestoreModule,
      
      provideFirebaseApp(() => initializeApp({
        apiKey: "AIzaSyBYmNNyJmQijf1UVZPxYgCULMqivYkUBac",
        authDomain: "saladejuegos-d3933.firebaseapp.com",
        projectId: "saladejuegos-d3933",
        storageBucket: "saladejuegos-d3933.appspot.com",
        messagingSenderId: "592924014661",
        appId: "1:592924014661:web:814ec5f13c4be190930b2c"
    }))),
    importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"saladejuegos-d3933","appId":"1:592924014661:web:814ec5f13c4be190930b2c","storageBucket":"saladejuegos-d3933.appspot.com","apiKey":"AIzaSyBYmNNyJmQijf1UVZPxYgCULMqivYkUBac","authDomain":"saladejuegos-d3933.firebaseapp.com","messagingSenderId":"592924014661"}))), importProvidersFrom(provideFirestore(() => getFirestore())),
    ]
};
