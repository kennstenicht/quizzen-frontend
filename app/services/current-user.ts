import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Store from '@ember-data/store';
import Session from 'ember-simple-auth/services/session';
import User from 'quizzen/models/user';

export default class CurrentUserService extends Service {
  // Services
  @service session!: Session;
  @service store!: Store;


  // Defaults
  @tracked model?: User;


  // Functions
  async load() {
    try {
      if (this.session.isAuthenticated && this.session.data) {
        let userId = this.session.data.authenticated.tokenData.sub;

        let user = await this.store.findRecord('user', userId);

        this.model = user;
      }
    } catch(err) {
      this.model = undefined;
      this.session.invalidate();
    }
  }
}
