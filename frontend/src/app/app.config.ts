import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { includeBearerTokenInterceptor } from 'keycloak-angular';
import { provideKeycloakAuth } from './core/auth/keycloak.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideKeycloakAuth(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([includeBearerTokenInterceptor])),
    provideAnimations()
  ]
};
