import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import FlashMessages from 'ember-cli-flash/services/flash-messages';
import Intl from 'ember-intl/services/intl';
import Session from 'ember-simple-auth/services/session';
import CurrentUser from 'quizzen/services/current-user';
import { BufferedChangeset } from 'ember-changeset/types';
import UserValidations from 'quizzen/validations/user';
import lookupValidator from 'ember-changeset-validations';
import { Changeset } from 'ember-changeset';

interface Args {}

export default class SignInComponent extends Component<Args> {
  // Services
  @service currentUser!: CurrentUser;
  @service flashMessages!: FlashMessages;
  @service intl!: Intl;
  @service session!: Session;


  // Defaults
  user: BufferedChangeset;


  // Hooks
  constructor(owner: unknown, args: Args) {
    super(owner, args);

    let user = {
      id: 0,
      email: null,
      password: null,
      modelName: 'user'
    };

    this.user = Changeset(
      user,
      lookupValidator(UserValidations),
      UserValidations
    );
  }


  // Actions
  @action
  async signIn(user: BufferedChangeset, event: Event) {
    event.preventDefault();

    const authenticator = 'authenticator:jwt';
    const credentials = {
      "auth": {
        "password": user.password,
        "email": user.email
      }
    };

    try {
      await this.session.authenticate(authenticator, credentials);
      await this.currentUser.load();

      this.flashMessages.success(this.intl.t('signIn.successMessage'));
    } catch(error) {
      this.flashMessages.warning(error.statusText);
    }
  }
}
