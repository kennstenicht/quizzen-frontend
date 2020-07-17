import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class SignInComponent extends Component {
  // Services
  @service currentUser;
  @service flashMessages;
  @service session;


  // Actions
  @action
  async signIn(event) {
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

  _throwError(reason) {
    this.flashMessages.warning(reason.statusText);
  }
}
