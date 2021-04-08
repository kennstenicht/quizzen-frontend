import Model from 'quizzen/models/base';
import { belongsTo } from '@ember-data/model';
import User from 'quizzen/models/user';
import Answer from 'quizzen/models/answer';
import PlayedQuestion from 'quizzen/models/played-question';

export default class PlayedQuestionModel extends Model {
  // Relations
  @belongsTo('answer') answer?: Answer;
  @belongsTo('playedQuestion') playedQuestion?: PlayedQuestion;
  @belongsTo('user') user?: User;
}
