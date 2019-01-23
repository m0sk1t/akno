import {
  StackNavigator,
} from 'react-navigation';
// import {
//   reduxifyNavigator,
//   createReactNavigationReduxMiddleware,
//   createNavigationReducer,
// } from 'react-navigation-redux-helpers';


import LoginScreen from './LoginScreen';


export const AppNavigator = new StackNavigator({
  LogIn: { screen: LoginScreen },
});

// export const navReducer = createNavigationReducer(AppNavigator);

// export const navMiddleware = createReactNavigationReduxMiddleware(
//   "root",
//   state => state.nav,
// );

// export const AppNav = reduxifyNavigator(AppNavigator, "root");
