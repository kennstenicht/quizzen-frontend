import Model from 'quizzen/models/base';
import { attr, belongsTo } from '@ember-data/model';
import Question from 'quizzen/models/question';

export default class AnswerModel extends Model {
  // Attributes
  @attr('string') label!: string;
  @attr('string') value!: string;
  @attr('string') information!: string;


  // Relations
  @belongsTo('question') question?: Question;


  // Getter and setter
  get displayLabel() {
    return this.label;
  }
}
