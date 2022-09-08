import { belongsTo, AsyncBelongsTo } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Player from 'quizzen/models/player';
import Answer from 'quizzen/models/answer';
import PlayedQuestion from 'quizzen/models/played-question';

export default class PlayedAnswerModel extends Model {
  // Relations
  @belongsTo('answer')
  declare answer: AsyncBelongsTo<Answer>;

  @belongsTo('playedQuestion')
  declare playedQuestion: AsyncBelongsTo<PlayedQuestion>;

  @belongsTo('player')
  declare player: AsyncBelongsTo<Player>;
}
