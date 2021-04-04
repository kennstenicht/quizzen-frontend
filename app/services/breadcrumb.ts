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

export class FormItem {
  // Defaults
  model!: Model;
  changeset!: BufferedChangeset;


  // Hooks
  constructor(model: Model) {
    const validation = validations[model.modelName];

    let changeset = Changeset(
      model,
      lookupValidator(validation),
      validation
    )

    this.model = model;
    this.changeset = changeset;
  }


  // Functions
  async save() {
    await this.changeset.save();
  }

  async validate() {
    await this.changeset.validate();
  }

  async destroyModel() {
    await this.model.destroyRecord();
  }
}

export class RouteItem {
  // Defaults
  forms: TrackedArray<FormItem> = new TrackedArray([]);
  model: Model;
  routeModel?: Model;
  routeName: string;
  modelName: string;


  // Hooks
  constructor(routeName: string, model: Model) {
    this.model = model;
    this.modelName = model.modelName;
    this.routeName = routeName;

    if (!model.isNew) {
      this.routeModel = model;
    }
  }


  // Getter and setter
  get changes() {
    return this.forms.reduce((a, b) => {
      return a + b.changeset.changes.length
    }, 0);
  }

  get errors() {
    return this.forms.reduce((a, b) => {
      // @ts-ignore
      return a.concat(b.changeset.errors)
    }, []);
  }

  get hasChanges() {
    return this.changes > 0;
  }

  get hasDirtyChangeset() {
    return this.forms.isAny('changeset.isDirty');
  }

  get isValid() {
    return this.forms.isEvery('changeset.isValid');
  }

  get mainForm() {
    return this.forms[0];
  }

  get name() {
    return this.model.displayLabel;
  }

  get routeParams(): [string, Model?] {
    let routeParams: [string, Model?] = [this.routeName];

    if (this.routeModel) {
      routeParams.push(this.routeModel);
    }

    return routeParams;
  }


  // Functions
  getForm(model: Model) {
    let form = this.forms.findBy('changeset.id', model.id);

    if (form) {
      return form;
    } else {
      return this.registerForm(model);
    }
  }

  registerForm(model: Model) {
    const form = new FormItem(model);

    this.forms.push(form)

    return form;
  }

  async destroyForms() {
    await this.forms.invoke('destroyModel');
    this.forms = [];
  }

  async saveRoute() {
    return await Promise.all(this.forms.invoke('save'));
  }

  async validateRoute() {
    return await Promise.all(this.forms.invoke('validate'));
  }
}

export default class BreadcrumbService extends Service {
  // Services
  @service confirm!: Confirm;
  @service intl!: Intl;
  @service router!: Router;

  // Defaults
  routes: TrackedArray<RouteItem> = new TrackedArray([]);


  // Getter and setter
  get baseRoute() {
    let baseModelName = this.firstRoute?.modelName;

    if (!baseModelName) {
      return
    }

    return {
      routeName: `profile.${pluralize(baseModelName)}`,
      name: this.intl.t(`models.plurals.${baseModelName}`),
      routeParams: [`profile.${pluralize(baseModelName)}`]
    };
  }

  get currentRoute() {
    return this.routes[this.routes.length - 1];
  }

  get firstRoute() {
    return this.routes[0];
  }

  get hasRoutes() {
    return this.routes.length > 0;
  }

  get prevRoute() {
    return this.routes[this.routes.length - 2] ?? this.baseRoute;
  }


  // Functions
  clear(transition: Transition) {
    return this.rollbackRoutes(this.routes, transition);
  }

  findRoute(routeName: string, model?: Model) {
    return this.routes.find((route) => {
      // @ts-ignore
      if (!model || model.isNew) {
        return route.routeName === routeName;
      }

      return route.routeName === routeName && route.routeModel === model;
    });
  }

  getRoute(routeName: string, model: Model) {
    let route = this.findRoute(routeName, model);

    if (route) {
      return route;
    } else {
      return this.registerRoute(routeName, model);
    }
  }

  registerRoute(routeName: string, model: Model) {
    let route = new RouteItem(routeName, model);

    this.routes.push(route);
    route.registerForm(model);

    return route;
  }

  async rollbackRoutes(routes: RouteItem[], transition: Transition) {
    transition.abort();

    for(let i = routes.length - 1; i >= 0; i--) {
      let currentRoute = routes[i];
      let prevRoute = routes[i - 1];

      if (currentRoute.hasDirtyChangeset) {
        let confirmed = await this.confirm.ask('rollback', currentRoute);

        if (!confirmed) {
          return true;
        }
      }

      // Rollback new records to destroy unsaved records
      // @ts-ignore
      let newForms = currentRoute.forms.filterBy('model.isNew');
      await newForms.invoke('destroyModel');

      this.routes.pop();

      if (prevRoute) {
        // @ts-ignore
        this.router.transitionTo(...prevRoute.routeParams);
      }
    }

    return transition.retry();
  }

  rollbackToRoute(route: RouteItem, transition: Transition) {
    let index = this.routes.indexOf(route);
    let routesToRemove = this.routes.slice(index + 1);

    return this.rollbackRoutes(routesToRemove, transition);
  }
}
