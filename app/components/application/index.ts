import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ENV from 'quizzen/config/environment';
import FlashMessages from 'ember-cli-flash/services/flash-messages';
import Fastboot from 'ember-cli-fastboot/services/fastboot';
import Session from 'ember-simple-auth/services/session';
import Router from '@ember/routing/router-service';

interface RouteSizeMap {
  [key: string]: string;
}

export default class ApplicationComponent extends Component {
  // Services
  @service fastboot!: Fastboot;
  @service flashMessages!: FlashMessages;
  @service router!: Router;
  @service session!: Session;


  // Defaults
  @tracked showCookieNotice = false;


  // Getter and Setter
  get isDevelopment() {
    return ENV.environment === 'development';
  }

  get size() {
    const routeSizes: RouteSizeMap = {
      'login': 'small',
      'profile.user': 'small',
      'games.game': 'small'
    }

    return routeSizes[this.router.currentRouteName] ?? 'base';
  }


  // Hooks
  constructor(owner: unknown, args: any) {
    super(owner, args);

    if (!this.fastboot.isFastBoot) {
      window.addEventListener('hashchange', this.checkHash.bind(this));
    }
  }

  willDestroy() {
    if (!this.fastboot.isFastBoot) {
      window.removeEventListener('hashchange', this.checkHash.bind(this));
    }
  }


  // Actions
  @action
  toggleCookieNotice() {
    this.showCookieNotice = !this.showCookieNotice;
  }


  // Functions
  checkHash() {
    if (location.hash == '#change-cookie-settings') {
      this.toggleCookieNotice();

      location.hash = ''
    }
  }
}
