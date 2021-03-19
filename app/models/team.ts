import Model from 'quizzen/models/base';
import { attr, belongsTo, hasMany } from '@ember-data/model';
import User from 'quizzen/models/user';
import Game from 'quizzen/models/game';

export default class TeamModel extends Model {
  // Attributes
  @attr('string') name!: string;


  // Relations
  @belongsTo('game') game?: Game;
  @hasMany('user') users?: User[];


  // Getter and setter
  get displayLabel() {
    return this.name;
  }
}
