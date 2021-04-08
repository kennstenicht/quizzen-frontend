import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import RouterService from '@ember/routing/router-service';
import SessionService from 'ember-simple-auth/services/session';
import FlashMessagesService from 'ember-cli-flash/services/flash-messages';
import { Channel as CableChannel } from "@rails/actioncable"
import CableService from 'quizzen/services/cable';
import GameModel from 'quizzen/models/game';

interface Args {
  game: GameModel
}

export default class GameComponent extends Component<Args> {
  // Services
  @service cable!: CableService;
  @service flashMessages!: FlashMessagesService;
  @service router!: RouterService;
  @service session!: SessionService;
  @service store!: Store;


  // Defaults
  gameChannel!: CableChannel;


  // Getter, setter and computed properties
  get gameStateComponent() {
    return `game/state/${this.args.game.state}`;
  }


  // Actions
  @action
  join() {
    this.gameChannel.perform('join', {});
  }

  @action
  subscribe(game: GameModel) {
    this.gameChannel = this.cable.consumer.subscriptions.create({
      channel: `V1::GamesChannel`,
      game_id: game.id
    }, {
      disconnected: () => {
        this.flashMessages.warning(`Die Verbindung zu "${this.args.game.displayLabel}" wurde beendet.`);
      },

      received: (payload: any) => {
        this.store.pushPayload(payload);
      }
    });
  }


  @action
  unsubscribe() {
    this.gameChannel.unsubscribe();
  }
}
