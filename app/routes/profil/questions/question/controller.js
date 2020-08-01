import ProfilController from 'quizzen/routes/profil/controller';
import { tracked } from '@glimmer/tracking';

export default class ProfilQuestionsQuestionController extends ProfilController {
  // Defaults
  @tracked changeset;
}
