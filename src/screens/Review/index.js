/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import { useSelector } from 'react-redux';
import {
  Text, StyleSheet, TouchableHighlight, Linking, View, Dimensions,
} from 'react-native';
import {
  Avatar, Card, Button, Badge,
} from 'react-native-elements';

const { height } = Dimensions.get('window');

const DATA_INITIAL = {
  username: 'loading',
  picture: 'loading',
  nat: 'loading',
  gender: 'loading',
  email: 'loading',
  dob: null,
  fullname: 'loading',
};

const styles = StyleSheet.create({
  listView: {
    marginTop: 60,
    height,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});

const ReviewScreen = ({ navigation }) => {
  const [data, setData] = useState(DATA_INITIAL);
  const user = useSelector(state => state.user);

  useEffect(() => {
    setData({
      username: user.username,
      picture: user.picture,
      nat: user.nat,
      gender: user.gender,
      email: user.email,
      dob: user.dob,
      fullname: user.fullname,
    });
  }, []);

  const visitSite = () => {
    const url = 'https://www.alexandremagno.net';
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        return console.log(`Can't handle url: ${url}`);
      }
      return Linking.openURL(url);
    }).catch(err => console.error('An error occurred', err));
  };


  return (
    <View style={styles.listView}>
      <ParallaxScrollView
        backgroundColor="#90EE90"
        contentBackgroundColor="white"
        parallaxHeaderHeight={250}
        renderForeground={() => (
          <View style={{
            height: 200,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Avatar
              containerStyle={{ marginBottom: 10, marginTop: 20 }}
              medium
              rounded
              source={{ uri: `${data.picture}` }}
              activeOpacity={0.7}
            />
            {data.dob
              && (
                <Badge
                  containerStyle={{
                    marginBottom: 20,
                  }}
                  badgeStyle={{
                    backgroundColor: 'orange',
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                  }}
                  value={<Text>Birth: {data.dob.age}</Text>}
                />

              )}
            {data.genderss
              && (
                <Badge
                  containerStyle={{
                    marginBottom: 20,
                  }}
                  badgeStyle={{
                    backgroundColor: 'orange',
                    paddingVertical: 10,
                    paddingHorizontal: 5,
                  }}
                  value={<Text>Gender: {data.gender}</Text>}
                />

              )}
          </View>
        )}
      >
        <View style={{ height: 800 }}>
          <Text style={{
            padding: 20,
            fontSize: 18,
            color: '#333',
          }}
          >
            {data.fullname}
          </Text>
          <Card
            title={data.email}
            image={{ uri: data.picture }}
          >
            <TouchableHighlight onPress={visitSite}>
              <Text style={{
                marginBottom: 10,
                textAlign: 'center',
                color: 'blue',
                fontSize: 18,
              }}
              >
                {data.nat}
              </Text>
            </TouchableHighlight>
            <Button
              backgroundColor="#03A9F4"
              onPress={() => navigation.navigate('Country')}
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="About the country"
            />
          </Card>
        </View>
      </ParallaxScrollView>
    </View>
  );
};

ReviewScreen.navigationOptions = {
  title: 'User details',
};

ReviewScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default ReviewScreen;
