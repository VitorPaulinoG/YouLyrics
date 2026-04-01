import { EnvironmentProps } from "./environment-props";

export const environment: EnvironmentProps = {
  apiUrl: 'http://localhost:8080/api/v1',
  keycloak: {
    url: 'http://localhost:8089',
    realm: 'youlyrics',
    clientId: 'youlyrics-frontend',
    scope: 'openid profile email'
  }
};
