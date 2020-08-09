import ProfilController from 'quizzen/routes/profil/controller';
import { Changeset } from 'ember-changeset';
import { BufferedChangeset } from 'ember-changeset/types';
import lookupValidator from 'ember-changeset-validations';
import CategoryValidations from 'quizzen/validations/category';

export default class ProfilCategoriesCategoryController extends ProfilController {
  // Getter and setter
  get changeset(): BufferedChangeset {
    return Changeset(
      this.model,
      lookupValidator(CategoryValidations),
      CategoryValidations
    );
  }
}

