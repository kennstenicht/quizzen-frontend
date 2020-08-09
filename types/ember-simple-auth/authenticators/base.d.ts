declare module 'ember-simple-auth/authenticators/base' {
  import EmberObject from '@ember/object';
  import Evented from '@ember/object/evented';
  import { Promise } from 'rsvp';

  export class Base extends EmberObject.extend(Evented) {
    authenticate(...args: any[]): Promise<void>;
    invalidate(data?: object, ...args: any[]): Promise<void>;
    restore(data: object): Promise<void>;
  }
}
