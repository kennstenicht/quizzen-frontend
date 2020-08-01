import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class QuestionModel extends Model {
  // Attributes
  @attr('string') label;
  @attr('string') source;
  @attr('date') date;


  // Meta
  @attr('date') createdAt;
  @attr('date') updatedAt;


  // Relations
  @hasMany answers;


  // Getter and setter
  @alias('label') displayLabel;
}
