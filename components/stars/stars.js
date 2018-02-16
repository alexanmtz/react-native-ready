import React, { Component } from 'react';
import {Image, StyleSheet} from 'react-native';

const stars = [require('../../assets/images/1_stars.png'), require('../../assets/images/2_stars.png'), require('../../assets/images/3_stars.png'), require('../../assets/images/4_stars.png'),
    require('../../assets/images/5_stars.png')]

const styles = StyleSheet.create({
    ratingImage: {
        width: '115%',
        height: 60,
        marginBottom: 5,
        transform: [
            { scaleY: 0.6 },
            { scaleX: 0.6 },
            { translateX: -80 }
        ]
    }
});

export default renderStars = (note) => {
    return (
        <Image source={stars[note - 1]} style={styles.ratingImage}/>
    )
}