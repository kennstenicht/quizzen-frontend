import Model, { attr, belongsTo} from '@ember-data/model';
import User from 'quizzen/models/user';
import GameQuestion from 'quizzen/models/game-question';

export default class selfAssessmentModel extends Model {
  // Attributes
  @attr('number') assessment!: number;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations
  @belongsTo('gameQuestion') gameQuestion?: GameQuestion;
  @belongsTo('user') user?: User;
}
