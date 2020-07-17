import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SignOutComponent extends Component {
  // Services
  @service session;
  @service intl;
  @service flashMessages;


  // Actions
  @action
  signOut() {
    const message = this.intl.t('signOut.successMessage');

    this.flashMessages.success(message);
    this.session.invalidate();
  }
}
