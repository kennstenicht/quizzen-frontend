declare module 'ember-cli-fastboot/services/fastboot' {
  import Service from '@ember/service';

  export default class Fastboot extends Service {
    readonly isFastBoot: boolean;
    readonly request: {
      protocol: string,
      host: string
    };
  }
}
