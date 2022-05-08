import { v4 as uuidv4 } from 'uuid';

import { messageClass, messageType, messageTypes } from "./types";

export type networkErrorsToUIMapParams = {
  msgClass?: messageClass,
  prefix?: string,
  usePrefixForSingle?: boolean,
  usePrefixForMulti?: boolean
  defaultMessage?: string,
};

const defaultParams = {
  usePrefixForSingle: true,
  usePrefixForMulti: true,
  defaultMessage: 'An Uexpected Error Occured',
}

export function mapNetworkErrorsToUIErrors(type: messageTypes, errors: string[],
  options: networkErrorsToUIMapParams): messageType {
  options = { ...defaultParams, ...options };
  switch (errors.length) {
    case 0:
      return {
        id: uuidv4(),
        class: messageClass.single,
        type: type,
        prefix: '',
        messages: [options.defaultMessage!],
      }
    case 1:
      return {
        id: uuidv4(),
        class: messageClass.single,
        type: type,
        prefix: options.usePrefixForSingle ? (options.prefix || '') : '',
        messages: errors,
      }
    default:
      return {
        id: uuidv4(),
        class: options.msgClass || messageClass.multiline,
        type: type,
        prefix: options.usePrefixForMulti ? (options.prefix || '') : '',
        messages: errors,
      }
  }
}

export function getSuccessMessage(message: string) {
  return {
    class: messageClass.single,
    id: uuidv4(),
    type: messageTypes.success,
    messages: [message],
    prefix: ''
  }
}