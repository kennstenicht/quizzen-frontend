import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { computed } from '@ember/object';
import Session from 'ember-simple-auth/services/session';
import Fastboot from 'ember-cli-fastboot/services/fastboot';

export default class ApplicationAdapter extends JSONAPIAdapter {
  // Services
  @service fastboot!: Fastboot;
  @service session!: Session;


  // Defaults
  namespace = 'v1';


  // Getter and setter
  @computed('fastboot.{isFastBoot,request.host,request.protocol}')
  get host(): string {
    const ENV = getOwner(this).resolveRegistration('config:environment');

    if (ENV.environment !== 'development' && this.fastboot.isFastBoot) {
      const protocol = this.fastboot.request.protocol;
      const host = this.fastboot.request.host;

      return `${protocol}//${host}`;
    } else {
      return '';
    }
  }

  @computed('session.{isAuthenticated,data.authenticated.jwt}')
  get headers() {
    let headers: any = {};

    if (this.session.isAuthenticated && this.session.data) {
      let { jwt } = this.session.data.authenticated;

      headers['Authorization'] = `Bearer ${jwt}`;
    }

    return headers;
  }
}
