import Component from './@ember/component';
import { set } from './@ember/object';
import BEM from './ember-cli-bem/mixins/bem';

export default Component.extend(BEM, {
  blockName: 'c-search-bar',
  mods: [
    'active:is-active',
    'search:has-value:has-no-value'
  ],

  actions: {
    clear() {
      set(this, 'search', null);
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
