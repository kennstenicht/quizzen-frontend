import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProfileGamesIndexController extends Controller {
  // Defaults
  queryParams = ['page'];
  @tracked page = 1;


  // Actions
  @action
  selectPage(page: number) {
    this.page = page;
  }
}
