import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import Confirm from 'quizzen/services/confirm';

export default class ApplicationBreadcrumb extends Component {
  // Services
  @service confirm!: Confirm;
}
