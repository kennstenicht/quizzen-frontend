import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default class ApplicationAdapter extends JSONAPIAdapter.extend(
  DataAdapterMixin
) {
  // Services
  @service session;


  // Defaults
  namespace = 'v1';


  // Getter and setter
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
