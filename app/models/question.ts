import ArrayProxy from '@ember/array/proxy';
import { attr, hasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Answer from 'quizzen/models/answer';
import Category from 'quizzen/models/category';

export default class QuestionModel extends Model {
  // Attributes
  @attr('string') label!: string;
  @attr('string') source!: string;
  @attr('date') date!: string;


  // Relations
  @hasMany('answer') answers?: ArrayProxy<Answer[]>;
  @hasMany('category') categories?: ArrayProxy<Category[]>;


  // Getter and setter
  get displayLabel() {
    return this.label ?? super.displayLabel;
  }

  get numAnswers() {
    return this.answers?.length;
  }
}
