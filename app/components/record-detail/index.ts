import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import Model from 'quizzen/models/base';
import Store from '@ember-data/store';
import { BufferedChangeset } from 'ember-changeset/types';
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


  // Defaults
  @tracked changeset!: BufferedChangeset;


  // Getter and setter
  get breadcrumbItem() {
    return this.breadcrumb.currentItem;
  }


  // Actions
  @action
  async deleteRecord() {
    try {
      // @ts-ignore
      let title = this.args.model.title;

      let confirmed = await this.confirm.ask('delete', this.breadcrumbItem);

      if (!confirmed) {
        return
      }

      await this.args.model.destroyRecord();
      await this.changeset.rollback();

      const message = this.intl.t('recordDetail.deleteRecord', {
        title: title
      });

      this.flashMessages.success(message);

      // @ts-ignore
      this.router.transitionTo(...this.breadcrumb.prevItem.routeParams);
    } catch(error) {
      this.flashMessages.warning(error);
    }
  }

  @action
  loadChangeset() {
    let routeName = this.router.currentRoute.name;
    // @ts-ignore
    let model = this.router.currentRoute.attributes;
    let route = this.breadcrumb.getItem(routeName, model);

    this.changeset = route.getChangeset(this.args.model);
  }

  @action
  rollbackRecord(event: Event) {
    event.preventDefault();

    // @ts-ignore
    this.router.transitionTo(...this.breadcrumb.prevItem.routeParams);
  }

  @action
  async saveRecord(changeset: BufferedChangeset, event: Event) {
    event.preventDefault();

    try {
      await changeset.validate();

      if (changeset.isValid) {
        await changeset.save();

        const message = this.intl.t('recordDetail.saveRecord', {
          title: changeset.displayLabel
        });

        this.flashMessages.success(message);

        // @ts-ignore
        this.router.transitionTo(...this.breadcrumb.prevItem.routeParams);
      } else {
        this.flashMessages.warning('not valid');
      }
    } catch(error) {
      this.flashMessages.warning(error.message);
    }
  }
}
