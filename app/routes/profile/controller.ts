import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import CurrentUser from 'quizzen/services/current-user';

export default class ProfileController extends Controller {
  // Services
  @service currentUser!: CurrentUser;
}
