import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View, Text, ScrollView, StyleSheet, Image, children } from 'react-native';
import { Header } from 'react-native-elements';
import { AppLoading } from "expo";
import store from './store';
import AppNavigation from './Navigation';
import { initializeAssets } from "./assets";
// Import Main Service
import MainService from './app/Services/mainservice'

export default class App extends Component {
    state = {
        loaded: false
    }

   constructor(props) {
        super(props);
        this.state = {
            assetsReady: false
        };
        MainService.load(v => this.setState({loaded: true}));
    }

    componentDidMount() {
        initializeAssets.then((response) => {
            this.setState({assetsReady: true})
        })
    }

    render() {
        /*
        return (
            <View style={style.container}>
                {this.state.loaded ? <Text>Welcome!</Text> : <Text>Carregando...</Text>}
            </View>
        )*/

        if (!this.state.assetsReady) {
            return (<AppLoading />);
        }
        
        if (this.state.loaded){
            return (
                <Provider store={store}>
                    <View style={{ flex: 1}}>
                        <Header
                            centerComponent={{ text: 'React Native Ready', style: { color: '#fff' } }} />
                        <AppNavigation />
                    </View>
                </Provider>
            );
        } else {
            return(
                <Image
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined
                    }}
                    source={require('./assets/images/splash.png')}
                    >
                    { children }
                </Image>
                //<Image source={require('./assets/images/splash.png')} style={{width: 100, height: 100}} />
            )
        }
    }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('React native ready', () => App);