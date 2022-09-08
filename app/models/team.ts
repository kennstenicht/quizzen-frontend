import { attr, belongsTo, hasMany, AsyncBelongsTo, AsyncHasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Player from 'quizzen/models/player';
import Game from 'quizzen/models/game';

export default class TeamModel extends Model {
  // Attributes
  @attr('string') declare color: string;
  @attr('string') declare name: string;


  // Relations
  @belongsTo('game')
  declare game: AsyncBelongsTo<Game>;

  @hasMany('player')
  declare players: AsyncHasMany<Player>;


  // Getter and setter
  get displayLabel() {
    return this.name ?? super.displayLabel;
  }
}
