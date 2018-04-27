import {combineReducers} from 'redux';
import {
  EDIT_SCH ,SET_SCH_ITEM, RECEIVE_DATA,
  ADD_ONE, ASSIGN_OBJECTS, CREATE_OBJ, EDIT_OBJ,
  SELECT_SET, SELECT_ONE, SELECT_MULTIPLE,
  CLEAR_ONE, CLEAR_ALL, CLEAR_MULTIPLE
} from '../actions'

export const intervalCount = function (index, length) {
  const spec = 1440/length;
  return [spec*index,(spec*(index+1))-1]
}

const initialSet = 'week';
const setObjectConstruct = function (name) {
  switch (name) {
    case 'week': {
      return {
        name: "week",
        data: [
          {
            name: "Monday",
            view: {
              name: "mo",
              flags: [{
                name: 'all day',
                on: 'SELECT_MULTIPLE',
                off: 'CLEAR_MULTIPLE'
              }],
              timetable: [],
            },
            state: {
              selected: {
                part: false,
                all: false
              }
            }
          },
          {
            name: "Tuesday",
            view: {
              name: "tu",
              flags: [{
                name: 'all day',
                on: 'SELECT_MULTIPLE',
                off: 'CLEAR_MULTIPLE'
              }],
              timetable: [],
            },
            state: {
              selected: {
                part: false,
                all: false
              }
            }
          },
          {
            name: "Wednesday",
            view: {
              name: "we",
              flags: [{
                name: 'all day',
                on: 'SELECT_MULTIPLE',
                off: 'CLEAR_MULTIPLE'
              }],
              timetable: [],
            },
            state: {
              selected: {
                part: false,
                all: false
              }
            }
          },
          {
            name: "Thursday",
            view: {
              name: "th",
              flags: [{
                name: 'all day',
                on: 'SELECT_MULTIPLE',
                off: 'CLEAR_MULTIPLE'
              }],
              timetable: [],
            },
            state: {
              selected: {
                part: false,
                all: false
              }
            }
          },
          {
            name: "Friday",
            view: {
              name: "fr",
              flags: [{
                name: 'all day',
                on: 'SELECT_MULTIPLE',
                off: 'CLEAR_MULTIPLE'
              }],
              timetable: [],
            },
            state: {
              selected: {
                part: false,
                all: false
              }
            }
          },
          {
            name: "Saturday",
            view: {
              name: "sa",
              flags: [{
                name: 'all day',
                on: 'SELECT_MULTIPLE',
                off: 'CLEAR_MULTIPLE'
              }],
              timetable: [],
            },
            state: {
              selected: {
                part: false,
                all: false
              }
            }
          },
          {
            name: "Sunday",
            view: {
              name: "su",
              flags: [{
                name: 'all day',
                on: 'SELECT_MULTIPLE',
                off: 'CLEAR_MULTIPLE'
              }],
              timetable: [],
            },
            state: {
              selected: {
                part: false,
                all: false
              }
            }
          }
        ]
      }
    }
  }
};

const fullTimetable = function (timetable, action) {
  return action.data.map((d) => {
    return {id: d.id};
  });
};

const editView= function (view, action) {
  const result = {...view};
  result.timetable = fullTimetable(result.timetable, action);
  return result;
}

const editStateSelected= function (selected, action) {
  return {...action.data};
}

const editState= function (state, action) {
  const result = {...state};
  result.selected = editStateSelected(state.selected, action);
  return result;
}

const editDay = function (day, action) {
  const result = {...day};
  if(action.config.operation.indexOf('view') !== -1){
    result.view = editView(result.view, action);
  }else if(action.config.operation.indexOf('state') !== -1){
    result.state = editState(result.state, action);
  }
  return result;
}

const editWeek = function (week, action) {
  const result = {...week};
  const day = editDay(result.data.find( (d) => d.name === action.config.name), action);


  result.data = result.data.map((o) => {
    if(day.name === o.name){
      return day;
    }
    return o;
  });

  return result;

};

const selectedSet = (state = initialSet, action) => {
  switch (action.type) {
    case SELECT_SET :
      return setObjectConstruct(action.set);
    default:
      return state
  }
};

const selectedSetObject = (state = {}, action) => {
  switch (action.type) {
    case CREATE_OBJ : {
      return setObjectConstruct(action.objectType);
    }
    case EDIT_OBJ: {
      const obj = {...state};
      switch (action.selected) {
        case 'day' :
        case 'week' : {
          return editWeek(obj, action);
        }
      }
      return obj
    }
    default:
      return state
  }
};

let simpleObjectsCount = "0";
const simpleObjects = (state = {free: []}, action) => {
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
        free: free.filter( (o) => {
          if(action.objects.find((d) => d.id === o.id )){
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
      const result = Object.assign({}, state);
      action.objects.map((o) => {
        const obj = {...result[o.id]};
        obj.selected = false;
        result[o.id] = obj;
      });
      return result;
    }
    case CLEAR_ALL : {
      const result = Object.assign({}, state);
      for (const o of result) {
        o.selected = false;
      }
      return result;
    }
    default:
      return state
  }
};

const editScheduleDay = (day, action) => {
  const result = [];

  let intervals = action.intervals.slice().sort(function (a,b) {
    if(a[0] < b[0]) {
      return -1;
    }else {
      return 1;
    }
  });

  while(intervals.length !== 0){
    let obj = intervalProcedure(intervals);
    if(obj){
      result.push(result);
    }
  }

  function intervalProcedure(intervals) {
    let index = intervals.length-1;
    let result = null;

    while(intervals.length > 0){
      if(intervals[index][1] === intervals[index-1][0]){
        result.bt = intervals[index][0];
        result.bt = intervals[index-1][1];

        intervals[index-1][0] = intervals[index][0];
        intervals.pop();
        index--;
      }else {
        result.bt = intervals[index][0];
        result.bt = intervals[index][1];
        index--;
        intervals.pop();
        break;
      }
    }
    return result;
  }

  // Упорядочить интервалы
  // Сравнить у левого последнее число+1 с правым первым числом если равны то объединить
  //

  return result;
}

const initialSchedule = {
  mo: [],
  tu: [],
  we: [],
  th: [],
  fr: [],
  sa: [],
  su: [],
  intervals: {},
  config: {
    start: 0,
    max: 1440,
    int: 60
  },
  fetched: false
};

const setScheduleItem = function (state, action) {
  const result = {...state};
  const o = {...action.object};
  result[o.id] = o;
  return result;
}

const manageDayItem = function (state, obj, set) {

}

const createItem = function (f, s, interval) {
  if(!f && !s){
    return {
      et: interval[0],
      bt: interval[1]
    }
  } else if(f && !s){
    return {
      et: f[0].et,
      bt: interval[1]
    }
  } else if(f && s) {
    return {
      et: f[0].et,
      bt: s[0].bt
    }
  } else if(!f && s){
    return {
      et: interval[0],
      bt: s[0].bt
    }
  }
}

const selectFrom = function (result, interval, set) {
  let index ;
  for (let i in result){
    if(set === 'first') {
      if (interval[0] - 1 === result[i].bt) {
        index = i;
        break
      }
    }else if(set === 'second') {
      if (interval[1] + 1 === result[i].et) {
        index = i;
        break
      }
    }
  }
  if(index === undefined){
    return null;
  }
  return result.splice(index, 1);
}

export const inInterval = function (result, interval) {
  for (let i in result) {
    if (interval[0] >= result[i].bt && interval[1] <= result[i].et) {
      return true;
    }
  }
  return false;
}

const manageDay = function (state, obj, set) {
  const result = state.slice();
  const interval = obj.interval;

  if (set === 'select') {

  if (!inInterval(result, interval)) {

    result.push(createItem(
      selectFrom(result, interval, 'first'),
      selectFrom(result, interval, 'second'),
      interval)
    );
  }
}

  return result;
};

const manageSchedule = function (state, obj, set) {
  const result= {...state};
  const oInIntervals = result.intervals[obj.id];
  const day = manageDay(result[oInIntervals.name], oInIntervals, set);
  return {...result,[oInIntervals.name]:day}
};

const manageScheduleMultiple = function (state, action, set) {
  let result = {...state};
  for(let i=0; i< action.objects.length; i++) {
    result = manageSchedule(result, action.objects[i], set);
  }
  return result;
};

const fetchSchedule = function (state, action) {
  const result = Object.assign({},state,action.object);
  result.fetched = true;
  return result;
}

const schedule = (state = initialSchedule, action) => {
  switch (action.type) {
    case CLEAR_MULTIPLE : {
      let cState = {...state};
      for(let i=0; i< action.objects.length; i++) {
        state = manageSchedule(cState, action.objects[i], 'clear')
      }
      return cState;
    }
    case CLEAR_ONE : {
      return manageSchedule(state,  action.object, 'clear');
    }
    case SELECT_MULTIPLE : {
      return manageScheduleMultiple(state, action, 'select');
    }
    case SELECT_ONE : {
      return manageSchedule(state, action.object, 'select');
    }
    case RECEIVE_DATA : {
      return fetchSchedule(state, action)
    }
    case EDIT_SCH : {
      const result = {...state};
      result.name = editScheduleDay(result.name, action);
      return result;
    }
    case SET_SCH_ITEM : {
      const result = {...state};
      result.intervals = setScheduleItem(result.intervals, action);
      return result;
    }
    case CLEAR_ALL : {
      const {intervals} = state;
      return {...initialSchedule,[intervals]:intervals}
    }
    default:
      return state
  }
};

const rootReducer = combineReducers({
  selectedSet,
  selectedSetObject,
  simpleObjects,
  schedule
});

export default rootReducer;
