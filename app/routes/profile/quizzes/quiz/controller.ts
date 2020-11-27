import ProfileController from 'quizzen/routes/profile/controller';
import { Changeset } from 'ember-changeset';
import { BufferedChangeset } from 'ember-changeset/types';
import lookupValidator from 'ember-changeset-validations';
import QuizValidations from 'quizzen/validations/quiz';

export default class ProfileQuizzesQuizController extends ProfileController {
  // Getter and setter
  get changeset(): BufferedChangeset {
    return Changeset(
      this.model,
      lookupValidator(QuizValidations),
      QuizValidations
    );
  }
}

