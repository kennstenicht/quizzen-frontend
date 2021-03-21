
declare module 'ember-animated/-private/transition-context' {
  export default class TransitionContext {
    get insertedSprites(): any
    get removedSprites(): any
    get keptSprites(): any
  }
}
