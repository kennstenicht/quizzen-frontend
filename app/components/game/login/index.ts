import Component from '@glimmer/component';
import RouterService from '@ember/routing/router-service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import GameModel from 'quizzen/models/game';

interface Args {
  game: GameModel
}

export default class GameLoginComponent extends Component<Args> {
  // Services
  @service router!: RouterService;


  // Actions
  @action
  transitionToLogin() {
    this.router.transitionTo('login');
  }
}
