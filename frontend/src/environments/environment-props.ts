export interface KeycloakEnvironmentProps {
  url: string;
  realm: string;
  clientId: string;
  scope: string;
}

export interface EnvironmentProps {
  apiUrl: string;
  keycloak: KeycloakEnvironmentProps;
}
