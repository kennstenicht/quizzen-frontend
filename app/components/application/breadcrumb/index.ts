import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import Breadcrumb from 'quizzen/services/breadcrumb';

interface Args {}

export default class ApplicationBreadcrumb extends Component<Args> {
  // Services
  @service breadcrumb!: Breadcrumb;
}
