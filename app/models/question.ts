import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import QuestionValidations from 'quizzen/validations/question';
import Answer from 'quizzen/models/answer';

export default class QuestionModel extends Model {
  validations = QuestionValidations;

  // Attributes
  @attr('string') label!: string;
  @attr('string') source!: string;
  @attr('date') date!: string;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @hasMany('answer') answers?: Answer;


  // Getter and setter
  @alias('label') displayLabel!: string;
}
