import Model from 'quizzen/models/base';
import { attr, belongsTo } from '@ember-data/model';
import User from 'quizzen/models/user';
import PlayedQuestion from 'quizzen/models/played-question';

export default class selfAssessmentModel extends Model {
  // Attributes
  @attr('number') assessment!: number;


  // Relations
  @belongsTo('playedQuestion') playedQuestion?: PlayedQuestion;
  @belongsTo('user') user?: User;


  // Getter and setter
  get displayLabel() {
    return String(this.assessment) ?? super.displayLabel;
  }
}
