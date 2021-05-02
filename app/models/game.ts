import ArrayProxy from '@ember/array/proxy';
import { attr, belongsTo , hasMany} from '@ember-data/model';
import GuessQuestion from 'quizzen/models/guess-question';
import Model from 'quizzen/models/base';
import PlayedQuestion from 'quizzen/models/played-question';
import Player from 'quizzen/models/guess-question';
import Quiz from 'quizzen/models/quiz';
import Team from 'quizzen/models/team';
import User from 'quizzen/models/user';

export default class GameModel extends Model {
  // Attributes
  @attr('boolean') active!: boolean;
  @attr('string') title!: string;
  @attr('boolean') joined!: boolean;
  @attr('boolean') yourGame!: boolean;


  // Relations
  @belongsTo('user') quizMaster?: ArrayProxy<User>;
  @belongsTo('quiz') quiz?: ArrayProxy<Quiz>;
  @hasMany('player') players?: ArrayProxy<Player[]>;
  @hasMany('playedQuestion') playedQuestions?: ArrayProxy<PlayedQuestion[]>;
  @belongsTo('guessQuestion') guessQuestion?: ArrayProxy<GuessQuestion>;
  @hasMany('team') teams?: ArrayProxy<Team[]>;


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
