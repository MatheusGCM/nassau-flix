import React from 'react';
import {Text, View} from 'react-native';

import styles from './style';

const Greeting = ({screen, user}) => {
  return (
    <>
      <View style={styles.row}>
        <Text style={styles.header_title}>Olá,</Text>
        <Text style={styles.header_label}>
          {user.name ? user.name : user.username}
        </Text>
        <Text style={styles.header_text}>!</Text>
      </View>
      <View style={styles.marginBottom}>
        <Text style={styles.header_description}>
          Reveja ou acompanhe{' '}
          {screen === 'HomeMovie' ? 'os filmes' : 'as séries'} que você
          assistiu...
        </Text>
      </View>
    </>
  );
};

export default Greeting;
