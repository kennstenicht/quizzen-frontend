import { belongsTo, AsyncBelongsTo } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Player from 'quizzen/models/player';
import Answer from 'quizzen/models/answer';
import PlayedQuestion from 'quizzen/models/played-question';

export default class PlayedAnswerModel extends Model {
  // Relations
  @belongsTo('answer') answer!: AsyncBelongsTo<Answer>;
  @belongsTo('playedQuestion') playedQuestion!: AsyncBelongsTo<PlayedQuestion>;
  @belongsTo('player') player?: AsyncBelongsTo<Player>;
}
