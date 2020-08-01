import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import confirmUnsavedChanges from 'quizzen/utils/confirm-unsaved-changes';
import QuestionValidations from 'quizzen/validations/game';

export default class ProfilGamesNewRoute extends Route {
  // Services
  @service store;


  // Hooks
  model() {
    return this.store.createRecord('game');
  }

  setupController(controller, model) {
    super.setupController(...arguments);

    controller.changeset = Changeset(
      model,
      lookupValidator(QuestionValidations),
      QuestionValidations
    );
  }


  // Actions
  @action
  willTransition(transition) {
    confirmUnsavedChanges(transition, this.controller);
  }
}
