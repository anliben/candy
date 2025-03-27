import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PoHttpRequestModule, PoI18nConfig, PoI18nModule } from '@po-ui/ng-components';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';

import { generalEn } from './i18n/general-en';

const i18nConfig: PoI18nConfig = {
  default: {
    language: 'en-en',
    context: 'general',
    cache: true
  },
  contexts: {
    general: {
      'en-en': generalEn
    },
    hcm: {
      url: 'http://10.1.1.1/api/translations/hcm/'
    }
  }
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([PoHttpRequestModule,  PoI18nModule.config(i18nConfig)]),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync()
  ],
};