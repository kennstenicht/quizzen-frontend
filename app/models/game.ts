import Model, { attr, belongsTo , hasMany} from '@ember-data/model';
import { alias } from '@ember/object/computed';
import GameValidations from 'quizzen/validations/game';
import User from 'quizzen/models/user';
import Quiz from 'quizzen/models/quiz';
import Team from 'quizzen/models/team';

export default class GameModel extends Model {
  validations = GameValidations;

  // Attributes
  @attr('boolean') active!: boolean;
  @attr('string') title!: string;
  @attr('boolean') joined!: boolean;
  @attr('boolean') yourGame!: boolean;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @belongsTo('user') quizMaster?: User;
  @belongsTo('quiz') quiz?: Quiz;
  @hasMany('user') players?: User[];
  @hasMany('gameQuestion') gameQuestions?: User[];
  @hasMany('team') teams?: Team[];


  // Getter and setter
  @alias('title') displayLabel!: string;
}
