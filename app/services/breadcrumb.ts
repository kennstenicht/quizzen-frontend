import Service from '@ember/service';
import Model from 'quizzen/models/base';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import Transition from '@ember/routing/-private/transition';
import { pluralize } from 'ember-inflector';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { BufferedChangeset } from 'ember-changeset/types';
// @ts-ignore
import { TrackedArray } from 'tracked-built-ins';
import Intl from 'ember-intl/services/intl';
import Confirm from 'quizzen/services/confirm';
import AnswerValidations from 'quizzen/validations/answer';
import CategoryValidations from 'quizzen/validations/category';
import GameValidations from 'quizzen/validations/game';
import QuestionValidations from 'quizzen/validations/question';
import QuizValidations from 'quizzen/validations/quiz';

let validations: { [key: string]: Object } = {
  'answer': AnswerValidations,
  'category': CategoryValidations,
  'game': GameValidations,
  'question': QuestionValidations,
  'quiz': QuizValidations
}

export class BreadcrumbItem {
  // Defaults
  changesets: TrackedArray<BufferedChangeset> = new TrackedArray([]);
  models: TrackedArray<Model> = new TrackedArray([]);
  intl: Intl;
  routeModel?: Model;
  routeName: string;
  modelName: string;


  // Hooks
  constructor(intl: Intl, routeName: string, model: Model) {
    this.intl = intl;
    this.modelName = model.modelName;
    this.routeName = routeName;

    if (!model.isNew) {
      this.routeModel = model;
    }
  }


  // Getter and setter
  get changes() {
    return this.changesets.reduce((a, b) => {
      return a + b.changes.length
    }, 0);
  }

  get errors() {
    return this.changesets.reduce((a, b) => {
      // @ts-ignore
      return a.concat(b.errors)
    }, []);
  }

  get hasChanges() {
    return this.changes > 0;
  }

  get hasDirtyChangeset() {
    return this.changesets.isAny('isDirty');
  }

  get isValid() {
    return this.changesets.isEvery('isValid');
  }

  get name() {
    if (!this.routeModel) {
      return this.intl.t(`models.new.${this.modelName}`);
    }

    return this.routeModel.displayLabel;
  }

  get routeParams(): [string, Model?] {
    let routeParams: [string, Model?] = [this.routeName];

    if (this.routeModel) {
      routeParams.push(this.routeModel);
    }

    return routeParams;
  }


  // Functions
  getChangeset(model: Model) {
    let changeset = this.changesets.findBy('id', model.id);

    if (changeset) {
      return changeset;
    } else {
      return this.registerChangeset(model);
    }
  }

  registerChangeset(model: Model) {
    const validation = validations[model.modelName];

    let changeset = Changeset(
      model,
      lookupValidator(validation),
      validation
    )

    this.changesets.push(changeset);
    this.models.push(model);

    return changeset;
  }
}

export default class BreadcrumbService extends Service {
  // Services
  @service confirm!: Confirm;
  @service intl!: Intl;
  @service router!: Router;

  // Defaults
  items: TrackedArray<BreadcrumbItem> = new TrackedArray([]);


  // Getter and setter
  get baseItem() {
    let baseModelName = this.firstItem?.modelName;

    if (!baseModelName) {
      return
    }

    return {
      routeName: `profile.${pluralize(baseModelName)}`,
      name: this.intl.t(`models.plurals.${baseModelName}`),
      routeParams: [`profile.${pluralize(baseModelName)}`]
    };
  }

  get currentItem() {
    return this.items[this.items.length - 1];
  }

  get firstItem() {
    return this.items[0];
  }

  get hasItems() {
    return this.items.length > 0;
  }

  get prevItem() {
    return this.items[this.items.length - 2] ?? this.baseItem;
  }


  // Functions
  clear(transition: Transition) {
    return this.rollbackItems(this.items, transition);
  }

  findItem(routeName: string, model: Model) {
    return this.items.find((item) => {
      // @ts-ignore
      if (!model || model.isNew) {
        return item.routeName === routeName;
      }

      return item.routeName === routeName && item.routeModel === model;
    });
  }

  getItem(routeName: string, model: Model) {
    let item = this.findItem(routeName, model);

    if (item) {
      return item;
    } else {
      return this.registerItem(routeName, model);
    }
  }

  registerItem(routeName: string, model: Model) {
    let item = new BreadcrumbItem(this.intl, routeName, model);

    this.items.push(item);

    return item;
  }

  // Rollback new records to destroy unsaved records
  async rollbackItems(items: BreadcrumbItem[], transition: Transition) {
    transition.abort();

    for(let i = items.length - 1; i >= 0; i--) {
      let currentItem = items[i];
      let prevItem = items[i - 1];

      if (currentItem.hasDirtyChangeset) {
        let confirmed = await this.confirm.ask('rollback', currentItem);

        if (!confirmed) {
          return true;
        }
      }

      // @ts-ignore
      let newModels = currentItem.models.filterBy('isNew');

      await newModels.invoke('destroyRecord');
      this.items.pop();

      if (prevItem) {
        // @ts-ignore
        this.router.transitionTo(...prevItem.routeParams);
      }
    }

    return transition.retry();
  }

  rollbackTo(item: BreadcrumbItem, transition: Transition) {
    let index = this.items.indexOf(item);
    let itemsToRemove = this.items.slice(index + 1);

    return this.rollbackItems(itemsToRemove, transition);
  }
}
