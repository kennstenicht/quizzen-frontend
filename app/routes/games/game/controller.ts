import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Session from 'ember-simple-auth/services/session';
import Router from '@ember/routing/router-service';
import FlashMessages from 'ember-cli-flash/services/flash-messages';
// @ts-ignore
import { createConsumer, Cable as CableConnection } from "@rails/actioncable"
import Game from 'quizzen/models/game';
import Cable from 'quizzen/services/cable';

export default class GamesGameController extends Controller {
  // Services
  @service cable!: Cable;
  @service flashMessages!: FlashMessages;
  @service router!: Router;
  @service session!: Session;


  // Defaults
  game: CableConnection;


  // Actions
  @action
  join() {
    this.game.perform('join');
  }

  @action
  subscribe(game: Game) {
    this.game = this.cable.consumer.subscriptions.create({
      channel: `V1::GamesChannel`,
      game_id: game.id
    }, {
      connected: () => {
        this.flashMessages.success("Erfolgreich mit dem Quiz Master verbunden");
      },

      disconnected: () => {
        this.flashMessages.warning("Fehler bei der Verbindung");
      },

      received: (payload: any) => {
        this.store.pushPayload(payload);
      }
    });
    console.log(this.game);

  }

  @action
  transitionToLogin() {
    this.router.transitionTo('login');
  }

  @action
  unsubscribe() {
    this.game.unsubscribe();
  }
}
