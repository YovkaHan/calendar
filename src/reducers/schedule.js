/**
 * Created by Jordan3D on 5/4/2018.
 */
import {
  EDIT_SCH, SET_SCH_ITEM, RECEIVE_DATA, SEND_DATA,
  SELECT_ONE, SELECT_MULTIPLE,
  CLEAR_ONE, CLEAR_ALL, CLEAR_MULTIPLE
} from '../actions'
import { inInterval } from './index'

const editScheduleDay = (day, action) => {
  const result = [];

  let intervals = action.intervals.slice().sort(function (a, b) {
    if (a[0] < b[0]) {
      return -1;
    } else {
      return 1;
    }
  });

  while (intervals.length !== 0) {
    let obj = intervalProcedure(intervals);
    if (obj) {
      result.push(result);
    }
  }

  function intervalProcedure(intervals) {
    let index = intervals.length - 1;
    let result = null;

    while (intervals.length > 0) {
      if (intervals[index][1] === intervals[index - 1][0]) {
        result.bt = intervals[index][0];
        result.bt = intervals[index - 1][1];

        intervals[index - 1][0] = intervals[index][0];
        intervals.pop();
        index--;
      } else {
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
  data: {
    mo: [],
    tu: [],
    we: [],
    th: [],
    fr: [],
    sa: [],
    su: [],
  },
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

const createItem = function (f, s, interval) {
  if (!f && !s) {
    return {
      bt: interval[0],
      et: interval[1]
    }
  } else if (f && !s) {
    return {
      bt: f[0].bt,
      et: interval[1]
    }
  } else if (f && s) {
    return {
      bt: f[0].bt,
      et: s[0].et
    }
  } else if (!f && s) {
    return {
      bt: interval[0],
      et: s[0].et
    }
  }
}

const selectFrom = function (data, interval, set) {
  let index;
  for (let i in data) {
    if (set === 'first') {
      if (interval[0] - 1 === data[i].et) {
        index = i;
        break
      }
    } else if (set === 'second') {
      if (interval[1] + 1 === data[i].bt) {
        index = i;
        break
      }
    }
  }
  if (index === undefined) {
    return null;
  }
  return data.splice(index, 1);
}

const manageClearing = function (storePlus, intervalToClear, config) {
  let result = storePlus.result;
  let firstPart = {...storePlus.interval[0]};
  let secondPart = null;

  if (intervalToClear[0] > 0) {
    secondPart = {};
    let bufEt = firstPart.et;
    firstPart.et = intervalToClear[0] - 1;
    secondPart.et = bufEt;
    secondPart.bt = intervalToClear[1] + 1;
  } else if (intervalToClear[0] === 0) {
    firstPart.bt = intervalToClear[1] + 1;
  } else if (intervalToClear[1] + 1 === config.max) {
    firstPart.et = intervalToClear[0] - 1;
  }

  if (firstPart.et > firstPart.bt) {
    result.push(firstPart);
  }
  if (secondPart && secondPart.et > secondPart.bt) {
    result.push(secondPart);
  }

  return result;
};

const manageDay = function (state, obj, set, config) {
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
  } else if (set === 'clear') {

    // { state, interval}
    const storePlus = inInterval(result, interval);

    if (storePlus) {

      return manageClearing(storePlus, interval, config);
    }
  }

  return result;
};

const clearSchedule = function (state) {
  return Object.assign({}, initialSchedule, {
    intervals: state.intervals
  });
};

const manageData = function (state, name, obj, set, config) {
  return {...state, [name]: manageDay([...state[name]], obj, set, config)};
}

const manageSchedule = function (state, obj, set) {
  const result = {...state};
  const oInIntervals = result.intervals[obj.id];
  const data = manageData(result.data, oInIntervals.name, oInIntervals, set, result.config);
  return {...result, data}
};

const manageScheduleMultiple = function (state, action, set) {
  let result = {...state};
  for (let i = 0; i < action.objects.length; i++) {
    result = manageSchedule(result, action.objects[i], set);
  }
  return result;
};

const fetchSchedule = function (state, action) {
  const data = {...action.object};
  const result = Object.assign({}, state, {
    data: data
  });
  result.fetched = true;
  return result;
}


export const schedule = (state = initialSchedule, action) => {
  switch (action.type) {
    case CLEAR_MULTIPLE : {
      return manageScheduleMultiple(state, action, 'clear');
    }
    case CLEAR_ONE : {
      return manageSchedule(state, action.object, 'clear');
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
    case SEND_DATA : {
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
      return clearSchedule(state);
    }
    default:
      return state
  }
};
