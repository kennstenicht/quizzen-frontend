import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Store from '@ember-data/store';
import Model from '@ember-data/model';
import { task } from 'ember-concurrency';
import { taskFor } from 'ember-concurrency-ts';
import FlashMessage from 'ember-cli-flash/services/flash-messages';

interface Args {
  modelName: string
  multiple: boolean
  onAssign: Function
  onClose: Function
  selectedRecords: Model[]
}

export default class UiFormFieldRelationAssignComponent extends Component<Args> {
  // Services
  @service flashMessages!: FlashMessage;
  @service store!: Store;


  // Defaults
  selectedRecords: Model[] = [];
  @tracked selectedPage: number = 1;
  @tracked records: Model[] = [];


  // Getter, setter and computed properties
  get hasPagination() {
    // @ts-ignore
    return this.records.meta?.pagination.pages > 1;
  }


  // Actions
  @action
  selectRecord(record: Model, disabled: boolean) {
    if (disabled) {
      return
    }

    if (this.selectedRecords.includes(record)) {
      this.selectedRecords.removeObject(record);
    } else {
      this.selectedRecords.pushObject(record);
    }
  }

  @action
  selectPage(page: number) {
    this.selectedPage = page;

    taskFor(this.queryRecords).perform();
  }


  // Tasks
  @task *queryRecords() {
    try {
      let records = yield this.store.query(this.args.modelName, {
        page: {
          number: this.selectedPage
        }
      });

      this.records = records;

      return records;
    } catch (error) {
      this.flashMessages.warning(error);
    }
  }
}
