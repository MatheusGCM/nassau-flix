import React from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import styles from './style';

const Load = () => {
  return (
    <View style={styles.loading}>
      <Image
        source={require('../../assets/logo1.png')}
        style={{width: 200, height: 200}}
      />
      <ActivityIndicator size={50} color="#EC2626" />
    </View>
  );
};

export default Load;
