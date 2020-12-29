import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import User from 'quizzen/models/user';
import Game from 'quizzen/models/game';

export default class TeamModel extends Model {
  // Attributes
  @attr('string') name!: string;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @belongsTo('game') game?: Game;
  @hasMany('user') users?: User[];


  // Getter and setter
  @alias('name') displayLabel!: string;
}
