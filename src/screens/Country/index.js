/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  View, Text, StyleSheet, TouchableHighlight, Linking, Image, Dimensions,
} from 'react-native';
import { Card, Badge } from 'react-native-elements';
import ParallaxScrollView from 'react-native-parallax-scroll-view';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  listView: {
    height: 800,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

const CountryScreen = () => {
  const [countryCode, setCountryCode] = useState(null);
  const [country, setCountry] = useState({});

  const { nat } = useSelector(state => state.user);

  useEffect(() => {
    const makeRequest = () => {
      // eslint-disable-next-line no-undef
      fetch(`https://restcountries.eu/rest/v2/alpha/${nat}`)
        .then(res => res.json())
        .then((data) => {
          setCountry(data);
          setCountryCode(data.flag);
        });
    };
    makeRequest();
  }, []);

  const visitSite = () => {
    const url = `${countryCode}`;
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
        contentBackgroundColor="white"
        parallaxHeaderHeight={300}
        renderForeground={() => (
          <View style={{
            height: 200,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          >
            <Badge
              badgeStyle={{
                backgroundColor: 'orange',
                paddingVertical: 10,
                paddingHorizontal: 5,
              }}
              value={<Text>{country.name}</Text>}
              status="warning"
            />
          </View>
        )}
        renderBackground={() => (
          <Image
            style={{
              width: 300,
              height: 300,
            }}
            source={{ uri: country.flag }}
          />
        )}
      >
        <View style={{ height: 800 }}>
          <Badge
            containerStyle={{
              marginTop: 20,
              marginBottom: 10,
            }}
            badgeStyle={{
              backgroundColor: 'violet',
              paddingHorizontal: 10,
              width,
              height: 30,
            }}
            value={<Text style={styles.title}>{country.name}</Text>}
          />

          <Badge
            containerStyle={{
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
            badgeStyle={{
              backgroundColor: 'violet',
              paddingHorizontal: 10,
              width,
              height: 30,
            }}
            value={<Text style={styles.title}>{country.region}</Text>}
          />
          <Card
            title={country.name}
          >
            <TouchableHighlight onPress={() => visitSite()}>
              <Text style={{
                marginBottom: 10,
                textAlign: 'center',
                color: 'blue',
              }}
              >
                {country.cioc}
              </Text>
            </TouchableHighlight>
          </Card>
        </View>
      </ParallaxScrollView>
    </View>
  );
};

CountryScreen.navigationOptions = {
  title: 'Country',
};

CountryScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default CountryScreen;
