import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import FlashMessages from 'ember-cli-flash/services/flash-messages';
import Intl from 'ember-intl/services/intl';
import Session from 'ember-simple-auth/services/session';

export default class SignOutComponent extends Component {
  // Services
  @service session!: Session;
  @service intl!: Intl;
  @service flashMessages!: FlashMessages;


  // Actions
  @action
  signOut() {
    const message = this.intl.t('signOut.successMessage');

    this.flashMessages.success(message);
    this.session.invalidate();
  }
}
