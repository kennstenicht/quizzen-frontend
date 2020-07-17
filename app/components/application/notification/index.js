import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';

export default class ApplicationHeaderNotificationComponent extends Component {
  // Actions
  @action
  preventExiting() {
    const flash = this.args.flash;

    if (isPresent(flash)) {
      flash.preventExit();
    }
  }

  @action
  allowExiting() {
    const flash = this.args.flash;

    if (isPresent(flash) && !flash.exiting) {
      flash.allowExit();
    }
  }
}
