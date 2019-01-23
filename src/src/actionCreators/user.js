import {
  loadItem,
  itemLoaded,
  itemLoading,
  itemLoadingError,
} from "./loaders";


export const USER = 'USER';
export const USERS = 'USERS';


export const loadUser = _ => loadItem(USER);
export const userLoading = _ => itemLoading(USER);
export const userLoaded = payload => itemLoaded(USER, payload);
export const userLoadingError = err => itemLoadingError(USER, err);

export const loadUsers = _ => loadItem(USERS);
export const usersLoading = _ => itemLoading(USERS);
export const usersLoaded = payload => itemLoaded(USERS, payload);
export const usersLoadingError = err => itemLoadingError(USERS, err);
