import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default class ApplicationAdapter extends JSONAPIAdapter.extend(
  DataAdapterMixin
) {
  // Services
  @service fastboot;
  @service session;


  // Defaults
  namespace = 'v1';


  // Getter and setter
  @computed('fastboot.request.{protocol,host}')
  get host() {
    const ENV = getOwner(this).resolveRegistration('config:environment');

    if (ENV.environment !== 'development' && this.fastboot.isFastBoot) {
      const protocol = this.fastboot.request.protocol;
      const host = this.fastboot.request.host;

      return `${protocol}//${host}`;
    } else {
      return null;
    }
  }

  @computed('session.{isAuthenticated,data.authenticated}')
  get headers() {
    let headers = {};

    if (this.session.isAuthenticated) {
      let { jwt } = this.session.data.authenticated;

      headers['Authorization'] = `Bearer ${jwt}`;
    }

    return headers;
  }
}
