import {
  validatePresence
} from 'ember-changeset-validations/validators';

export default {
  email: [
    validatePresence({ presence: true }),
  ],
  password: [
    validatePresence({ presence: true }),
  ]
};
