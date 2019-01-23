const defaultState = { prism: {} };
const USER_LOADED = 'USER_LOADED';
const ACTIONS = {
  [USER_LOADED]: (action) => action.payload,
};


const user = (state = defaultState, action) => ACTIONS[action.type]
  ? ACTIONS[action.type](action)
  : state;


export default user;
