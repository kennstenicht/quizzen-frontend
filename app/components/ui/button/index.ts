import Component from '@glimmer/component';
import { action } from '@ember/object';

interface Args {
  onClick: Function
  style: string
  type: string
}

export default class UiButtonComponent extends Component<Args> {
  // Getter and setter
  get type() {
    return this.args.type ?? 'button';
  }


  // Actions
  @action
  onClick() {
    if (this.args.onClick) {
      this.args.onClick();
    }
  }
}
