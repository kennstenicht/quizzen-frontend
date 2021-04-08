import Model from 'quizzen/models/base';
import { belongsTo , hasMany} from '@ember-data/model';
import User from 'quizzen/models/user';
import Question from 'quizzen/models/question';
import Game from 'quizzen/models/game';
import PlayedAnswer from 'quizzen/models/played-answer';
import GuessQuestion from 'quizzen/models/guess-question';
import SelfAssessment from 'quizzen/models/self-assessment';

export default class PlayedQuestionModel extends Model {
  // Relations
  @belongsTo('game') game!: Game;
  @hasMany('playedAnswer') playedAnswers?: PlayedAnswer[];
  @belongsTo('guessQuestion') guessQuestion?: GuessQuestion;
  @belongsTo('question') question!: Question;
  @hasMany('selfAssessment') selfAssessments?: SelfAssessment[];
  @belongsTo('user') winner?: User;


  // Getter and setter
  get displayLabel() {
    return this.question.label ?? super.displayLabel;
  }
}
