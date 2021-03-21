import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import Confirm from 'quizzen/services/confirm';
// @ts-ignore
import { keyResponder, onKey } from 'ember-keyboard';

@keyResponder
export default class ApplicationConfirm extends Component {
  // Services
  @service confirm!: Confirm;


  // Keyboard actions
  @onKey('Enter')
  confirmOnEnter() {
    this.confirm.confirm();
  }

  @onKey('Escape')
  cancelOnEscape() {
    this.confirm.cancel();
  }
}
