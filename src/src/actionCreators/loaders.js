export const loadItem = itemType => ({
  type: `${itemType}_LOAD`,
});


export const itemLoading = itemType => ({
  type: `${itemType}_IS_LOADING`,
});


export const itemLoadingError = (itemType, err) => ({
  type: `${itemType}_LOADING_ERROR`,
  err,
});


export const itemLoaded = (itemType, payload) => ({
  type: `${itemType}_LOADED`,
  payload,
});
