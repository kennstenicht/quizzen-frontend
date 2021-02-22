import Model, { attr, hasMany } from '@ember-data/model';
import { alias } from '@ember/object/computed';
import Game from 'quizzen/models/game';
import GameQuestions from 'quizzen/models/game-question';

export default class GuessQuestionModel extends Model {
  // Attributes
  @attr('string') answer!: string;
  @attr('date') date!: string;
  @attr('string') label!: string;
  @attr('string') source!: string;
  @attr('string') unit?: string;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @hasMany('game') games?: Game[];
  @hasMany('game-question') gameQuestions?: GameQuestions[];


  // Getter and setter
  @alias('label') displayLabel!: string;

  get answerLabel() {
    return `${this.answer}${this.unit}`;
  }
}
