import Component from '@glimmer/component';
import GameModel from 'quizzen/models/game';

interface Args {
  game: GameModel
}

export default class GameStateWaitingComponent extends Component<Args> {
  get playerTypeComponent() {
    return `game/state/waiting/${this.args.game.playerType}`;
  }
}
