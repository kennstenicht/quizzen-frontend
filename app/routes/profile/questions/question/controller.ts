import ProfileController from 'quizzen/routes/profile/controller';
import { Changeset } from 'ember-changeset';
import { BufferedChangeset } from 'ember-changeset/types';
import lookupValidator from 'ember-changeset-validations';
import QuestionValidations from 'quizzen/validations/question';

export default class ProfileQuestionsQuestionController extends ProfileController {
  // Getter and setter
  get changeset(): BufferedChangeset {
    return Changeset(
      this.model,
      lookupValidator(QuestionValidations),
      QuestionValidations
    );
  }
}
