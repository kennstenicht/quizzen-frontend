import ProfilController from 'quizzen/routes/profil/controller';
import { Changeset } from 'ember-changeset';
import { BufferedChangeset } from 'ember-changeset/types';
import lookupValidator from 'ember-changeset-validations';
import QuizValidations from 'quizzen/validations/quiz';

export default class ProfilQuizzesQuizController extends ProfilController {
  // Getter and setter
  get changeset(): BufferedChangeset {
    return Changeset(
      this.model,
      lookupValidator(QuizValidations),
      QuizValidations
    );
  }
}

