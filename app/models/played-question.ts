import ArrayProxy from '@ember/array/proxy';
import { belongsTo , hasMany} from '@ember-data/model';
import { sort } from '@ember/object/computed';
import Model from 'quizzen/models/base';
import User from 'quizzen/models/user';
import Question from 'quizzen/models/question';
import Game from 'quizzen/models/game';
import PlayedAnswer from 'quizzen/models/played-answer';
import GuessQuestion from 'quizzen/models/guess-question';
import SelfAssessment from 'quizzen/models/self-assessment';

export default class PlayedQuestionModel extends Model {
  // Relations
  @belongsTo('game') game!: ArrayProxy<Game>;
  @hasMany('playedAnswer') playedAnswers?: ArrayProxy<PlayedAnswer[]>;
  @belongsTo('guessQuestion') guessQuestion?: ArrayProxy<GuessQuestion>;
  @belongsTo('question') question!: ArrayProxy<Question>;
  @hasMany('selfAssessment') selfAssessments?: ArrayProxy<SelfAssessment[]>;
  @belongsTo('user') winner?: ArrayProxy<User>;


  // Getter and setter
  get displayLabel() {
    return this.question.label ?? super.displayLabel;
  }
}
