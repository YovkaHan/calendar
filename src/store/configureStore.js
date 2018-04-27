import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
//import createHistory from 'history/createBrowserHistory';
// 'routerMiddleware': the new way of storing route changes with redux middleware since rrV4.
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../reducers';
//export const history = createHistory();
function configureStoreProd(initialState) {
  //const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    // reactRouterMiddleware,
  ];

  return createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
}

function configureStoreDev(initialState) {
  //const reactRouterMiddleware = routerMiddleware(history);
  const middlewares = [
    // Add other middleware on this line...

    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
    thunk,
    //reactRouterMiddleware,
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;


let storeExample = {
  selectedSet: "week",
  selectedSetObject: {
    name: "week",
    data: [
      {
        name: "Monday",
        view: {
          name: "mo",
          flags: ["SELECT_ENTITY"],
          timetable: [
            {
              id: "1",
              selected: false,
            },
            {
              id: "2",
              selected: false,
            },
            {
              id: "3",
              selected: false,
            },
            {
              id: "4",
              selected: false,
            },
            {
              id: "5",
              selected: false,
            },
            {
              id: "6",
              selected: false,
            },
            {
              id: "7",
              selected: false,
            },
            {
              id: "8",
              selected: false,
            },
            {
              id: "9",
              selected: false,
            },
            {
              id: "10",
              selected: false,
            },
            {
              id: "11",
              selected: false,
            },
            {
              id: "12",
              selected: false,
            },
            {
              id: "13",
              selected: false,
            },
            {
              id: "14",
              selected: false,
            },
            {
              id: "15",
              selected: false,
            },
            {
              id: "16",
              selected: false,
            },
            {
              id: "17",
              selected: false,
            },
            {
              id: "18",
              selected: false,
            },
            {
              id: "19",
              selected: false,
            },
            {
              id: "20",
              selected: false,
            },
            {
              id: "21",
              selected: false,
            },
            {
              id: "22",
              selected: false,
            },
            {
              id: "23",
              selected: false,
            },
            {
              id: "24",
              selected: false,
            }
          ],
        },
        schedule: [
          {
            "bt": 240,
            "et": 779
          }
        ]
      },
      {
        name: "Tuesday",
        schedule: []
      },
      {
        name: "Wednesday",
        schedule: []
      },
      {
        name: "Tuesday",
        schedule: [
          {
            "bt": 240,
            "et": 779
          },
          {
            "bt": 1140,
            "et": 1319
          }
        ]
      },
      {
        name: "Friday",
        schedule: [
          {
            "bt": 660,
            "et": 1019
          }
        ]
      },
      {
        name: "Saturday",
        schedule: [
          {
            "bt": 0,
            "et": 1439
          }
        ]
      },
      {
        name: "Sunday",
        schedule: []
      }
    ]
  },
  dataByName: {
    week: {
      isFetching: false,
      previousResult: {
        "mo": [
          {
            "bt": 240,
            "et": 779
          }
        ],
        "tu": [],
        "we": [],
        "th": [
          {
            "bt": 240,
            "et": 779
          },
          {
            "bt": 1140,
            "et": 1319
          }
        ],
        "fr": [
          {
            "bt": 660,
            "et": 1019
          }
        ],
        "sa": [
          {
            "bt": 0,
            "et": 1439
          }
        ],
        "su": []
      }
    }
  }
}
