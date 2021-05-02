import ArrayProxy from '@ember/array/proxy';
import { belongsTo } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Player from 'quizzen/models/player';
import Answer from 'quizzen/models/answer';
import PlayedQuestion from 'quizzen/models/played-question';

export default class PlayedAnswerModel extends Model {
  // Relations
  @belongsTo('answer') answer!: ArrayProxy<Answer>;
  @belongsTo('playedQuestion') playedQuestion!: ArrayProxy<PlayedQuestion>;
  @belongsTo('player') player?: ArrayProxy<Player>;
}
