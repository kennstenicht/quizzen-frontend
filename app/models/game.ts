import { attr, belongsTo , hasMany, AsyncHasMany, AsyncBelongsTo } from '@ember-data/model';
import GuessQuestion from 'quizzen/models/guess-question';
import Model from 'quizzen/models/base';
import PlayedQuestion from 'quizzen/models/played-question';
import Player from 'quizzen/models/player';
import Quiz from 'quizzen/models/quiz';
import Team from 'quizzen/models/team';
import User from 'quizzen/models/user';

export default class GameModel extends Model {
  // Attributes
  @attr('boolean') declare active: boolean;
  @attr('string') declare title: string;
  @attr('boolean') declare joined: boolean;
  @attr('boolean') declare yourGame: boolean;


  // Relations
  @belongsTo('user')
  declare quizMaster: AsyncBelongsTo<User>;

  @belongsTo('quiz')
  declare quiz: AsyncBelongsTo<Quiz>;

  @hasMany('player')
  declare players: AsyncHasMany<Player>;

  @hasMany('playedQuestion')
  declare playedQuestions: AsyncHasMany<PlayedQuestion>;

  @belongsTo('guessQuestion')
  declare guessQuestion: AsyncBelongsTo<GuessQuestion>;

  @hasMany('team')
  declare teams: AsyncHasMany<Team>;


  // Getter and setter
  get displayLabel() {
    return this.title ?? super.displayLabel;
  }

  get currentPlayedQuestion() {
    return this.playedQuestions?.lastObject
  }

  get currentPlayedAnswer() {
    return this.currentPlayedQuestion?.playedAnswers?.lastObject
  }

  get playerType() {
    return this.yourGame ? 'master' : 'player';
  }

  get state() {
    return 'waiting';
  }
}
