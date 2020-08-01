import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  // Attributes
  @attr('string') firstname;
  @attr('string') lastname;
  @attr('string') email;


  // Meta
  @attr('date') createdAt;
  @attr('date') updatedAt;


  // Relations


  // Getter and setter
  get displayLabel() {
    return `${this.firstname} ${this.lastname}`;
  }

  get initials() {
    return `${this.firstname.substring(0,1)}${this.lastname.substring(0,1)}`;
  }
}
