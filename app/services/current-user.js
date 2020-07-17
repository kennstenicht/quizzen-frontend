import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentUserService extends Service {
  // Services
  @service session;
  @service store;


  // Defaults
  @tracked user;


  // Functions
  async load() {
    try {
      if (this.session.isAuthenticated) {
        let userId = this.session.data.authenticated.tokenData.sub;

        let user = await this.store.findRecord('user', userId);
        this.user = user;
      }
    } catch(err) {
      await this.session.invalidate();
    }
  }
}
