import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View, Text, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import { AppLoading } from "expo";
import store from './store';
import AppNavigation from './Navigation';
import { initializeAssets } from "./assets";

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            assetsReady: false
        };
    }

    componentDidMount() {
        initializeAssets.then((response) => {
            this.setState({assetsReady: true})
        })
    }

    render() {
        if (!this.state.assetsReady) {
            return (<AppLoading />);
        }
        
        return (
            <Provider store={store}>
                <View style={{ flex: 1}}>
                    <Header
                        centerComponent={{ text: 'React Native Ready', style: { color: '#fff' } }} />
                    <AppNavigation />
                </View>
            </Provider>
        );
    }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('React native ready', () => App);