import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { pluralize } from 'ember-inflector';
import Breadcrumb from 'quizzen/services/breadcrumb';
// @ts-ignore
import { fadeOut, fadeIn } from 'ember-animated/motions/opacity';
// @ts-ignore
import TransitionContext from 'ember-animated/-private/transition-context';

export default class ApplicationBreadcrumb extends Component {
  // Services
  @service breadcrumb!: Breadcrumb;


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
  setHoverIndex(index: number) {
    this.hoverIndex = index;
  }

  @action
  removeHoverIndex() {
    this.hoverIndex = undefined;
  }


  // Functions
  transition = function*(
    {
      insertedSprites,
      removedSprites
    }: TransitionContext
  ) {
    for (let sprite of insertedSprites) {
      fadeIn(sprite);
    }

    for (let sprite of removedSprites) {
      fadeOut(sprite);
    }
  }
}
