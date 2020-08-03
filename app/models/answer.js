import Model, { attr, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import AnswerValidations from 'quizzen/validations/answer';

export default class AnswerModel extends Model {
  validations = AnswerValidations;

  // Attributes
  @attr('string') label;
  @attr('string') value;
  @attr('string') information;


  // Meta
  @attr('date') createdAt;
  @attr('date') updatedAt;


  // Relations
  @belongsTo question;


  // Getter and setter
  @alias('label') displayLabel;
}
