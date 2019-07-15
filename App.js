import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View, Text, ScrollView, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Asset, AppLoading, SplashScreen } from 'expo';
import store from './store';
import AppNavigation from './Navigation';
import { initializeAssets } from "./assets";

export default class App extends Component {

    constructor(props) {
     super(props);
     this.state = {
        isSplashReady: false,
        assetsReady: false,
     }
    }

    
    render() {
        if (!this.state.isSplashReady) {
          return (
            <AppLoading
              startAsync={this._cacheSplashResourcesAsync}
              onFinish={() => this.setState({ isSplashReady: true })}
              onError={(e) => console.log('app loading error', e)}
              autoHideSplash={false}
            />
          );
        }

        if (!this.state.assetsReady) {
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


        return (
          <View style={{ flex: 1 }}>
            <Image
                source={require('./assets/images/splash.png')}
                onLoad={this._cacheResourcesAsync}
            />
          </View>
        );
    }

    _cacheSplashResourcesAsync = async () => {
        const splashImage = require('./assets/images/splash.png');
        return Asset.fromModule(splashImage).downloadAsync();
    }

    _cacheResourcesAsync = async () => {
        SplashScreen.hide();
        const images = [
          require('./assets/images/splash.png'),
        ];

        const cacheImages = images.map((image) => {
          return Asset.fromModule(image).downloadAsync();
        });

        await Promise.all([cacheImages, initializeAssets]);
        this.setState({ assetsReady: true });
    }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('React native ready', () => App);