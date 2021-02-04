import Service from '@ember/service';
import Model from '@ember-data/model';
import { inject as service } from '@ember/service';
import Router from '@ember/routing/router-service';
import Transition from '@ember/routing/-private/transition';
import { pluralize } from 'ember-inflector';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import { BufferedChangeset } from 'ember-changeset/types';
import { TrackedArray } from 'tracked-built-ins';
import Confirm from 'quizzen/services/confirm';
import AnswerValidations from 'quizzen/validations/answer';
import CategoryValidations from 'quizzen/validations/category';
import GameValidations from 'quizzen/validations/game';
import QuestionValidations from 'quizzen/validations/question';
import QuizValidations from 'quizzen/validations/quiz';

let validations = {
  answer: AnswerValidations,
  category: CategoryValidations,
  game: GameValidations,
  question: QuestionValidations,
  quiz: QuizValidations
}

export class BreadcrumbItem {
  // Defaults
  changesets: TrackedArray<BufferedChangeset> = new TrackedArray([]);
  model?: Model;
  routeName: string;
  modelName: string;

  // Hooks
  constructor(routeName: string, model?: Model) {
    this.routeName = routeName;
    this.model = model?.isNew ? undefined : model;
    // @ts-ignore
    this.modelName = model?.constructor.modelName;
  }


  // Getter and setter
  get changes() {
    return this.changesets.reduce((a, b) => {
      let changes = b.changes.map((change) => {
        change.original = b.data[change.key];
        return change;
      })

      return a.concat(changes)
    }, []);
  }

  get hasDirtyChangeset() {
    return this.changesets.isAny('isDirty');
  }

  get name() {
    if (!this.model) {
      return 'New';
    }
    // @ts-ignore
    return this.model.displayLabel;
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
    // @ts-ignore
    const validation = validations[model.constructor.modelName];

    let changeset = Changeset(
      model,
      lookupValidator(validation),
      validation
    )

    this.changesets.push(changeset);

    return changeset;
  }
}

export default class BreadcrumbService extends Service {
  // Services
  @service router!: Router;
  @service confirm!: Confirm;


  // Defaults
  items: TrackedArray<BreadcrumbItem> = new TrackedArray([])
  isTransitionRetry: boolean = false;


  // Getter and setter
  get firstItem() {
    return this.items.get(0);
  }

  get currentItem() {
    return this.items.get('lastObject');
  }

  get prevItem() {
    return this.items.get(this.items.length - 2);
  }


  // Functions
  clear(transition: Transition) {
    this.rollback(this.items, transition);
  }

  findItem(routeName: string, model: Model) {
    return this.items.find((item) => {
      if (!model || model.isNew) {
        return item.routeName === routeName;
      }

      return item.routeName === routeName && item.model === model;
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

  registerItem(routeName: string, model?: Model) {
    let item = new BreadcrumbItem(routeName, model);

    this.items.push(item);

    return item;
  }

  // Rollback new records to destroy unsaved records
  async rollback(items: BreadcrumbItem[], transition: Transition) {
    if (this.isTransitionRetry) {
      this.isTransitionRetry = false;
      return transition;
    }

    transition.abort();

    for (let item of items.reverse()) {
      if (item.hasDirtyChangeset) {
        let confirmed = await this.confirm.ask('rollback', item);

        if (!confirmed) {
          return true;
        }
      }

      this.items.pop();
    }

    this.isTransitionRetry = true;
    return transition.retry();

  }

  rollbackTo(item: BreadcrumbItem, transition: Transition) {
    let index = this.items.indexOf(item);
    let itemsToRemove = this.items.slice(index + 1);

    this.rollback(itemsToRemove, transition);
  }

  // TODO: Refactor
  transitionTo(item: BreadcrumbItem, modelName: string, model?: Model) {
    if (item) {
      if (item.model) {
        this.router.transitionTo(
          item.routeName,
          item.model
        )
      } else {
        this.router.transitionTo(
          item.routeName
        )
      }
    } else {
      this._transitionToByModel(
        modelName,
        model
      );
    }
  }

  _transitionToByModel(modelName: string, model?: Model) {
    let indexRoute = pluralize(modelName);
    let path = ['profile', indexRoute];

    if (model) {
      return this.router.transitionTo(path.join('.'), model);
    }

    return this.router.transitionTo(path.join('.'));
  }
}
