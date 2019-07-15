import React, { Component } from "react";
import PropTypes from 'prop-types';
import { addNavigationHelpers } from "react-navigation";
import { connect } from "react-redux";
import NavigationStack from './navigationStack';
import {
    createReduxBoundAddListener
} from 'react-navigation-redux-helpers';

const addListener = createReduxBoundAddListener("app");

class AppNavigation extends Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        navigationState: PropTypes.object.isRequired,
    };

    render() {
        const { dispatch, navigationState } = this.props;
        return (
            <NavigationStack
                navigation={addNavigationHelpers({
                    dispatch, state: navigationState,
                    addListener
                })}
            />
        );
    }
};

const mapStateToProps = state => ({
    navigationState: state.NavigationReducer
});

export default connect(mapStateToProps)(AppNavigation);