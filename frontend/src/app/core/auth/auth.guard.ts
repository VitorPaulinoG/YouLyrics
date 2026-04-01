import { CanActivateFn } from '@angular/router';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

const isAccessAllowed = async (
  _route: Parameters<CanActivateFn>[0],
  state: Parameters<CanActivateFn>[1],
  authData: AuthGuardData
): Promise<boolean> => {
  if (authData.authenticated) {
    return true;
  }

  const redirectUri =
    typeof window === 'undefined' ? undefined : `${window.location.origin}${state.url}`;

  await authData.keycloak.login({ redirectUri });

  return false;
};

export const canActivateAuthenticated = createAuthGuard<CanActivateFn>(isAccessAllowed);
