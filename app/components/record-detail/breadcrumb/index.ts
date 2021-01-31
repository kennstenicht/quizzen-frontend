import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { pluralize } from 'ember-inflector';
import Breadcrumb, { BreadcrumbItem } from 'quizzen/services/breadcrumb';
import Confirm from 'quizzen/services/confirm';

export default class RecordDetailBreadcrumb extends Component {
  // Services
  @service breadcrumb!: Breadcrumb;
  @service confirm!: Confirm;


  // Defaults
  @tracked hoverIndex?: number;


  // Getter and setter
  get indexModelName() {
    return this.breadcrumb.firstItem.modelName;
  }

  get indexRoute() {
    return `profile.${pluralize(this.indexModelName)}`;
  }


  // Actions
  @action
  setHoverIndex(item: BreadcrumbItem) {
    this.hoverIndex = this.breadcrumb.items.indexOf(item);
  }

  @action
  removeHoverIndex() {
    this.hoverIndex = undefined;
  }
}
