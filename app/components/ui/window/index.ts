import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface Args {
  showBottombar?: boolean
}

export default class UiWindowComponent extends Component<Args> {
  // Defaults
  @tracked isToolbarCompact: boolean = false;


  // Getter, setter and computed properties
  get showBottombar() {
    return this.args.showBottombar ?? true;
  }

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
