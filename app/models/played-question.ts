import { belongsTo , hasMany, AsyncBelongsTo, AsyncHasMany } from '@ember-data/model';
import Model from 'quizzen/models/base';
import Player from 'quizzen/models/player';
import Question from 'quizzen/models/question';
import Game from 'quizzen/models/game';
import PlayedAnswer from 'quizzen/models/played-answer';
import GuessQuestion from 'quizzen/models/guess-question';
import SelfAssessment from 'quizzen/models/self-assessment';

export default class PlayedQuestionModel extends Model {
  // Relations
  @belongsTo('game') game!: AsyncBelongsTo<Game>;
  @hasMany('playedAnswer') playedAnswers?: AsyncHasMany<PlayedAnswer>;
  @belongsTo('guessQuestion') guessQuestion?: AsyncBelongsTo<GuessQuestion>;
  @belongsTo('question') question!: AsyncBelongsTo<Question>;
  @hasMany('selfAssessment') selfAssessments?: AsyncHasMany<SelfAssessment>;
  @belongsTo('player') winner?: AsyncBelongsTo<Player>;


  // Getter and setter
  get displayLabel() {
    return this.question.label ?? super.displayLabel;
  }
}
