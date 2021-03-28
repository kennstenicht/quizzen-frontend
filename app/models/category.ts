import Model from 'quizzen/models/base';
import { attr, hasMany } from '@ember-data/model';
import Question from 'quizzen/models/question';
import Quiz from 'quizzen/models/quiz';

export default class CategoryModel extends Model {
  // Attributes
  @attr('string') title!: string;


  // Relations
  @hasMany('question') questions?: Question[];
  @hasMany('quiz') quizzes?: Quiz[];


  // Getter and setter
  get displayLabel() {
    return this.title ?? super.displayLabel;
  }

  get numQuestions() {
    return this.questions?.length;
  }
}
