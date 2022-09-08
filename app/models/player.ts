import { belongsTo, AsyncBelongsTo } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Game from 'quizzen/models/game';
import Team from 'quizzen/models/team';
import User from 'quizzen/models/user';

export default class UserModel extends Model {
  // Relation
  @belongsTo('game')
  declare game: AsyncBelongsTo<Game>;

  @belongsTo('team')
  declare team: AsyncBelongsTo<Team>;

  @belongsTo('user')
  declare user: AsyncBelongsTo<User>;
}
