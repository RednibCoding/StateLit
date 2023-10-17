"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatefulLitElement = exports.LitState = void 0;
const lit_1 = require("lit");
const decorators_js_1 = require("lit/decorators.js");
/**
 * Represents a stateful object for use with LitElement components.
 * Each instance has a unique identifier used to generate a unique event name for state updates.
 */
class LitState {
    /**
     * Initializes a new instance of the LitState class.
     * @param initialState The initial state.
     */
    constructor(initialState) {
        this.state = initialState;
        this.uid = Math.random().toString(36).substring(2, 9); // Generate a random string
    }
    /**
     * Gets the name of the event that is dispatched when the state is updated.
     */
    get eventName() {
        return `state-${this.uid}-updated`; // Construct the event name using the unique ID
    }
    /**
     * Updates the state with the specified partial state and dispatches an event to notify listeners.
     * @param newState A partial state object representing the state properties to update.
     */
    update(newState) {
        Object.assign(this.state, newState);
        document.dispatchEvent(new CustomEvent(this.eventName));
    }
}
exports.LitState = LitState;
/**
 * A base class for LitElement components that are associated with a LitState instance.
 */
class StatefulLitElement extends lit_1.LitElement {
    /**
     * Initializes a new instance of the StatefulLitElement class.
     * @param state The associated LitState instance.
     */
    constructor(state) {
        super();
        this.state = state.state;
        document.addEventListener(state.eventName, () => {
            this.state = state.state;
            this.requestUpdate();
        });
    }
}
__decorate([
    (0, decorators_js_1.property)({ type: Object })
], StatefulLitElement.prototype, "state", void 0);
exports.StatefulLitElement = StatefulLitElement;
