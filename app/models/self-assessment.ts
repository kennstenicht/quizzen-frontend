import Model from 'quizzen/models/base';
import { attr, belongsTo } from '@ember-data/model';
import User from 'quizzen/models/user';
import GameQuestion from 'quizzen/models/game-question';

export default class selfAssessmentModel extends Model {
  // Attributes
  @attr('number') assessment!: number;


  // Relations
  @belongsTo('gameQuestion') gameQuestion?: GameQuestion;
  @belongsTo('user') user?: User;


  // Getter and setter
  get displayLabel() {
    return String(this.assessment) ?? super.displayLabel;
  }
}
