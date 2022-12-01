import React from 'react';
import {ActivityIndicator, Image, TouchableOpacity} from 'react-native';

import styles from './style';

const ButtonFavorite = ({onPress, favorite, loading}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.buttonRight}
      onPress={onPress}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color={'#EC2626'} size="small" />
      ) : favorite ? (
        <Image
          testID="starSelected"
          source={require('../../assets/starSelected.png')}
        />
      ) : (
        <Image
          testID="starNoSelected"
          source={require('../../assets/star.png')}
        />
      )}
    </TouchableOpacity>
  );
};

export default ButtonFavorite;
