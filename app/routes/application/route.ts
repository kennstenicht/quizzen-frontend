import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import CurrentUser from 'quizzen/services/current-user';
import Moment from 'ember-moment/services/moment';
import Intl from 'ember-intl/services/intl';
import Session from 'ember-simple-auth/services/session';

export default class ApplicationRoute extends Route {
  // Services
  @service currentUser!: CurrentUser;
  @service intl!: Intl;
  @service moment!: Moment;
  @service session!: Session;


  // Hooks
  beforeModel() {
    this.moment.setLocale('de');
    this.intl.setLocale('de');

    return this.currentUser.load();
  }


  // Actions
  @action
  invalidateSession() {
    this.session.invalidate();
  }
}
