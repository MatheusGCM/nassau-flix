import React from 'react';
import {ScrollView, Text, Image, View} from 'react-native';
import RatingAverage from '../RatingAverage';

const Recomendation = ({data}) => {
  return (
    <>
      <Text
        style={{
          color: '#fff',
          fontSize: 17,
          marginEnd: 5,
          fontFamily: 'OpenSans-Bold',
        }}>
        Recomendações:
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map(item => (
          <View style={{margin: 9}} key={String(item.id)}>
            <Image
              style={{
                width: 76,
                height: 95,
                borderRadius: 10,
                marginBottom: 5,
              }}
              source={{
                uri: `http://image.tmdb.org/t/p/w185/${item.poster_path}`,
              }}
            />
            <RatingAverage rating={item.vote_average} />
          </View>
        ))}
      </ScrollView>
    </>
  );
};
export default Recomendation;
