import Component from '@glimmer/component';
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


  // Getter and setter
  get breadcrumbItem() {
    return this.breadcrumb.currentItem;
  }


  // Actions
  @action
  async deleteRecord() {
    try {
      let title = this.args.model.displayLabel;

      let confirmed = await this.confirm.ask('delete', this.breadcrumbItem);

      if (!confirmed) {
        return
      }

      await this.args.model.destroyRecord();

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
