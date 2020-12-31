import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import Category from 'quizzen/models/category';

export default class QuizModel extends Model {
  // Attributes
  @attr('string') title!: string;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @hasMany('category') categories?: Category[];


  // Getter and setter
  @alias('title') displayLabel!: string;
}
