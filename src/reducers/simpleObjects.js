/**
 * Created by Jordan3D on 5/4/2018.
 */
import {
  ADD_ONE, ASSIGN_OBJECTS,
  SELECT_ONE, SELECT_MULTIPLE,
  CLEAR_ONE, CLEAR_ALL, CLEAR_MULTIPLE
} from '../actions'


const clearMultiple = function (state, action) {
  const result = Object.assign({}, state);
  action.objects.map((o) => {
    const obj = {...result[o.id]};
    obj.selected = false;
    result[o.id] = obj;
  });
  return result;
}

const clearObjects = function (state) {
  const result = {...state};
  for (let i in result){
    if(result[i].id){
      result[i] = {...result[i]};
      result[i].selected = false;
    }
  }
  return result;
};

let simpleObjectsCount = "0";

export const simpleObjects = (state = {free: []}, action) => {
  switch (action.type) {
    case ADD_ONE : {
      const id = ++simpleObjectsCount;
      const o = {
        id,
        selected: false
      };

      return {
        ...state,
        [id]: o,
        free: [...state.free, o]
      };
    }
    case ASSIGN_OBJECTS : {
      const {free} = state;

      return {
        ...state,
        free: free.filter((o) => {
          if (action.objects.find((d) => d.id === o.id)) {
            return false;
          }
          return true;
        })
      };
    }
    case SELECT_ONE : {
      const obj = {...state[action.object.id]};
      obj.selected = true;
      return {
        ...state,
        [action.object.id]: obj
      };
    }
    case SELECT_MULTIPLE : {
      const result = Object.assign({}, state);
      action.objects.map((o) => {
        const obj = {...result[o.id]};
        obj.selected = true;
        result[o.id] = obj;
      });
      return result;
    }
    case CLEAR_ONE : {
      const obj = {...state[action.object.id]};
      obj.selected = false;
      return {
        ...state,
        [action.object.id]: obj
      };
    }
    case CLEAR_MULTIPLE : {
      return clearMultiple(state, action);
    }
    case CLEAR_ALL : {
      return clearObjects(state);
    }
    default:
      return state;
  }
};
