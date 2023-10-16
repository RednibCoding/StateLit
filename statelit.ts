import { LitElement } from 'lit';
import { property } from 'lit/decorators.js'

/**
 * Represents a stateful object for use with LitElement components.
 * Each instance has a unique identifier used to generate a unique event name for state updates.
 */
export class LitState<T extends object> {
  /** The current state. */
  state: T;

  /** A unique identifier for this state instance. */
  private uid: string;

  /**
   * Initializes a new instance of the LitState class.
   * @param initialState The initial state.
   */
  constructor(initialState: T) {
    this.state = initialState;
    this.uid = Math.random().toString(36).substring(2, 9);  // Generate a random string
  }

  /**
   * Gets the name of the event that is dispatched when the state is updated.
   */
  get eventName() {
    return `state-${this.uid}-updated`;  // Construct the event name using the unique ID
  }

  /**
   * Updates the state with the specified partial state and dispatches an event to notify listeners.
   * @param newState A partial state object representing the state properties to update.
   */
  update(newState: Partial<T>) {
    Object.assign(this.state, newState);
    document.dispatchEvent(new CustomEvent(this.eventName));
  }
}

/**
 * A base class for LitElement components that are associated with a LitState instance.
 */
export class StatefulLitElement<T extends object> extends LitElement {
  /** The current state. */
  @property({ type: Object })
  state: T;

  /**
   * Initializes a new instance of the StatefulLitElement class.
   * @param state The associated LitState instance.
   */
  constructor(state: LitState<T>) {
    super();
    this.state = state.state;
    document.addEventListener(state.eventName, () => {
      this.state = state.state;
      this.requestUpdate();
    });
  }
}
