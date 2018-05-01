/**
 * Created by Jordan3D on 4/25/2018.
 */
export const GET_FREE_OBJS = 'GET_FREE_OBJS';
export const CREATE_OBJ = 'CREATE_OBJ';
export const EDIT_OBJ = 'EDIT_OBJ';
export const ADD_ONE = 'ADD_ONE';
export const ASSIGN_OBJECTS = 'ASSIGN_OBJECTS';
export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_POSTS';
export const SELECT_SET = 'SELECT_SET';
export const SELECT_MULTIPLE = 'SELECT_MULTIPLE';
export const SELECT_ONE = 'SELECT_ONE';
export const CLEAR_ONE = 'CLEAR_ONE';
export const CLEAR_ALL = 'CLEAR_ALL';
export const CLEAR_MULTIPLE = 'CLEAR_MULTIPLE';
export const SEND_DATA = 'SEND_DATA';
export const FETCH_SCH = 'FETCH_SCH';
export const EDIT_SCH = 'EDIT_SCH';
export const SET_SCH_ITEM = 'SET_SCH_ITEM';

export const createObject = (objectType) => ({
  type: CREATE_OBJ,
  objectType
});

export const editSetObject = (selected, config, data) => ({
  type: EDIT_OBJ,
  selected,
  config,
  data
});

export const addObject = () => ({
  type: ADD_ONE
});

export const assignObjects = objects => ({
  type: ASSIGN_OBJECTS,
  objects
});

export const selectMultipleObject = objects => ({
  type: SELECT_MULTIPLE,
  objects
});

export const selectOneObject = object => ({
  type: SELECT_ONE,
  object
});

export const clearOneObject = object => ({
  type: CLEAR_ONE,
  object
});

export const clearMultipleObjects = objects => ({
  type: CLEAR_MULTIPLE,
  objects
});

export const receivePosts = (json) => ({
  type: RECEIVE_DATA,
  object: json
});

export const actionFunction = (name) => {
  switch (name) {
    case SELECT_MULTIPLE: {
      return selectMultipleObject;
    }
    case CLEAR_MULTIPLE: {
      return clearMultipleObjects;
    }
  }
}

export const setScheduleItem = (object) => ({
  type: SET_SCH_ITEM,
  object
})

export const fetchData = (data) => dispatch => {
  if (data) {
    let headers = new Headers({
      'Content-Type' : 'application/json'
    });

    return fetch('http://localhost:3013/schedule.json', {
      method: 'post',
      headers: headers,
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(json => console.log(json))
  }
  return fetch(`http://localhost:3013/schedule.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
}

export const controlsAction = (action, data) => {
  switch (action) {
    case 'clear' : {
      return ({
        type: CLEAR_ALL
      })
    }
    case 'save' : {
      return  dispatch => {
        dispatch(fetchData(data));
      };
    }
  }
}
