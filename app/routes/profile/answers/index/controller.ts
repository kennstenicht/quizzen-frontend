import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProfileAnswersIndexController extends Controller {
  // Defaults
  queryParams = ['page', 'q'];
  @tracked page?: number;
  @tracked q?: string;


  // Actions
  @action
  selectPage(page: number) {
    this.page = page;
  }

  @action
  updateSearch(searchString: string) {
    this.q = searchString;
  }
}
