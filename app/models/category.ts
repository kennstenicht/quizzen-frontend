import { attr, hasMany, AsyncHasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Question from 'quizzen/models/question';
import Quiz from 'quizzen/models/quiz';

export default class CategoryModel extends Model {
  // Attributes
  @attr('string') declare title: string;


  // Relations
  @hasMany('question') declare questions: AsyncHasMany<Question>;
  @hasMany('quiz') declare quizzes: AsyncHasMany<Quiz>;


  // Getter and setter
  get displayLabel() {
    return this.title ?? super.displayLabel;
  }

  get numQuestions() {
    return this.questions?.length;
  }
}
