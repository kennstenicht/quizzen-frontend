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
    if (this.breadcrumb.baseRoute) {
      return this.args.link === this.breadcrumb.baseRoute.routeName;
    }

    return this.router.currentRoute.name.includes(this.args.link);
  }
}
