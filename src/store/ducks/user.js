const INITIAL = {};

const user = (state = INITIAL, action) => {
  switch (action.type) {
    case 'USER':
      return { ...state, ...action.user };
    case 'USER_COUNTRY':
      return { ...state, ...action.user };
    default:
      return state;
  }
};

export default user;
