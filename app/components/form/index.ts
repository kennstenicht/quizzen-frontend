import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import Model from '@ember-data/model';
import Store from '@ember-data/store';
import { pluralize } from 'ember-inflector';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { BufferedChangeset } from 'ember-changeset/types';
import FlashMessages from 'ember-cli-flash/services/flash-messages';
import Session from 'ember-simple-auth/services/session';
import Intl from 'ember-intl/services/intl';
import AnswerValidations from 'quizzen/validations/answer';
import CategoryValidations from 'quizzen/validations/category';
import GameValidations from 'quizzen/validations/game';
import QuestionValidations from 'quizzen/validations/question';
import QuizValidations from 'quizzen/validations/quiz';


interface Args {
  model: Model,
  transitionAfterAction: boolean
}

export default class FormComponent extends Component<Args> {
  // Services
  @service intl!: Intl;
  @service store!: Store;
  @service flashMessages!: FlashMessages;
  @service session!: Session;
  @service router!: Router;


  // Defaults
  @tracked changeset: BufferedChangeset;


  // Hooks
  constructor(owner: unknown, args: Args) {
    super(owner, args);

    // @ts-ignore
    this.changeset = new Changeset(
      this.args.model,
      lookupValidator(this.validations),
      this.validations
    );
  }


  // Getter and setter
  get modelName() {
    // @ts-ignore
    return this.args.model.constructor.modelName;
  }

  get modelId() {
    return this.args.model.id;
  }

  get validations() {
    switch (this.modelName) {
      case 'answer':
        return AnswerValidations
      case 'category':
        return CategoryValidations
      case 'game':
        return GameValidations
      case 'question':
        return QuestionValidations
      case 'quiz':
        return QuizValidations
      default:
        return null;
    }
  }


  // Actions
  @action
  async saveRecord(changeset: BufferedChangeset, event: Event) {
    event.preventDefault();
    try {
      console.log(changeset);

      await changeset.validate();

      if (changeset.isValid) {
        await changeset.save();

        const message = this.intl.t('form.saveRecord', {
          title: changeset.displayLabel
        });

        this.flashMessages.success(message);

        if(this.args.transitionAfterAction) {
          this.transitionToByModel(this.args.model, true);
        }
      } else {
        this.flashMessages.warning('not valid');
      }
    } catch(error) {
      console.log(error);

      this.flashMessages.warning(error.message);
    }
  }

  @action
  rollbackRecord(changeset: BufferedChangeset) {
    changeset.rollback();
    // Rollback model to destroy new record
    this.args.model.rollbackAttributes();

    if(this.args.transitionAfterAction) {
      this.transitionToByModel(this.args.model, false);
    }
  }

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
        this.transitionToByModel(this.args.model, false);
      }
    } catch(error) {
      this.flashMessages.success(error);
    }
  }


  // Functions
  transitionToByModel(model: Model, single: boolean) {
    // @ts-ignore
    let indexRoute = pluralize(this.modelName);
    let path = ['profile'];

    path.push(indexRoute);

    if (single) {
      path.push(this.modelName);

      return this.router.transitionTo(path.join('.'), model);
    }

    return this.router.transitionTo(path.join('.'));
  }
}
