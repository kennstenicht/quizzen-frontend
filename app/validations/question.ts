import {
  validatePresence,
  validateLength,
  validateFormat
} from 'ember-changeset-validations/validators';

export default {
  label: [
    validatePresence({ presence: true }),
    validateLength({ min: 4 })
  ],
  source: [
    validatePresence({ presence: true }),
    validateFormat({ type: 'url' })
  ],
  date: [
    validatePresence({ presence: true })
  ]
};
