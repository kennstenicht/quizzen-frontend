import ProfilController from 'quizzen/routes/profil/controller';
import { Changeset } from 'ember-changeset';
import { BufferedChangeset } from 'ember-changeset/types';
import lookupValidator from 'ember-changeset-validations';
import GameValidations from 'quizzen/validations/game';

export default class ProfilGamesNewController extends ProfilController {
  // Getter and setter
  get changeset(): BufferedChangeset {
    return Changeset(
      this.model,
      lookupValidator(GameValidations),
      GameValidations
    );
  }
}
