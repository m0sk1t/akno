import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';


import user from './user';
// import { navReducer } from '../components/Navigator';


const reducer = combineReducers({
  user,
  // nav: navReducer,
});


export default reducer;
export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
