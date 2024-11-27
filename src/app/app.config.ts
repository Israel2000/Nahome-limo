import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { AngularFireDatabaseModule } from '@angular/fire/compat/database';  // Firebase Database module
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from '../environment/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes) ,
    provideHttpClient(),

    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },

    // Firebase App initialization
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    // Firebase Database
    provideDatabase(() => getDatabase()),

    // Import AngularFireDatabaseModule
    AngularFireDatabaseModule,

  ]
};
