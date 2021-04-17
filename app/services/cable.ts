import Service, { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';
import Session from 'ember-simple-auth/services/session';
import ActionCable, { createConsumer } from "@rails/actioncable"

export default class CableService extends Service {
  // Services
  @service session!: Session;


  // Defaults
  @tracked consumer!: ActionCable.Cable;


  // Functions
  constructor() {
    super(...arguments);

    const ENV = getOwner(this).resolveRegistration('config:environment');
    let token = this.session.data?.authenticated.jwt;
    var cableUrl = new URL(ENV.APP.cableUrl);

    if (token) {
      cableUrl.searchParams.append('token', token);
    }

    this.consumer = createConsumer(cableUrl.toString());
  }
}
