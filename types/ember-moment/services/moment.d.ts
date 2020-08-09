declare module 'ember-moment/services/moment' {
  import Service from '@ember/service';

  export default class Moment extends Service {
    setLocale(locale: string): void;
  }
}
