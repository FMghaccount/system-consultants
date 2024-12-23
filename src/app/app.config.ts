import {
  ApplicationConfig,
  LOCALE_ID,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeFa from '@angular/common/locales/fa';

registerLocaleData(localeFa);

export const appConfig: ApplicationConfig = {
  providers: [
    CurrencyPipe,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: LOCALE_ID, useValue: 'fa-IR' }, provideAnimationsAsync(),
  ],
};
