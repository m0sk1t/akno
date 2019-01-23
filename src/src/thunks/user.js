import {
  userLoaded,
  userLoadingError,
} from "../actionCreators/user";


export const logIn = (name, pass) => {
  const formData = new FormData();
  formData.append('username', name);
  formData.append('password', pass);
  const options = new Request('/api/v1/auth/login', {
    method: 'POST',
    body: formData,
  })
  return async (dispatch) => {
    try {
      await fetch(options).then(res => res.json());
    } catch (err) {
      dispatch(userLoadingError(err));
    }
  }
};


export const loadUser = () => {
  return async (dispatch) => {
    try {
      const user = await fetch('/api/v1/users').then(res => res.json());
      if (user.message) throw user.message;
      dispatch(userLoaded(user));
    } catch (err) {
      dispatch(userLoadingError(err));
    }
  }
};
