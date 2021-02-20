import Component from '@glimmer/component';
import { task, timeout } from 'ember-concurrency';

interface Args {
  updateSearch: Function
}

export default class UiSearchComponent extends Component<Args> {
  // Tasks
  @task({
    restartable: true
  }) *throtteldSearch(event: Event) {
    const target = event.target as HTMLInputElement;

    yield timeout(400);

    this.args.updateSearch(target.value);
  }
}
