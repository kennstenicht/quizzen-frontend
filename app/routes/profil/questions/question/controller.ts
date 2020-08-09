import ProfilController from 'quizzen/routes/profil/controller';
import { Changeset } from 'ember-changeset';
import { BufferedChangeset } from 'ember-changeset/types';
import lookupValidator from 'ember-changeset-validations';
import QuestionValidations from 'quizzen/validations/question';

export default class ProfilQuestionsQuestionController extends ProfilController {
  // Getter and setter
  get changeset(): BufferedChangeset {
    return Changeset(
      this.model,
      lookupValidator(QuestionValidations),
      QuestionValidations
    );
  }
}
