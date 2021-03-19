import Model from 'quizzen/models/base';
import { belongsTo , hasMany} from '@ember-data/model';
import User from 'quizzen/models/user';
import Question from 'quizzen/models/question';
import Game from 'quizzen/models/game';
import GameAnswer from 'quizzen/models/game-answer';
import GuessQuestion from 'quizzen/models/guess-question';
import SelfAssessment from 'quizzen/models/self-assessment';

export default class GameQuestionModel extends Model {
  // Relations
  @belongsTo('game') game!: Game;
  @hasMany('gameAnswer') gameAnswers?: GameAnswer[];
  @belongsTo('guessQuestion') guessQuestion?: GuessQuestion;
  @belongsTo('question') question!: Question;
  @hasMany('selfAssessment') selfAssessments?: SelfAssessment[];
  @belongsTo('user') winner?: User;


  // Getter and setter
  get displayLabel() {
    return this.question.label;
  }
}
