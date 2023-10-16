# StateLit

StateLit is a lightweight state management library designed for LitElement-based applications. It facilitates a structured approach to defining, updating, and sharing state across components. By decoupling state and logic from your components, StateLit aids in organizing your code in a clean, scalable, and maintainable manner, right out of the box.

## Features

- **State Sharing Across Components:** State can be shared across multiple components effortlessly. When one component updates the state, all other components using that state will re-render to reflect the changes.

## Getting Started

Start by defining a state class for each distinct part of your application's state. Each state class should extend `LitState` and initialize its state in the constructor.

```typescript
// counterState.ts
import { LitState } from "statelit";

interface ICounterState {
  counter: number;
}

export class CounterState extends LitState<ICounterState> {
  constructor() {
    super({ counter: 0 });
  }
}

export const counterState = new CounterState();
```

## Creating Components

Components that need to interact with a state should extend `StatefulLitElement` and pass the state instance to the super constructor.

```typescript
// counter-component.ts
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { counterState } from "./counterState";
import { StatefulLitElement } from "statelit";

@customElement("counter-component")
class CounterComponent extends StatefulLitElement<typeof counterState.state> {
  constructor() {
    super(counterState);
  }

  render() {
    return html`
      <div>
        <button
          @click=${() =>
            counterState.update({ counter: this.state.counter - 1 })}
        >
          -
        </button>
        ${this.state.counter}
        <button
          @click=${() =>
            counterState.update({ counter: this.state.counter + 1 })}
        >
          +
        </button>
      </div>
    `;
  }
}
```

## Example of State Sharing Across Components

```typescript
// counter-display.ts
import { html } from "lit";
import { customElement } from "lit/decorators.js";
import { counterState } from "./counterState";
import { StatefulLitElement } from "statelit";

@customElement("counter-display")
class CounterDisplay extends StatefulLitElement<typeof counterState.state> {
  constructor() {
    super(counterState);
  }

  render() {
    return html`<div>Counter: ${this.state.counter}</div>`;
  }
}
```

## Creating Controllers

For complex logic or actions that affect the state, it's a good practice to create a controller. Controllers encapsulate the logic for manipulating the state, making it easier to manage and test.

```typescript
// counter-controller.ts
import { counterState } from "./counterState";

class CounterController {
  increment() {
    const currentCount = counterState.state.counter;
    counterState.update({ counter: currentCount + 1 });
  }

  decrement() {
    const currentCount = counterState.state.counter;
    counterState.update({ counter: currentCount - 1 });
  }
}

export const counterController = new CounterController();
```

Then, update your components to use the controller for state mutations.

```typescript
// counter-component.ts
// ... other imports ...
import { counterController } from "./counter-controller";

@customElement("counter-component")
class CounterComponent extends StatefulLitElement<typeof counterState.state> {
  // ... rest of the code ...

  render() {
    return html`
      <div>
        <button @click=${counterController.decrement}>-</button>
        ${this.state.counter}
        <button @click=${counterController.increment}>+</button>
      </div>
    `;
  }
}
```

With StateLit, you can structure your LitElement applications in a clean, organized, and scalable way, making it easier to manage state and logic as your project grows.
