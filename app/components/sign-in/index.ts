import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import CurrentUser from 'quizzen/services/current-user';
import FlashMessages from 'ember-cli-flash/services/flash-messages';
import Intl from 'ember-intl/services/intl';
import Session from 'ember-simple-auth/services/session';

export default class SignInComponent extends Component {
  // Services
  @service currentUser!: CurrentUser;
  @service flashMessages!: FlashMessages;
  @service intl!: Intl;
  @service session!: Session;


  // Defaults
  password = null;
  email = null;

  // Actions
  @action
  async signIn(event: Event) {
    event.preventDefault();

    const credentials = {
      "auth": {
        "password": this.password,
        "email": this.email
      }
    };
    const authenticator = 'authenticator:jwt';

    try {
      await this.session.authenticate(authenticator, credentials);
      await this.currentUser.load();
    } catch(error) {
      this._throwError(error);
    }

    if (this.session.isAuthenticated) {
      this._throwSuccess;
    }
  }


  // Privat functions
  _throwSuccess() {
    const message = this.intl.t('signIn.successMessage');

    this.flashMessages.success(message);
  }

  _throwError(reason: ApiError) {
    console.log(reason);

    this.flashMessages.warning(reason.statusText);
  }
}
