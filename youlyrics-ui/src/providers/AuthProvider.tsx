import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { KeycloakProfile } from 'keycloak-js';
import { getKeycloakClient, initializeKeycloak } from '@/lib/keycloak';

type AuthContextValue = {
  isLoading: boolean;
  isAuthenticated: boolean;
  userDisplayName: string | null;
  login: (redirectPath?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function getDisplayName(profile: KeycloakProfile | null): string | null {
  const keycloak = getKeycloakClient();
  const tokenParsed = keycloak.tokenParsed;

  return (
    profile?.firstName ??
    profile?.username ??
    (typeof tokenParsed?.name === 'string' ? tokenParsed.name : null) ??
    (typeof tokenParsed?.preferred_username === 'string' ? tokenParsed.preferred_username : null) ??
    (typeof tokenParsed?.email === 'string' ? tokenParsed.email : null) ??
    null
  );
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<KeycloakProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const keycloak = getKeycloakClient();

    async function syncProfile() {
      if (!keycloak.authenticated) {
        setProfile(null);
        setIsAuthenticated(false);
        return;
      }

      try {
        const nextProfile = await keycloak.loadUserProfile();
        setProfile(nextProfile);
      } catch {
        setProfile(null);
      }

      setIsAuthenticated(true);
    }

    keycloak.onAuthSuccess = () => {
      void syncProfile();
    };
    keycloak.onAuthLogout = () => {
      setProfile(null);
      setIsAuthenticated(false);
    };
    keycloak.onAuthRefreshSuccess = () => {
      void syncProfile();
    };
    keycloak.onTokenExpired = () => {
      void keycloak.updateToken(30).catch(() => undefined);
    };

    void initializeKeycloak()
      .then(async (authenticated) => {
        setIsAuthenticated(authenticated);
        if (authenticated) {
          await syncProfile();
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      isLoading,
      isAuthenticated,
      userDisplayName: getDisplayName(profile),
      login: async (redirectPath = '/') => {
        const keycloak = getKeycloakClient();
        const redirectUri = `${window.location.origin}${redirectPath.startsWith('/') ? redirectPath : `/${redirectPath}`}`;

        await keycloak.login({ redirectUri });
      },
      logout: async () => {
        const keycloak = getKeycloakClient();
        await keycloak.logout({ redirectUri: window.location.origin });
      },
    }),
    [isAuthenticated, isLoading, profile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
