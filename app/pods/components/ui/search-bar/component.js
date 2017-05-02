import Ember from 'ember';
import {
  conditional,
  tag
} from 'ember-awesome-macros';

const {
  Component,
  set
} = Ember;

export default Component.extend({
  classNameBindings: ['modifierActive', 'modifierHasValue'],

  modifierActive: conditional('active', tag`${'block'}--is-active`),
  modifierHasValue: conditional('search', tag`${'block'}--has-value`, tag`${'block'}--has-no-value`),

  actions: {
    clear() {
      set(this, 'search', '');
    },

    activate() {
      set(this, 'active', true);
      this.sendAction('toggleSearch', false);
    },

    cancel() {
      set(this, 'active', false);
      this.sendAction('toggleSearch', true);
    }
  }
});
