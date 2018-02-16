import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, StyleSheet, ScrollView, TouchableHighlight, Linking, View } from 'react-native';
import { Avatar, Card, Button, Badge } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

// the api keys would be here
//import { API_KEY, API_HOST } from 'react-native-dotenv';

class ReviewScreen extends Component {

    static navigationOptions = (navigation, screenProps) => {
        return { title: 'User details' }
    }

    constructor(props) {
        super(props);
        this.state = {
            username: "loading",
            picture: "loading",
            nat: "loading",
            gender: "loading",
            email: "loading",
            dob: "loading",
            fullname: "loading"

        }
    }

    componentDidMount() {
        const userParams = this.props.navigation.routes[1].params;
        this.setState({
            username: userParams.username,
            picture: userParams.picture,
            nat: userParams.nat,
            gender: userParams.gender,
            email: userParams.email,
            dob: userParams.dob,
            fullname: userParams.fullname
        })
    }

    visitSite = () => {
        const url = `https://www.alexandremagno.net`;
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                console.log('Can\'t handle url: ' + url);
            } else {
                return Linking.openURL(url);
            }
        }).catch(err => console.error('An error occurred', err));
    }



    render() {

        return (
            <View style={styles.listView}>
                <ParallaxScrollView
                    backgroundColor="#90EE90"
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={250}
                    renderForeground={() => (
                        <View style={{height: 200, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Avatar
                                containerStyle={{marginBottom: 10, marginTop: 20}}
                                medium
                                rounded
                                source={{uri: `${this.state.picture}`}}
                                activeOpacity={0.7}
                            />
                            <Badge containerStyle={{backgroundColor: 'orange', marginBottom: 20}}>
                                <Text>Birth: { this.state.dob }</Text>
                            </Badge>
                            <Badge containerStyle={{backgroundColor: 'orange', marginBottom: 20}}>
                                <Text>Gender: { this.state.gender }</Text>
                            </Badge>

                        </View>
                    )}
                    >
                    <View style={{ height: 800 }}>
                        <Text style={{padding: 20, fontSize: 18, color: '#333'}}>{this.state.fullname}</Text>
                        <Card
                            title={this.state.email}
                            image={{uri: this.state.picture}}>
                            <TouchableHighlight onPress={this.visitSite}>
                                <Text style={{marginBottom: 10, textAlign: 'center', color: 'blue', fontSize: 18}}>
                                    {this.state.nat}
                                </Text>
                            </TouchableHighlight>
                            <Button
                                backgroundColor='#03A9F4'
                                onPress={() => this.props.navigate(this.state.nat)}
                                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title='About the country' />
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
        dispatch(NavigationActions.navigate({routeName: 'Country', params: {countryCode: id}}))
    )
});

const styles = StyleSheet.create({
    listView: {
        marginTop: 60,
        height: height,
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen);