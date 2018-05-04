import {combineReducers} from 'redux';
import { schedule } from './schedule';
import { selectedSet } from './selectedSet';
import { selectedSetObject } from './selectedSetObject';
import { simpleObjects } from './simpleObjects';

export const intervalCount = function (index, length) {
  const spec = 1440 / length;
  return [spec * index, (spec * (index + 1)) - 1]
}

export const inInterval = function (store, interval) {
  let result = [...store];
  for (let i in result) {
    if (interval[0] >= result[i].bt && interval[1] <= result[i].et) {
      return {result, interval: result.splice(i, 1)}
    }
  }
  return null;
}

const rootReducer = combineReducers({
  selectedSet,
  selectedSetObject,
  simpleObjects,
  schedule
});

export default rootReducer;
