import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import Flash from 'ember-cli-flash/flash/object';

interface Args {
  flash: Flash
}

export default class ApplicationNotificationComponent extends Component<Args> {
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

  @action
  startProgress(element: HTMLElement) {
    // @ts-ignore
    const duration = this.args.flash?.timeout || 0;

    element.style.transitionDuration = `${duration}ms`;
    element.style.width = '100%';
  }
}
