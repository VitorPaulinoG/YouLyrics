type KeycloakEnvironmentProps = {
  url: string;
  realm: string;
  clientId: string;
  scope: string;
};

type EnvironmentProps = {
  apiUrl: string;
  keycloak: KeycloakEnvironmentProps;
};

export const environment: EnvironmentProps = {
  apiUrl: import.meta.env.VITE_API_URL,
  keycloak: {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    scope: import.meta.env.VITE_KEYCLOAK_SCOPE,
  },
};
