import { attr, hasMany, AsyncHasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Answer from 'quizzen/models/answer';
import Category from 'quizzen/models/category';

export default class QuestionModel extends Model {
  // Attributes
  @attr('string') declare label: string;
  @attr('string') declare source: string;
  @attr('date') declare date: string;


  // Relations
  @hasMany('answer')
  declare answers: AsyncHasMany<Answer>;

  @hasMany('category')
  declare categories: AsyncHasMany<Category>;


  // Getter and setter
  get displayLabel() {
    return this.label ?? super.displayLabel;
  }

  get numAnswers() {
    return this.answers?.length;
  }
}
