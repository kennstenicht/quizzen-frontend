import ArrayProxy from '@ember/array/proxy';
import { attr, belongsTo } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Question from 'quizzen/models/question';

export default class AnswerModel extends Model {
  // Attributes
  @attr('string') label!: string;
  @attr('string') value?: string;
  @attr('string') information?: string;


  // Relations
  @belongsTo('question') question?: ArrayProxy<Question>;


  // Getter and setter
  get displayLabel() {
    if (this.label && this.value) {
      return `${this.label} ${this.value}`;
    }

    return this.label ?? super.displayLabel;
  }
}
