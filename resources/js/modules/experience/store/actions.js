import {
  EXPERIENCE_ADD,
  EXPERIENCE_UPDATE,
  EXPERIENCE_REMOVE,
  EXPERIENCE_LIST,
} from './action-types';

export function add(payload) {
  return {
    type: EXPERIENCE_ADD,
    payload
  }
}

export function update(payload) {
  return {
    type: EXPERIENCE_UPDATE,
    payload
  }
}

export function remove(payload) {
  return {
    type: EXPERIENCE_REMOVE,
    payload
  }
}

export function list(payload) {
  return {
    type: EXPERIENCE_LIST,
    payload
  }
}
