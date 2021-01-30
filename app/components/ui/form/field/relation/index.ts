import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import Store from '@ember-data/store';
import { BufferedChangeset } from 'ember-changeset/types';
import Model from '@ember-data/model';
import { pluralize } from 'ember-inflector';
import Breadcrumb from 'quizzen/services/breadcrumb';

interface Args {
  records: any[],
  property: string,
  changeset: BufferedChangeset
}

export default class UiFormFieldRelationComponent extends Component<Args> {
  // Services
  @service breadcrumb!: Breadcrumb;
  @service router!: Router;
  @service store!: Store;


  // Defaults
  @tracked isRecordListOpen: boolean = false;


  // Getter and setter
  get groupName() {
    return guidFor(this);
  }

  get isHasManyRelation() {
    return this.relationKind === 'hasMany';
  }

  get isRecordAssignable() {
    return this.isHasManyRelation || !this.records;
  }

  get records() {
    const propertyValue = this.args.changeset.get(this.args.property);

    if (!propertyValue) {
      return null
    }

    return this.isHasManyRelation ? propertyValue : [propertyValue];
  }

  get relationship() {
    let property = this.args.property;
    let model = this.args.changeset.data;
    // @ts-ignore
    let relationships = model.constructor.relationshipsByName;

    return relationships.get(property);
  }

  get relationType() {
    return this.relationship.type;
  }

  get relationKind() {
    return this.relationship.kind;
  }


  // Actions
  @action
  assignRecords(records: Model[]) {
    let changeset = this.args.changeset;
    let property = this.args.property;

    if (this.isHasManyRelation) {
      changeset.get(property).pushObjects(records);
    } else {
      changeset.set(property, records[0]);
    }

    this.closeRecordList();
  }

  @action
  closeRecordList() {
    this.isRecordListOpen = false
  }

  @action
  openRecordList() {
    this.isRecordListOpen = true
  }

  @action
  openRecord(record: Model) {
    let relationType = this.relationType;
    let editRoute = `profile.${pluralize(relationType)}.${relationType}`;

    this.breadcrumb.registerItem(editRoute, record);
    this.router.transitionTo(editRoute, record);
  }

  @action
  openNewRecord() {
    let relationType = this.relationType;
    let newRoute = `profile.${pluralize(relationType)}.new`;

    this.breadcrumb.registerItem(newRoute);
    this.router.transitionTo(newRoute);
  }

  @action
  removeRecord(record: Model) {
    let changeset = this.args.changeset;
    let property = this.args.property;

    if (this.isHasManyRelation) {
      changeset.get(property).removeObject(record);
    } else {
      changeset.set(property, null);
    }
  }

  @action
  reorderRecords(orderedRecords: Model[]) {
    let changeset = this.args.changeset;
    let property = this.args.property;

    changeset.set(property, orderedRecords);
  }
}