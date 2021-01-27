import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UiWindowComponent extends Component {
  // Defaults
  @tracked isToolbarCompact: boolean = false;


  // Actions
  @action
  onBodyScroll(event: Event) {
    let element = event.target as HTMLElement;

    if (element.scrollTop) {
      this.isToolbarCompact = true;
    } else {
      this.isToolbarCompact = false;
    }
  }
}
