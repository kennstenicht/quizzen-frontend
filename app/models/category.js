import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import CategoryValidations from 'quizzen/validations/category';

export default class CategoryModel extends Model {
  validations = CategoryValidations;

  // Attributes
  @attr('string') title;


  // Meta
  @attr('date') createdAt;
  @attr('date') updatedAt;


  // Relations
  @hasMany questions;


  // Getter and setter
  @alias('title') displayLabel;
}
