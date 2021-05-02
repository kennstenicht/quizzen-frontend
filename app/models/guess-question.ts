import ArrayProxy from '@ember/array/proxy';
import { attr, hasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Game from 'quizzen/models/game';
import PlayedQuestions from 'quizzen/models/played-question';

export default class GuessQuestionModel extends Model {
  // Attributes
  @attr('string') answer!: string;
  @attr('date') date!: string;
  @attr('string') label!: string;
  @attr('string') source!: string;
  @attr('string') unit?: string;


  // Relations
  @hasMany('game') games?: ArrayProxy<Game[]>;
  @hasMany('played-question') playedQuestions?: ArrayProxy<PlayedQuestions[]>;


  // Getter and setter
  get displayLabel() {
    return this.label ?? super.displayLabel;
  }

  get answerLabel() {
    return `${this.answer} ${this.unit}`;
  }
}
