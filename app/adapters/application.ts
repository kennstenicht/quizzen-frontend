import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';
import Session from 'ember-simple-auth/services/session';
import Fastboot from 'ember-cli-fastboot/services/fastboot';
import { v4 } from 'ember-uuid';

export default class ApplicationAdapter extends JSONAPIAdapter {
  // Services
  @service fastboot!: Fastboot;
  @service session!: Session;


  // Defaults
  namespace = 'v1';


  // Getter, setter and computed properties
  @computed('session.{isAuthenticated,data.authenticated.jwt}')
  get headers() {
    let headers: any = {};

    if (this.session.isAuthenticated && this.session.data) {
      let { jwt } = this.session.data.authenticated;

      headers['Authorization'] = `Bearer ${jwt}`;
    }

    return headers;
  }

  get host() {
    const ENV = getOwner(this).resolveRegistration('config:environment');

    return ENV.APP.host;
  }


  // Functions
  generateIdForRecord() {
    return v4();
  }

  pathForType(type: any) {
    return underscore(pluralize(type));
  }
}
