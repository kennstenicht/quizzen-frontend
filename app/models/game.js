import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';

export default class GameModel extends Model {
  // Attributes
  @attr('string') title;


  // Meta
  @attr('date') createdAt;
  @attr('date') updatedAt;


  // Relations
  @hasMany categories;


  // Getter and setter
  @alias('title') displayLabel;
}
