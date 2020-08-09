import Model, { attr, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import AnswerValidations from 'quizzen/validations/answer';
import Question from 'quizzen/models/question';

export default class AnswerModel extends Model {
  validations = AnswerValidations;

  // Attributes
  @attr('string') label!: string;
  @attr('string') value!: string;
  @attr('string') information!: string;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @belongsTo('question') question?: Question;


  // Getter and setter
  @alias('label') displayLabel!: string;
}
