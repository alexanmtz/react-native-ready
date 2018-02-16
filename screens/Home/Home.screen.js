import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Moment from 'react-moment';
import { List, ListItem } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

// keys would be here
//import { API_KEY, API_HOST } from 'react-native-dotenv';

import Dimensions from 'Dimensions';
const {width, height} = Dimensions.get('window');

const listItem = (item, goto) => {
    return (<ListItem containerStyle={styles.listItemView}
                     roundAvatar
                     onPress={() => goto({
                         username: item.login.username,
                         picture: item.picture.large,
                         gender: item.gender,
                         email: item.email,
                         dob: item.dob,
                         nat: item.nat,
                         fullname: `${item.name.first} ${item.name.last}`
                     })}
                     title={`${item.name.title} ${item.name.first} ${item.name.last}`}
                     subtitle={
                         <View style={styles.subtitleView}>
                             <Text style={styles.ratingText}>
                                 <Moment element={Text} fromNow>{item.registered}</Moment>
                             </Text>
                         </View>

                     }
                     avatar={`${item.picture.medium}`}
    />)
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
        this.makeRequest();
    }

    handleRefresh = () => {
        this.setState({refreshing: true})
    }

    makeRequest = () => {
        fetch("https://randomuser.me/api/?results=10", {})
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                this.setState({
                    data: data.results,
                    refreshing: false
                })

            });
    }

    render() {
        return (
            <List containerStyle={styles.listView}>
                <FlatList
                    onRefresh={this.handleRefresh}
                    onEndReached={this.handleLoadMore}
                    refreshing={this.state.refreshing}
                    onEndReachedThreshold={50}
                    data={this.state.data}
                    renderItem={
                        ({item}) => (listItem(item, this.props.navigate))
                    }
                    keyExtractor={item => item.login.username}
                 />
            </List>
        );
    }
}


const mapStateToProps = state => ({
    navigation: state.navigation
});

const mapDispatchToProps = dispatch => ({
    navigate: (userdata) => (
        dispatch(NavigationActions.navigate({routeName: 'Review', params: userdata}))
    )
});

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);