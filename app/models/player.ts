import ArrayProxy from '@ember/array/proxy';
import { belongsTo } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Game from 'quizzen/models/game';
import Team from 'quizzen/models/team';
import User from 'quizzen/models/user';

export default class UserModel extends Model {
  // Relation
  @belongsTo('game') game?: ArrayProxy<Game>;
  @belongsTo('team') team?: ArrayProxy<Team>;
  @belongsTo('user') wiusernner?: ArrayProxy<User>;
}
