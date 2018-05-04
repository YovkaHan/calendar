/**
 * Created by Jordan3D on 5/4/2018.
 */
import {
  CREATE_OBJECTS, EDIT_OBJECTS
} from '../actions'

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

const editView = function (view, action) {
  const result = {...view};
  result.timetable = fullTimetable(result.timetable, action);
  return result;
}

const editStateSelected = function (selected, action) {
  return {...action.data};
}

const editState = function (state, action) {
  const result = {...state};
  if (action.config.operation.indexOf('selected') !== -1) {
    result.selected = editStateSelected(state.selected, action);
  }
  return result;
}

const editDay = function (day, action) {
  const result = {...day};
  if (action.config.operation.indexOf('view') !== -1) {
    result.view = editView(result.view, action);
  } else if (action.config.operation.indexOf('state') !== -1) {
    result.state = editState(result.state, action);
  }
  return result;
}

const editWeek = function (week, action) {
  const result = {...week};
  const day = editDay(result.data.find((d) => d.name === action.config.name), action);


  result.data = result.data.map((o) => {
    if (day.name === o.name) {
      return day;
    }
    return o;
  });

  return result;

};

export const selectedSetObject = (state = {}, action) => {
  switch (action.type) {
    case CREATE_OBJECTS : {
      return setObjectConstruct(action.objectType);
    }
    case EDIT_OBJECTS: {
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
