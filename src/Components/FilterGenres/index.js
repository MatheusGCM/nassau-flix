import React from 'react';
import {Pressable, Text} from 'react-native';
import styles from './style';

const FilterGenres = ({id, name, onPress, genresSelected}) => {
  return (
    <Pressable
      style={[
        styles.genresBtn,
        {
          backgroundColor: id === genresSelected.id ? '#EC2626' : '#000',
        },
      ]}
      onPress={onPress}>
      <Text style={styles.genresText}>{name}</Text>
    </Pressable>
  );
};

export default FilterGenres;
