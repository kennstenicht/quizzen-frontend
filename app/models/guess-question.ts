import { attr, hasMany, AsyncHasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Game from 'quizzen/models/game';
import PlayedQuestions from 'quizzen/models/played-question';

export default class GuessQuestionModel extends Model {
  // Attributes
  @attr('string') declare answer: string;
  @attr('date') declare date: string;
  @attr('string') declare label: string;
  @attr('string') declare source: string;
  @attr('string') declare unit?: string;


  // Relations
  @hasMany('game')
  declare games: AsyncHasMany<Game>;

  @hasMany('played-question')
  declare playedQuestions: AsyncHasMany<PlayedQuestions>;


  // Getter and setter
  get displayLabel() {
    return this.label ?? super.displayLabel;
  }

  get answerLabel() {
    return `${this.answer} ${this.unit}`;
  }
}
