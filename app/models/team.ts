import ArrayProxy from '@ember/array/proxy';
import { attr, belongsTo, hasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import User from 'quizzen/models/user';
import Game from 'quizzen/models/game';
import SelfAssessment from 'quizzen/models/self-assessment';

export default class TeamModel extends Model {
  // Attributes
  @attr('string') color!: string;
  @attr('string') name!: string;


  // Relations
  @belongsTo('game') game!: ArrayProxy<Game>;
  @hasMany('user') users?: ArrayProxy<User[]>;


  // Getter and setter
  get displayLabel() {
    return this.name ?? super.displayLabel;
  }
}
