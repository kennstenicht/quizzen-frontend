import ProfilController from 'quizzen/routes/profil/controller';
import { tracked } from '@glimmer/tracking';

export default class ProfilQuestionsNewController extends ProfilController {
  // Defaults
  @tracked changeset;
}
