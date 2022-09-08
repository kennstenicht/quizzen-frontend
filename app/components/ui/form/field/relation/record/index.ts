import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import BaseModel from 'quizzen/models/base';
import Accordion from 'quizzen/services/accordion';
import Breadcrumb from 'quizzen/services/breadcrumb';

interface Args {
  record: BaseModel
  foreignRecord: BaseModel
  openRecord: Function
  removeRecord: Function
  sortable: boolean
  groupName: string
}

export default class UiFormFieldRelationRecordComponent extends Component<Args> {
  // Services
  @service accordion!: Accordion;
  @service breadcrumb!: Breadcrumb;
  @service router!: Router;


  // Hooks
  constructor(owner: UiFormFieldRelationRecordComponent, args: Args ) {
    super(owner, args);

    if (args.foreignRecord) {
      let routeName = this.router.currentRoute.name;
      // @ts-ignore
      let model = this.router.currentRoute.attributes;
      let route = this.breadcrumb.getRoute(routeName, model);
      route.getForm(args.record);
    }
  }


  // Defaults
  @tracked isDragging = false;


  // Getter, setter and computed properties
  get accodrionItemId() {
    return `${this.args.groupName}-${this.args.record.id}`;
  }

  get accodrionIsOpen() {
    return this.accordion.isOpenFor(this.accodrionItemId);
  }

  get accordionToggleId() {
    return this.accordion.toggleIdFor(this.accodrionItemId);
  }

  get accordionBodyId() {
    return this.accordion.bodyIdFor(this.accodrionItemId);
  }

  get record() {
    return this.args.foreignRecord ?? this.args.record;
  }


  //Actions
  @action
  dragStarted() {
    this.isDragging = true;
  }

  @action
  dragStopped() {
    this.isDragging = false;
  }
}
