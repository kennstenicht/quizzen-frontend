import Model, { attr, belongsTo , hasMany} from '@ember-data/model';
import { alias } from '@ember/object/computed';
import User from 'quizzen/models/user';
import Question from 'quizzen/models/question';
import Game from 'quizzen/models/game';
import GameAnswer from 'quizzen/models/game-answer';
import SelfAssessment from 'quizzen/models/self-assessment';

export default class GameQuestionModel extends Model {
  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @belongsTo('game') game?: Game;
  @hasMany('gameAnswer') gameAnswers?: GameAnswer[];
  @belongsTo('question') question?: Question;
  @hasMany('selfAssessment') selfAssessments?: SelfAssessment[];
  @belongsTo('user') winner?: User;


  // Getter and setter
  @alias('question.label') displayLabel!: string;
}
