import {
  validatePresence,
  validateLength
} from 'ember-changeset-validations/validators';

export default {
  label: [
    validatePresence({ presence: true, ignoreBlank: true }),
    validateLength({ min: 4 })
  ],
  source: [
    validatePresence({ presence: true, ignoreBlank: true })
  ]
};
