import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import CategoryValidations from 'quizzen/validations/category';
import Question from 'quizzen/models/question';
import Quiz from 'quizzen/models/quiz';

export default class CategoryModel extends Model {
  validations = CategoryValidations;

  // Attributes
  @attr('string') title!: string;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @hasMany('question') questions?: Question;
  @hasMany('quiz') quizzes?: Quiz;


  // Getter and setter
  @alias('title') displayLabel!: string;
}
