import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export default {
  label: [
    validatePresence({ presence: true }),
    validateLength({ min: 3 })
  ]
};
