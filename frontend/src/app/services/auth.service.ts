import { computed, effect, inject, Injectable, signal } from '@angular/core';
import Keycloak, { KeycloakProfile } from 'keycloak-js';
import {
  KEYCLOAK_EVENT_SIGNAL,
  KeycloakEvent,
  KeycloakEventType
} from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly keycloak = inject(Keycloak, { optional: true });
  private readonly keycloakEvent =
    inject(KEYCLOAK_EVENT_SIGNAL, { optional: true }) ??
    signal<KeycloakEvent>({
      type: KeycloakEventType.KeycloakAngularNotInitialized
    });

  private readonly profile = signal<KeycloakProfile | null>(null);

  readonly authenticated = computed(() => {
    this.keycloakEvent();
    return this.keycloak?.authenticated ?? false;
  });

  readonly userDisplayName = computed(() => {
    this.keycloakEvent();

    const profile = this.profile();
    const tokenParsed = this.keycloak?.tokenParsed;

    return (
      profile?.firstName ||
      profile?.username ||
      tokenParsed?.['name'] ||
      tokenParsed?.['preferred_username'] ||
      tokenParsed?.['email'] ||
      null
    );
  });

  constructor() {
    effect(() => {
      const event = this.keycloakEvent();

      switch (event.type) {
        case KeycloakEventType.Ready:
        case KeycloakEventType.AuthSuccess:
        case KeycloakEventType.AuthRefreshSuccess:
          if (this.keycloak?.authenticated) {
            void this.loadUserProfile();
            return;
          }

          this.profile.set(null);
          return;
        case KeycloakEventType.AuthLogout:
          this.profile.set(null);
          return;
        default:
          return;
      }
    });
  }

  isAuthenticated(): boolean {
    return this.authenticated();
  }

  async login(redirectPath = '/'): Promise<void> {
    if (!this.keycloak) {
      return;
    }

    const redirectUri =
      typeof window === 'undefined'
        ? undefined
        : `${window.location.origin}${redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`}`;

    await this.keycloak.login({ redirectUri });
  }

  async logout(): Promise<void> {
    if (!this.keycloak) {
      return;
    }

    const redirectUri = typeof window === 'undefined' ? undefined : window.location.origin;

    await this.keycloak.logout({ redirectUri });
  }

  private async loadUserProfile(): Promise<void> {
    if (!this.keycloak?.authenticated) {
      this.profile.set(null);
      return;
    }

    try {
      const profile = await this.keycloak.loadUserProfile();
      this.profile.set(profile);
    } catch {
      this.profile.set(null);
    }
  }
}
