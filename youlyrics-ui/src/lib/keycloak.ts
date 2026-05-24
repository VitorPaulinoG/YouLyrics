import Keycloak from 'keycloak-js';
import { environment } from '@/config/environment';

const keycloak = new Keycloak({
  url: environment.keycloak.url,
  realm: environment.keycloak.realm,
  clientId: environment.keycloak.clientId,
});

let initPromise: Promise<boolean> | null = null;

export function getKeycloakClient() {
  return keycloak;
}

export function initializeKeycloak() {
  if (!initPromise) {
    initPromise = keycloak.init({
      onLoad: 'check-sso',
      pkceMethod: 'S256',
      scope: environment.keycloak.scope,
      redirectUri: window.location.origin,
      silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
    });
  }

  return initPromise;
}

export async function ensureFreshToken() {
  if (!keycloak.authenticated) {
    return null;
  }

  try {
    await keycloak.updateToken(30);
  } catch {
    return null;
  }

  return keycloak.token ?? null;
}
