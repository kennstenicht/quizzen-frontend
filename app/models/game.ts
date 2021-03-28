import Model from 'quizzen/models/base';
import { attr, belongsTo , hasMany} from '@ember-data/model';
import User from 'quizzen/models/user';
import Quiz from 'quizzen/models/quiz';
import Team from 'quizzen/models/team';
import GameQuestion from 'quizzen/models/game-question';
import GuessQuestion from 'quizzen/models/guess-question';

export default class GameModel extends Model {
  // Attributes
  @attr('boolean') active!: boolean;
  @attr('string') title!: string;
  @attr('boolean') joined!: boolean;
  @attr('boolean') yourGame!: boolean;


  // Relations
  @belongsTo('user') quizMaster?: User;
  @belongsTo('quiz') quiz?: Quiz;
  @hasMany('user') users?: User[];
  @hasMany('gameQuestion') gameQuestions?: GameQuestion[];
  @belongsTo('guessQuestion') guessQuestion?: GuessQuestion;
  @hasMany('team') teams?: Team[];


  // Getter and setter
  get displayLabel() {
    return this.title ?? super.displayLabel;
  }
}
