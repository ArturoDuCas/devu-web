import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {USE_EMULATOR as USE_AUTH_EMULATOR} from '@angular/fire/compat/auth';
import {USE_EMULATOR as USE_FIRESTORE_EMULATOR} from '@angular/fire/compat/firestore';
import {USE_EMULATOR as USE_FUNCTIONS_EMULATOR} from '@angular/fire/compat/functions';
import {routes} from './app.routes';
import {ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getFunctions, provideFunctions} from '@angular/fire/functions';
import {getStorage, provideStorage} from '@angular/fire/storage';
import {environment} from "../environments/environment";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import { provideAnimations } from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(routes),
      provideAnimations(),
      MessageService,
      ConfirmationService,
      {
        provide: PrimeNGConfig,
        useFactory: () => {
          const primeConfig = new PrimeNGConfig();
          primeConfig.ripple = true;
          return primeConfig;
        }
      },
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideFunctions(() => getFunctions()),
      provideStorage(() => getStorage()),


      // for emulators
      {provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost', 9099] : undefined},
      {provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['localhost', 8080] : undefined},
      {provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['localhost', 5001] : undefined},

      // this line fixes the error: NullInjectorError: No provider for InjectionToken angularfire2.app.options!
      { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
    ]
};
