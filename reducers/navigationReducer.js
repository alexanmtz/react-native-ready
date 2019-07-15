import AppNavigator from "../Navigation/navigationStack";

const firstAction = AppNavigator.router.getActionForPathAndParams('Home');
const initialState = AppNavigator.router.getStateForAction(
    firstAction
);

const navigationReducer = (state = initialState, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state);
    return newState || state;
};

export default navigationReducer;