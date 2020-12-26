import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Session from 'ember-simple-auth/services/session';
// @ts-ignore
import ActionCable, { createConsumer } from "@rails/actioncable"

// @ts-ignore
ActionCable.logger.enabled = true;

export default class CableService extends Service {
  // Services
  @service session!: Session;


  // Defaults
  @tracked consumer?: ActionCable.Cable;


  // Functions
  constructor() {
    super(...arguments);

    let token = this.session.data?.authenticated.jwt;
    var cableUrl = new URL('ws://localhost:3000/cable');

    if (token) {
      cableUrl.searchParams.append('token', token);
    }

    this.consumer = createConsumer(cableUrl);
  }
}
