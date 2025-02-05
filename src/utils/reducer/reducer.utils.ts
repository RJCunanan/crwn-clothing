import { AnyAction } from 'redux';

export type ActionWithPayload<T, P> = {
    type: T;    // will be one of our enum values we will pass in
    payload: P;
};

export type Action<T> = {
    type: T;    // will be one of our enum values we will pass in
};

// Overloaded function for action with a payload
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

// Overloaded function for action without a payload
export function createAction<T extends string>(type: T, payload: void): Action<T>;

// Actual implementation
export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload };
}