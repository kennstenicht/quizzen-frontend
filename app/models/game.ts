import Model, { attr, belongsTo , hasMany} from '@ember-data/model';
import { alias } from '@ember/object/computed';
import GameValidations from 'quizzen/validations/game';
import User from 'quizzen/models/user';
import Quiz from 'quizzen/models/quiz';

export default class GameModel extends Model {
  validations = GameValidations;

  // Attributes
  @attr('string') title!: string;
  @attr('boolean') joined!: boolean;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @belongsTo('user') quizMaster?: User;
  @belongsTo('quiz') quiz?: Quiz;
  @hasMany('user') players?: User;


  // Getter and setter
  @alias('title') displayLabel!: string;
}
