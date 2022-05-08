import { createReducer, updateObject } from "../../utilities/stateHandlerUtilities";
import { messageActionType, messageStateType, messageType } from "../../utilities/types";

const messageInitialState: messageStateType = {
  messages: []
}

function addMessageToState(state: messageStateType, action: messageActionType) {
  if (!action.payload) return state;
  state = updateObject(state, { messages: [...state.messages, action.payload] } as messageStateType);
  return state;
}

function markMessageForRemoval(state: messageStateType, action: messageActionType) {
  if (action.type !== 'messages/prepremove') return state;
  if (!action.payload || !action.payload.id) return state;

  let newMessages = state.messages.map(msg => {
    if (msg.id === action.payload?.id) return { ...msg, removed: true } as messageType;
    return msg;
  });

  state = updateObject(state, { messages: newMessages } as messageStateType);
  return state;
}

function removeMessageFromState(state: messageStateType, action: messageActionType) {
  if (action.type !== 'messages/remove') return state;
  if (state.messages.length === 0) return state;
  if (!action.payload || !action.payload.id) return state;

  let newMessages = state.messages.filter(e => e.id !== action.payload?.id)
  state = updateObject(state, { messages: newMessages } as messageStateType);
  return state;
}

const messageReducer = createReducer(messageInitialState, {
  'messages/add': addMessageToState,
  'messages/prepremove': markMessageForRemoval,
  'messages/remove': removeMessageFromState,
})

export default messageReducer;

export function addMessage(payload: messageType): messageActionType {
  let action: messageActionType = {
    type: 'messages/add',
    payload
  }
  return action;
}

export function removeMessage(id: string): messageActionType {
  let action: messageActionType = {
    type: 'messages/remove',
    payload: { id }
  }
  return action;
}

export function markMessageRemoval(id: string): messageActionType {
  let action: messageActionType = {
    type: 'messages/prepremove',
    payload: { id }
  }
  return action;
}