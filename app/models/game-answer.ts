import Model from 'quizzen/models/base';
import { belongsTo } from '@ember-data/model';
import User from 'quizzen/models/user';
import Answer from 'quizzen/models/answer';
import GameQuestion from 'quizzen/models/game-question';

export default class GameQuestionModel extends Model {
  // Relations
  @belongsTo('answer') answer?: Answer;
  @belongsTo('gameQuestion') gameQuestion?: GameQuestion;
  @belongsTo('user') user?: User;
}
