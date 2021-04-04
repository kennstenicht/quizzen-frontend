import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import Model from 'quizzen/models/base';
import Store from '@ember-data/store';
import FlashMessages from 'ember-cli-flash/services/flash-messages';
import Session from 'ember-simple-auth/services/session';
import Intl from 'ember-intl/services/intl';
import Breadcrumb from 'quizzen/services/breadcrumb';
import Confirm from 'quizzen/services/confirm';

interface Args {
  model: Model
}

export default class RecordDetailComponent extends Component<Args> {
  // Services
  @service breadcrumb!: Breadcrumb;
  @service confirm!: Confirm;
  @service flashMessages!: FlashMessages;
  @service intl!: Intl;
  @service router!: Router;
  @service session!: Session;
  @service store!: Store;


  // Getter and setter
  get breadcrumbRoute() {
    return this.breadcrumb.currentRoute;
  }


  // Actions
  @action
  async delete() {
    try {
      let title = this.args.model.displayLabel;
      let message = this.intl.t('recordDetail.deleteRecord', { title: title });
      let confirmed = await this.confirm.ask('delete', this.args.model);

      if (!confirmed) {
        return
      }

      await this.breadcrumbRoute.destroyForms();

      this.flashMessages.success(message);
      // @ts-ignore
      this.router.transitionTo(...this.breadcrumb.prevRoute.routeParams);
    } catch(error) {
      this.flashMessages.warning(error);
    }
  }

  @action
  async cancel(event: Event) {
    event.preventDefault();

    // @ts-ignore
    this.router.transitionTo(...this.breadcrumb.prevRoute.routeParams);
  }

  @action
  async save(event: Event) {
    event.preventDefault();

    try {
      let title = this.breadcrumbRoute.name;
      let message = this.intl.t('recordDetail.saveRecord', { title: title });

      await this.breadcrumbRoute.validateRoute();

      if (this.breadcrumbRoute.isValid) {
        await this.breadcrumbRoute.saveRoute();
      } else {
        throw {
          message: 'not valid'
        }
      }

      this.flashMessages.success(message);
      // @ts-ignore
      this.router.transitionTo(...this.breadcrumb.prevRoute.routeParams);
    } catch(error) {
      this.flashMessages.warning(error.message);
    }
  }
}
