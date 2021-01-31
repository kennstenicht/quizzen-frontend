import Service from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

interface AskObject {
  title: string
  message: string
  changes: any
}

export default class ConfirmService extends Service {
  // Defaults
  @tracked showPrompt: boolean = false;
  @tracked title?: string;
  @tracked message?: string;
  @tracked changes?: any[];
  @tracked resolve: Function = () => {};

  // Functions
  ask({title, message, changes}: AskObject) {
    this.title = title;
    this.message = message;
    this.changes = changes;
    this.showPrompt = true;

    return new Promise((resolve: Function) => {
      this.resolve = resolve;
    });
  }

  reset() {
    console.log('reset');

    this.showPrompt = false;
    this.resolve = () => {};
  }

  // Actions
  @action
  confirm() {
    this.resolve(true);
    this.reset();
  }

  @action
  cancel() {
    this.resolve(false);
    this.reset();
  }
}
