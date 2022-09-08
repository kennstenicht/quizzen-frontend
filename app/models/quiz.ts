import { attr, hasMany, AsyncHasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Category from 'quizzen/models/category';

export default class QuizModel extends Model {
  // Attributes
  @attr('string') declare title: string;


  // Relations
  @hasMany('category')
  declare categories: AsyncHasMany<Category>;


  // Getter and setter
  get displayLabel() {
    return this.title ?? super.displayLabel;
  }}
