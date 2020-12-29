import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import QuestionValidations from 'quizzen/validations/question';
import Answer from 'quizzen/models/answer';
import Category from 'quizzen/models/category';

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
  @hasMany('answer') answers?: Answer[];
  @hasMany('category') categories?: Category[];


  // Getter and setter
  @alias('label') displayLabel!: string;

  get numAnswers() {
    return this.answers?.length;
  }
}
