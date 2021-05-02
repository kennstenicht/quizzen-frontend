import { belongsTo, hasMany, AsyncBelongsTo, AsyncHasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Game from 'quizzen/models/game';
import Team from 'quizzen/models/team';
import User from 'quizzen/models/user';

export default class UserModel extends Model {
  // Relation
  @belongsTo('game') game?: AsyncBelongsTo<Game>;
  @belongsTo('team') team?: AsyncBelongsTo<Team>;
  @belongsTo('user') user?: AsyncBelongsTo<User>;
}
