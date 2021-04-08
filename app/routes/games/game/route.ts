import Route from '@ember/routing/route';
import Transition from '@ember/routing/-private/transition';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import Session from 'ember-simple-auth/services/session';
import Game from 'quizzen/models/game';
import ConfirmService from 'quizzen/services/confirm';

interface Params {
  user_nickname: string
}

export default class GamesGameRoute extends Route {
  // Services
  @service confirm!: ConfirmService;
  @service session!: Session;
  @service store!: Store;


  // Defaults
  isTransitionRetry = false;


  // Hooks
  beforeModel(transition: Transition) {
    // Set transition to come back after login
    if (!this.session.isAuthenticated) {
      this.session.set('attemptedTransition', transition);
    }
  }

  async model({ user_nickname }: Params) {
    const games = await this.store.query('game', {
      filter: {
        quiz_master_eq: user_nickname,
        active_eq: true
      }
    });

    return games.get('firstObject');
  }

  afterModel(model: Game) {
    if (!model) {
      this.transitionTo('games');
    }
  }

  @action
  async willTransition(transition: Transition) {
    if (this.controller.model.joined && !this.isTransitionRetry) {
      transition.abort();

      let confirmed = await this.confirm.ask(
        'leave-game',
        this.controller.model
      );

      if (confirmed) {
        this.isTransitionRetry = true;
        transition.retry();
      }
    } else {
      this.isTransitionRetry = false;
    }
  }
}
