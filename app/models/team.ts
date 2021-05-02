import ArrayProxy from '@ember/array/proxy';
import { attr, belongsTo, hasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Player from 'quizzen/models/player';
import Game from 'quizzen/models/game';

export default class TeamModel extends Model {
  // Attributes
  @attr('string') color!: string;
  @attr('string') name!: string;


  // Relations
  @belongsTo('game') game!: ArrayProxy<Game>;
  @hasMany('player') players?: ArrayProxy<Player[]>;


  // Getter and setter
  get displayLabel() {
    return this.name ?? super.displayLabel;
  }
}
