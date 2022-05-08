import { actionType } from "./types";

export function updateObject(oldObject: any, newValues: any) {
  return { ...oldObject, ...newValues };
}

export function updateItemInArrayById(array: any[], itemId: string, updateCb: any): any[] {
  const updatedItems = array.map(item => {
    return item.id === itemId
      ? updateCb()
      : item;
  });
  return updatedItems;
}

export function updateItemInArrayByPredicate(array: any[], predicate: any, updateCb: any): any[] {
  const updatedItems = array.map(item => {
    return predicate(item)
      ? updateCb()
      : item;
  });
  return updatedItems;
}

export function createReducer(initialState: any, handlers: any) {
  return function reducer(state = initialState, action: actionType) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state;
    }
  }
}