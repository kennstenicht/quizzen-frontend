import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import Intl from 'ember-intl/services/intl';
import Router from '@ember/routing/router-service';

interface JsonObject {
  [key: string]: any
}

export default class HeadDataService extends Service {
  // Services
  @service router!: Router;
  @service intl!: Intl;


  // Defaults
  @tracked fallbackMetaTags: JsonObject = {};
  @tracked blurTitle: string = '';


  // Getter and Setter
  get ENV() {
    return getOwner(this).resolveRegistration('config:environment');
  }

  get metaTags() {
    return {
      ...this.fallbackMetaTags,
      ...this.translationMetaTags,
      ...this.routeMetaTags
    };
  }

  get routeModel() {
    // @ts-ignore
    return this.router.currentRoute.attributes as Model;
  }

  get routeMetaTags() {
    let model = this.routeModel;
    let routeInfo = this.router.currentRoute as CustomRouteInfo;

    if (!model) {
      return {};
    }

    if (routeInfo.metadata?.metaTags) {
      return routeInfo.metadata.metaTags({
        model: model,
        intl: this.intl,
        ENV: this.ENV
      });
    }

    return {};
  }

  get translationMetaTags() {
    let metaTags: JsonObject = {};

    ['title', 'description'].forEach((key) => {
      const translation = this._getTranslation(key);

      if(translation) {
        metaTags[key] = translation;
      }
    });

    return metaTags;
  }

  // Meta tags detail getter
  get title() {
    let title = `${this.metaTags.title} | ${this.company.name}`;
    let blurTitle = this.blurTitle;

    return blurTitle || title;
  }

  get description() {
    return this.metaTags.description;
  }

  get image() {
    return this.metaTags.image;
  }

  get type() {
    return this.metaTags.type;
  }

  get structuredData() {
    if (!this.metaTags.structuredData) {
      return null;
    }

    return JSON.stringify(this.metaTags.structuredData);
  }

  get locale() {
    return this.intl.primaryLocale || 'de';
  }

  get url() {
    return this.router.currentURL;
  }

  get company() {
    return this.ENV.company;
  }


  // Hooks
  constructor() {
    super(...arguments);


    // Change title to blur title if window is not in focus
    window.onblur = () => {
      if (this.metaTags.blurTitle) {
        this.blurTitle = this.metaTags.blurTitle;
      }
    }
    window.onfocus = () => {
      if (this.metaTags.blurTitle) {
        this.blurTitle = '';
      }
    }
  }


  // Functions
  _getTranslation(type: string) {
    let currentRouteName = this.router.currentRouteName?.split('.');

    // Check if translation exists for route or any parent route
    for(let x = currentRouteName.length; x > 0; x--) {
      let path = `${currentRouteName.slice(0, x).join('.')}.meta.${type}`;
      let options: JsonObject = {};

      if (this.routeModel) {
        options.displayLabel = this.routeModel.displayLabel
      }

      if(this.intl.exists(path)) {
        return this.intl.t(path, options);
      }
    }

    return '';
  }
}
