import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import Model from '@ember-data/model';
import Store from '@ember-data/store';
import { BufferedChangeset } from 'ember-changeset/types';
import FlashMessages from 'ember-cli-flash/services/flash-messages';
import Session from 'ember-simple-auth/services/session';
import Intl from 'ember-intl/services/intl';
import Breadcrumb from 'quizzen/services/breadcrumb';

interface Args {
  model: Model,
  transitionAfterAction: boolean,
  formActions?: {
    saveRecord?: Function,
    deleteRecord?: Function,
    rollbackRecord?: Function
  }
}

export default class FormComponent extends Component<Args> {
  // Services
  @service flashMessages!: FlashMessages;
  @service breadcrumb!: Breadcrumb;
  @service intl!: Intl;
  @service router!: Router;
  @service session!: Session;
  @service store!: Store;


  // Defaults
  @tracked changeset?: BufferedChangeset;


  // Hooks
  constructor(owner: unknown, args: Args) {
    super(owner, args);

    let routeName = this.router.currentRoute.name;
    // @ts-ignore
    let model = this.router.currentRoute.attributes;
    let route = this.breadcrumb.getItem(routeName, model);

    this.changeset = route.getChangeset(this.args.model);
  }


  // Getter and setter
  get modelName(): string {
    // @ts-ignore
    return this.args.model.constructor.modelName;
  }

  get modelId() {
    return this.args.model.id;
  }

  get formActions() {
    let defaultActions = {
      deleteRecord: this.deleteRecord,
      rollbackRecord: this.rollbackRecord,
      saveRecord: this.saveRecord,
    }

    return {
      ...defaultActions,
      ...this.args.formActions
    }
  }


  // Actions
  @action
  async deleteRecord(changeset: BufferedChangeset) {
    try {
      // TODO: Destroy changeset?
      await this.args.model.destroyRecord();

      const message = this.intl.t('form.deleteRecord', {
        title: changeset.title
      });

      this.flashMessages.success(message);

      if(this.args.transitionAfterAction) {
        this.breadcrumb.transitionTo(this.breadcrumb.prevItem, this.modelName);
      }
    } catch(error) {
      this.flashMessages.success(error);
    }
  }

  @action
  rollbackRecord(changeset: BufferedChangeset) {
    changeset.rollback();
    // Rollback model to destroy new record
    this.args.model.rollbackAttributes();

    if(this.args.transitionAfterAction) {
      this.breadcrumb.transitionTo(this.breadcrumb.prevItem, this.modelName);
    }
  }

  @action
  async saveRecord(changeset: BufferedChangeset, event: Event) {
    event.preventDefault();
    try {
      await changeset.validate();

      if (changeset.isValid) {
        await changeset.save();

        const message = this.intl.t('form.saveRecord', {
          title: changeset.displayLabel
        });

        this.flashMessages.success(message);

        if(this.args.transitionAfterAction) {
          this.breadcrumb.transitionTo(this.breadcrumb.prevItem, this.modelName, this.args.model);
        }
      } else {
        this.flashMessages.warning('not valid');
      }
    } catch(error) {
      this.flashMessages.warning(error.message);
    }
  }
}
