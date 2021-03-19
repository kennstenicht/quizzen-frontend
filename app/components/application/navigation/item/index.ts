import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import Breadcrumb from 'quizzen/services/breadcrumb';

interface Args {
  link: string
}

export default class ApplicationNavigationItemComponent extends Component<Args> {
  // Services
  @service breadcrumb!: Breadcrumb;
  @service router!: Router;


  // Getter, setter and computed properties
  get isActive() {
    let routeName = this.breadcrumb.baseItem?.routeName ?? this.router.currentRoute.name.replace('.index', '')

    return this.args.link === routeName;
  }
}
