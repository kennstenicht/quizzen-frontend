import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Breadcrumb from 'quizzen/services/breadcrumb';
// @ts-ignore
import move from 'ember-animated/motions/move';
// @ts-ignore
import TransitionContext from 'ember-animated/-private/transition-context';

export default class ApplicationBreadcrumb extends Component {
  // Services
  @service breadcrumb!: Breadcrumb;


  // Defaults
  @tracked hoverIndex?: number;


  // Actions
  @action
  setHoverIndex(index: number) {
    this.hoverIndex = index;
  }

  @action
  removeHoverIndex() {
    this.hoverIndex = undefined;
  }


  // Transitions
  *breadcrumbTransitiom(
    {
      removedSprites,
      insertedSprites,
    }: TransitionContext
  ) {
    for (let sprite of removedSprites) {
      sprite.endAtPixel({ x: window.innerWidth + sprite.initialBounds.left });
      sprite.applyStyles({ 'z-index': '1' });

      move(sprite);
    }

    for (let sprite of insertedSprites) {
      sprite.startAtPixel({ x: window.innerWidth });
      sprite.applyStyles({ 'z-index': '1' });

      move(sprite);
    }
  }
}
