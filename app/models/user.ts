import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  // Attributes
  @attr('string') firstname!: string;
  @attr('string') lastname!: string;
  @attr('string') email!: string;


  // Meta
  @attr('date') createdAt!: Date;
  @attr('date') updatedAt!: Date;


  // Relations


  // Getter and setter
  get displayLabel(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  get initials(): string {
    return `${this.firstname.substring(0,1)}${this.lastname.substring(0,1)}`;
  }
}
