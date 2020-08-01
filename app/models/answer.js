import Model, { attr, belongsTo } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class QuestionModel extends Model {
  // Attributes
  @attr('string') label;
  @attr('string') value;
  @attr('string') information;


  // Meta
  @attr('date') createdAt;
  @attr('date') updatedAt;


  // Relations
  @belongsTo answers;


  // Getter and setter
  @alias('label') displayLabel;
}
