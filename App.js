import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View, Text, ScrollView, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Asset, AppLoading, SplashScreen } from 'expo';
import store from './store';
import AppNavigation from './Navigation';
import { initializeAssets } from "./assets";

export default class App extends Component {
    state = {
        isSplashReady: false,
        isAppReady: false,
      };
    
      render() {
        if (!this.state.isSplashReady) {
          return (
            <AppLoading
              startAsync={this._cacheResourcesAsync}
              onFinish={() => this.setState({ isSplashReady: true })}
              onError={console.warn}
              autoHideSplash={false}
            />
          );
        }
    
        if (!this.state.isAppReady) {
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
            <Image source={require('./assets/images/splash.png')} />
          </View>
        );    
      }
    
      _cacheResourcesAsync = async () => {
        SplashScreen.hide();
        const images = [
          require('./assets/images/splash.png'),
        ];
    
        const cacheImages = images.map((image) => {
          return Asset.fromModule(image).downloadAsync();
        });
    
        await Promise.all(cacheImages);
        this.setState({ isAppReady: true });
      }
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('React native ready', () => App);