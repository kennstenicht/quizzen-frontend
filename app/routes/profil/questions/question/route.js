import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import confirmUnsavedChanges from 'quizzen/utils/confirm-unsaved-changes';
import QuestionValidations from 'quizzen/validations/question';

export default class ProfilQuestionsQuestionRoute extends Route {
  // Services
  @service store;


  // Hooks
  model({ id }) {
    return this.store.findRecord('question', id);
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
