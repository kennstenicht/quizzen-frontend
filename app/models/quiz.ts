import Model from 'quizzen/models/base';
import { attr, hasMany } from '@ember-data/model';
import Category from 'quizzen/models/category';

export default class QuizModel extends Model {
  // Attributes
  @attr('string') title!: string;


  // Relations
  @hasMany('category') categories?: Category[];


  // Getter and setter
  get displayLabel() {
    return this.title;
  }}
