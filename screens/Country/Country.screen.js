import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableHighlight, Linking, Image } from 'react-native';
import { Card, Badge } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Dimensions from 'Dimensions';

const { height } = Dimensions.get('window');

// api keys would be here
//import { API_KEY, API_HOST } from 'react-native-dotenv';

class CountryScreen extends Component {

    static navigationOptions = (navigation, screenProps) => {
        return { title: 'Country' }
    }

    constructor(props) {
        super(props);
        this.state = {
            countryCode: null,
            country: {},
            refreshing: false
        }
    }

    componentDidMount() {
        this.makeRequest();
    }

    handleLoadMore = () => {
        this.makeRequest();
    }

    handleRefresh = () => {
        this.setState({refreshing: true})
    }

    visitSite = () => {
        const url = `https://${this.state.countryCode}`;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }

    makeRequest = () => {
        const countryCode = this.props.navigation.routes[2].params.countryCode;
        fetch(`https://restcountries.eu/rest/v2/alpha/${countryCode}`, { /* headers would be here */})
            .then(res => res.json())
            .then(data => {
                console.log('country');
                console.log(data);
                this.setState({
                    country: data,
                    refreshing: false
                })

            });

    }

    render() {
        const country = this.state.country;

        return (
            <View style={styles.listView}>
                <ParallaxScrollView
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={300}
                    renderForeground={() => (
                        <View style={{ height: 200, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Badge containerStyle={{ backgroundColor: 'orange'}}>
                                <Text>{ country.name }</Text>
                            </Badge>
                        </View>
                    )}
                    renderBackground={() => (
                        <Image style={{width: 300, height: 300}} source={{uri: country.name}} />
                    )}
                >
                    <View style={{ height: 800 }}>
                        <Badge containerStyle={{ backgroundColor: 'violet', marginTop: 20, marginBottom: 10}}>
                            <Text style={styles.title}>{country.name}</Text>
                        </Badge>
                        <Badge containerStyle={{ backgroundColor: 'violet', marginBottom: 10}}>
                            <Text style={styles.title}>{country.region}</Text>
                        </Badge>
                        <Card
                            title={country.name}>
                            <TouchableHighlight onPress={this.visitSite}>
                                <Text style={{marginBottom: 10, textAlign: 'center', color: 'blue'}}>
                                    {country.cioc}
                                </Text>
                            </TouchableHighlight>
                        </Card>
                    </View>
                </ParallaxScrollView>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    navigation: state.NavigationReducer
});

const mapDispatchToProps = dispatch => ({
    navigate: (id) => (
        dispatch(NavigationActions.navigate({routeName: 'Home'}))
    )
});

const styles = StyleSheet.create({
    listView: {
        height: 800,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryScreen);