export const CHANGE_VIEW = 'view/change';
export const RESET_VIEW = 'view/reset';

export const changeView = view => ({
  type: CHANGE_VIEW,
  view,
});

export const resetView = () => ({
  type: RESET_VIEW,
});

// export const changeView = (view) => dispatch()
