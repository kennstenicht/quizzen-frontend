import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import CurrentUser from 'quizzen/services/current-user';

export default class ApplicationHeaderComponent extends Component {
  // Services
  @service currentUser!: CurrentUser;
}
