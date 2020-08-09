declare module 'ember-simple-auth/services/session' {
  import Service from '@ember/service';
  import Evented from '@ember/object/evented';
  import { Promise } from 'rsvp';

  interface Data {
    authenticated: {
      id: string,
      jwt: string,
      tokenData: {
        sub: string
      }
    };
  }

  export default class Session extends Service.extend(Evented) {
    isAuthenticated: boolean;
    data: Data | null;
    store: any;
    attemptedTransition: any;
    session: any;

    authenticate(...args: any[]): Promise<void>;
    invalidate(...args: any): Promise<void>;
    authorize(...args: any[]): Promise<void>;
    requireAuthentication(...args: any[]): any;
    prohibitAuthentication(...args: any[]): any;
  }
}
