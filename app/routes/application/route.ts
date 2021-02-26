import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import Transition from '@ember/routing/-private/transition';
import CurrentUser from 'quizzen/services/current-user';
import Moment from 'ember-moment/services/moment';
import Intl from 'ember-intl/services/intl';
import Session from 'ember-simple-auth/services/session';
import Breadcrumb from 'quizzen/services/breadcrumb';
import HeadData from 'quizzen/services/head-data';

export default class ApplicationRoute extends Route {
  // Services
  @service currentUser!: CurrentUser;
  @service breadcrumb!: Breadcrumb;
  @service headData!: HeadData;
  @service intl!: Intl;
  @service moment!: Moment;
  @service session!: Session;


  // Hooks
  beforeModel() {
    // Set Locale
    this.moment.setLocale('de');
    this.intl.setLocale('de');

    // Setup head data fallback tags
    this.headData.fallbackMetaTags = {
      title: this.intl.t('application.meta.title'),
      description: this.intl.t('application.meta.description'),
      image: '/assets/meta/sharing-image--default.jpg',
      type: 'website',
      structuredData: null,
    }

    // Load current User
    return this.currentUser.load();
  }


  // Actions
  @action
  error(error: any) {
    if (error.errors.some((error: ApiError) => error.status === 403)) {
      return this.session.invalidate();
    } else {
      return true;
    }
  }

  @action
  willTransition(transition: Transition) {
    if (this.breadcrumb.hasItems) {
      let attemptedBreadcrumbItem = this.breadcrumb.findItem(
        transition.to.name,
        this.controller.model
      );

      if (attemptedBreadcrumbItem) {
        this.breadcrumb.rollbackTo(attemptedBreadcrumbItem, transition);
      } else {
        this.breadcrumb.clear(transition);
      }
    }
  }
}
