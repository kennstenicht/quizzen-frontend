import { attr, belongsTo, hasMany, AsyncBelongsTo, AsyncHasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Player from 'quizzen/models/player';
import Game from 'quizzen/models/game';

export default class TeamModel extends Model {
  // Attributes
  @attr('string') color!: string;
  @attr('string') name!: string;


  // Relations
  @belongsTo('game') game!: AsyncBelongsTo<Game>;
  @hasMany('player') players?: AsyncHasMany<Player>;


  // Getter and setter
  get displayLabel() {
    return this.name ?? super.displayLabel;
  }
}
