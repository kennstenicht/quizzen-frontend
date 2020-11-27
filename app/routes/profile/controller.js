import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { pluralize } from 'ember-inflector';

export default class ProfileController extends Controller {
// Services
@service currentUser;
@service flashMessages;
@service intl;
@service session;
@service store;


// Actions
@action
async save(changeset, event) {
  event.preventDefault();

  await changeset.validate();

  if (changeset.isValid) {
    try {
      await changeset.save();

      const message = this.intl.t('form.saveRecord', {
        title: changeset.displayLabel
      });

      this.flashMessages.success(message);

      this.transitionToByModel(changeset.data, true);
    } catch(error) {
      this.flashMessages.warning(error.message);
    }
  } else {
    this.flashMessages.warning('not valid');
  }
}

@action
rollback(changeset) {
  changeset.rollback();

  this.transitionToByModel(changeset.data);
}

@action
async delete(changeset) {
  try {
    await changeset.destroyRecord();

    const message = this.intl.t('form.deleteRecord', {
      title: changeset.title
    });

    this.flashMessages.success(message);
    this.transitionToByModel(changeset.data);
  } catch(error) {
    this.flashMessages.success(error);
  }
}


// Functions
transitionToByModel(model, single) {
  let modelName = model.constructor.modelName;
  let indexRoute = pluralize(modelName);
  let path = ['profile'];

  path.push(indexRoute);

  if (single) {
    path.push(modelName);

    return this.transitionToRoute(path.join('.'), model);
  }

  return this.transitionToRoute(path.join('.'));
}
}
