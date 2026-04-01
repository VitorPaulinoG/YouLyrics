import {
  AutoRefreshTokenService,
  createInterceptorCondition,
  IncludeBearerTokenCondition,
  includeBearerTokenInterceptor,
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
  provideKeycloak,
  UserActivityService,
  withAutoRefreshToken
} from 'keycloak-angular';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { environment } from '../../../environments/environment';

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getBaseOrigin(): string | undefined {
  return typeof window === 'undefined' ? undefined : window.location.origin;
}

const apiUrlCondition = createInterceptorCondition<IncludeBearerTokenCondition>({
  urlPattern: new RegExp(`^${escapeRegExp(environment.apiUrl)}(?:/.*)?$`, 'i'),
  bearerPrefix: 'Bearer'
});

export function provideKeycloakAuth(): EnvironmentProviders {
  const baseOrigin = getBaseOrigin();

  return makeEnvironmentProviders([
    provideKeycloak({
      config: {
        url: environment.keycloak.url,
        realm: environment.keycloak.realm,
        clientId: environment.keycloak.clientId
      },
      initOptions: {
        onLoad: 'check-sso',
        pkceMethod: 'S256',
        scope: environment.keycloak.scope,
        redirectUri: baseOrigin,
        silentCheckSsoRedirectUri: baseOrigin ? `${baseOrigin}/silent-check-sso.html` : undefined
      },
      features: [
        withAutoRefreshToken({
          sessionTimeout: 15 * 60 * 1000,
          onInactivityTimeout: 'logout'
        })
      ],
      providers: [AutoRefreshTokenService, UserActivityService]
    }),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [apiUrlCondition]
    }
  ]);
}
