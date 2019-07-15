import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  FlatList, StyleSheet, View, Text,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';

const styles = StyleSheet.create({
  listItemView: {
    height: 120,
    paddingBottom: 10,
  },
  subtitleView: {
    flexDirection: 'column',
    paddingTop: 5,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

const listItem = (item, navigation, dispatch) => {
  const navigateToReview = () => {
    dispatch({
      type: 'USER',
      user: {
        username: item.login.username,
        picture: item.picture.large,
        gender: item.gender,
        email: item.email,
        dob: item.dob,
        nat: item.nat,
        fullname: `${item.name.first} ${item.name.last}`,
      },
    });
    setTimeout(() => navigation.navigate('Review'), 1000);
  };

  return (
    <ListItem
      containerStyle={styles.listItemView}
      roundAvatar
      onPress={navigateToReview}
      title={`${item.name.title} ${item.name.first} ${item.name.last}`}
      subtitle={(
        <View style={styles.subtitleView}>
          <Text style={styles.ratingText}>
            <Text>{format(new Date(item.registered.date), 'MM/DD/YYYY')}</Text>
          </Text>
        </View>
      )}
      leftAvatar={{
        source: `${item.picture.medium}` && { uri: `${item.picture.medium}` },
        title: `${item.name.first}`,
      }}
    />
  );
};

const HomeScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(true);

  const dispatch = useDispatch();

  const makeRequest = () => {
    // eslint-disable-next-line no-undef
    fetch('https://randomuser.me/api/?results=10', {})
      .then(res => res.json())
      .then(({ results }) => {
        setData([...data, ...results]);
        setIsRefreshing(false);
      });
  };

  useEffect(() => makeRequest(), []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    makeRequest();
  };

  return (
    <FlatList
      onRefresh={() => handleRefresh()}
      onEndReached={handleRefresh}
      refreshing={isRefreshing}
      onEndReachedThreshold={0.15}
      data={data}
      renderItem={
        ({ item }) => (listItem(item, navigation, dispatch))
      }
      keyExtractor={item => item.login.username}
    />
  );
};

HomeScreen.navigationOptions = {
  title: 'Users',
};

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


export default HomeScreen;
