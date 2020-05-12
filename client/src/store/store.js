import { createStore } from "redux";

const SET_MAP = "setMap";
const SET_STORE_LIST = "setStoreList";
const ADD_MARKER = "addMarker";

const setMap = (map) => {
  return {
    type: SET_MAP,
    map: map,
  };
};

const reducer = (
  state = {
    playMap: {
      map: null,
    },
  },
  action
) => {
  console.log(action);
  switch (action.type) {
    case SET_MAP:
      return {
        ...state,
        playMap: {
          ...state.playMap,
          map: action.map,
        },
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  setMap,
};

export default store;
