import Model, { attr, belongsTo } from '@ember-data/model';
import User from 'quizzen/models/user';
import Answer from 'quizzen/models/answer';
import GameQuestion from 'quizzen/models/game-question';

export default class GameQuestionModel extends Model {
  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @belongsTo('answer') answer?: Answer;
  @belongsTo('gameQuestion') gameQuestion?: GameQuestion;
  @belongsTo('user') user?: User;
}
