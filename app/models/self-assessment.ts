import { attr, belongsTo, AsyncBelongsTo } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Player from 'quizzen/models/player';
import PlayedQuestion from 'quizzen/models/played-question';

export default class SelfAssessmentModel extends Model {
  // Attributes
  @attr('number') declare assessment: number;
  @attr('boolean') declare isFalseAssessment: boolean;


  // Relations
  @belongsTo('playedQuestion')
  declare playedQuestion: AsyncBelongsTo<PlayedQuestion>;

  @belongsTo('player')
  declare player: AsyncBelongsTo<Player>;


  // Getter and setter
  get displayLabel() {
    return String(this.assessment) ?? super.displayLabel;
  }
}
