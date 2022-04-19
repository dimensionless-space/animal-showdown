import { UnionToIntersection } from "type-fest";
import _ from "lodash";
import { createContext, useContext } from "react";
import { AnyAction, createStore, PreloadedState } from "redux";
import produce from "immer";
import { EnhancedStore } from "@reduxjs/toolkit";

export type CommandMap = {
  [commandName: string]: (state: any, events: any, ...args: any[]) => void;
};

export type EventMap = {
  [eventName: string]:
    | ((state: any, ...payload: any) => void)
    | ((state: any, ...payload: any) => void)[];
};

export type EventMapFor<TCommands> = TCommands[keyof TCommands] extends (
  // could maybe infer state here
  state: any,
  events: infer Events,
  ...args: any[]
) => void
  ? {
      // could probably infer args here
      [Event in keyof Events]: Events[Event] extends (
        ...args: infer Args
      ) => void
        ?
            | ((state: any, ...args: Args) => void)
            | ((state: any, ...args: Args) => void)[]
        : never;
    }
  : never;

export type StateFor<
  TCommands extends CommandMap,
  TEvents extends EventMap
> = UnionToIntersection<
  {
    [Command in keyof TCommands]: TCommands[Command] extends (
      state: infer State,
      ...payload: any[]
    ) => void
      ? State
      : never;
  }[keyof TCommands]
> &
  UnionToIntersection<
    {
      [Event in keyof TEvents]: TEvents[Event] extends ((
        state: infer State,
        ...payload: any[]
      ) => void)[]
        ? State
        : TEvents[Event] extends (state: infer State, ...payload: any) => void
        ? State
        : never;
    }[keyof TEvents]
  >;

export type Interactor<
  TCommands extends CommandMap,
  TEvents extends EventMapFor<TCommands>
> = {
  [Command in keyof TCommands]: TCommands[Command] extends (
    state: any,
    events: any,
    ...args: infer Args
  ) => void
    ? (...args: Args) => void
    : never;
} & StateFor<TCommands, TEvents> & {
    reduxStore: EnhancedStore<StateFor<TCommands, TEvents>, AnyAction>;
  };

export function createInteractor<
  TCommands extends CommandMap,
  TEvents extends EventMapFor<TCommands>
>({
  commands: commandMap,
  events: eventMap,
  state: initialState,
}: {
  commands: TCommands;
  events: TEvents;
  state: StateFor<TCommands, TEvents>;
}): Interactor<TCommands, TEvents> {
  function reducer(latestState: any, { type, payload }: any) {
    try {
      let handlers = (eventMap as any)[type];
      if (handlers == null) return latestState;
      handlers = _.castArray(handlers);
      const nextState = produce(latestState, (draft: any) => {
        for (const handler of handlers) {
          try {
            (handler as any)(draft, ...payload);
          } catch {
            //
          }
        }
      });
      return nextState;
    } catch {
      return latestState;
    }
  }

  const reduxStore = createStore(reducer, initialState as PreloadedState<any>);

  let updateStore: any = null;

  const events = _.mapValues(eventMap, (_eventHandler, eventType) => {
    return function (...payload: any) {
      reduxStore.dispatch({ type: eventType, payload });
      updateStore();
    };
  });

  const store = _.mapValues(commandMap, (command: any) => {
    return function (...args: any[]) {
      return command(reduxStore.getState(), events, ...args);
    };
  });

  (store as any).reduxStore = reduxStore;

  updateStore = function () {
    (store as any).__proto__ = reduxStore.getState();
  };

  updateStore();

  return store as any;
}

export const Interax = createContext<any>(null);

export function useInteractor<
  TInteractor extends Interactor<CommandMap, EventMap>
>(): TInteractor {
  return useContext(Interax);
}
