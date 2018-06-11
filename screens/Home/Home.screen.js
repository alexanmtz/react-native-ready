import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import Moment from 'react-moment';

// keys would be here
//import { API_KEY, API_HOST } from 'react-native-dotenv';

import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');

const listItem = (item, navigation) => {
    return (<ListItem
        containerStyle={styles.listItemView}
        roundAvatar
        onPress={() => navigation.navigate('Review',
            {
                username: item.login.username,
                picture: item.picture.large,
                gender: item.gender,
                email: item.email,
                dob: item.dob,
                nat: item.nat,
                fullname: `${item.name.first} ${item.name.last}`
            }
        )}
        title={`${item.name.title} ${item.name.first} ${item.name.last}`}
        subtitle={
            <View style={styles.subtitleView}>
                <Text style={styles.ratingText}>
                    <Moment element={Text} fromNow>{item.registered}</Moment>
                </Text>
            </View>

        }
        avatar={`${item.picture.medium}`}
    />);
}

class HomeScreen extends Component {

    static navigationOptions = {
      title: 'Users'
    }

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing: false
        }
    }

    componentDidMount() {
        this.makeRequest();
    }

    handleLoadMore = () => {
        this.setState({ refreshing: true });
        this.makeRequest(true);
    }
    
    handleRefresh = () => {
        this.setState({ refreshing: true });
        this.makeRequest();
    }

    makeRequest = (append = false) => {
        fetch("https://randomuser.me/api/?results=10", {})
            .then(res => res.json())
            .then(({ results }) => {
                this.setState(state => ({
                    data: append ? [...state.data, ...results] : results,
                    refreshing: false
                }))

            });
    }

    render() {
        return (
            <FlatList
                onRefresh={this.handleRefresh}
                onEndReached={this.handleLoadMore}
                refreshing={this.state.refreshing}
                onEndReachedThreshold={0.15}
                data={this.state.data}
                renderItem={
                    ({ item }) => (listItem(item, this.props.navigation))
                }
                keyExtractor={item => item.login.username}
                />
        );
    }
}

const styles = StyleSheet.create({
    listView: {
      marginTop: 60,
      height: height,
      borderTopWidth: 0,
      borderBottomWidth: 0
    },
    listItemView: {
      height: 120,
      paddingBottom: 10
    },
    subtitleView: {
        flexDirection: 'column',
        paddingTop: 5,
    },
    ratingImage: {
        width: '100%',
        height: 50,
        marginBottom: 5,
        transform: [
            { scaleY: 0.6 },
            { scaleX: 0.6 },
            { translateX: -80 }
        ]
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey'
    }
});

export default HomeScreen;