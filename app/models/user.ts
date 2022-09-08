import Model from 'quizzen/models/base';
import { attr } from '@ember-data/model';

export default class UserModel extends Model {
  // Attributes
  @attr('string') declare email: string;
  @attr('string') declare firstname: string;
  @attr('string') declare lastname: string;
  @attr('string') declare nickname: string;


  // Getter and setter
  get displayLabel(): string {
    return `${this.firstname} ${this.lastname}` ?? super.displayLabel;
  }

  get initials(): string {
    return `${this.firstname.substring(0,1)}${this.lastname.substring(0,1)}`;
  }
}
