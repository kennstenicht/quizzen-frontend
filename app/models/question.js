import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import QuestionValidations from 'quizzen/validations/question';

export default class QuestionModel extends Model {
  validations = QuestionValidations;

  // Attributes
  @attr('string') label;
  @attr('string') source;
  @attr('date') date;


  // Meta
  @attr('date') createdAt;
  @attr('date') updatedAt;


  // Relations
  @hasMany answers;


  // Getter and setter
  @alias('label') displayLabel;
}
