/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {View, FlatList, Text, Pressable} from 'react-native';
import styles from './style';
import {getAccount, getGenres, getMidia} from '../../service/api';
import {Context} from '../../context';
import Loading from '../../Components/Loading';
import Load from '../../Components/Load';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonAvatar from '../../Components/ButtonAvatar';
import Greeting from '../../Components/Greeting';
import Midia from '../../Components/Midia';

const popular = {
  id: 'Popular',
  name: 'Popular',
};

const Home = ({route, navigation}) => {
  const {id, user, setUser} = useContext(Context);

  const [page, setPage] = useState(2);
  const [pageGenres, setPageGenres] = useState(2);

  const [loading, setLoading] = useState(false);
  const [dataMidiaPopular, setDataMidiaPopular] = useState([]);
  const [dataMidiaGenres, setDataMidiaGenres] = useState([]);
  const [dataGenres, setDataGenres] = useState([]);
  const [genresSelected, setGenresSelected] = useState(popular);

  useEffect(() => {
    getResponseAccount();
    getResponseMidiaPopular();
    getResponseGenres();
  }, []);

  const getResponseAccount = async () => {
    const storedUser = await AsyncStorage.getItem('SessionId');
    const response = await getAccount(id ? id : storedUser);
    setUser(response.data);
  };

  const getResponseMidiaPopular = async () => {
    try {
      setPage(2);
      setGenresSelected(popular);
      setLoading(true);
      const {data} = await getMidia(
        route.name === 'HomeMovie' ? 'movie' : 'tv',
        1,
      );
      setDataMidiaPopular(data.results);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const nextPageDataPopular = async () => {
    try {
      // if (loading) {
      //   return;
      // }
      setLoading(true);
      const {data} = await getMidia(
        route.name === 'HomeMovie' ? 'movie' : 'tv',
        page,
      );
      setDataMidiaPopular([...dataMidiaPopular, ...data.results]);
    } catch (error) {
      console.warn(error);
    } finally {
      setPage(page + 1);
      setLoading(false);
    }
  };

  const getResponseGenres = async () => {
    try {
      const {data} = await getGenres(
        route.name === 'HomeMovie' ? 'movie' : 'tv',
      );
      setDataGenres(data.genres);
    } catch (error) {
      console.warn(error);
    }
  };

  const genresSelect = async value => {
    try {
      setPageGenres(2);
      setGenresSelected(value);
      setLoading(true);
      const {data} = await getMidia(
        route.name === 'HomeMovie' ? 'movie' : 'tv',
        1,
      );
      const aux = data.results.map(item => ({
        ...item,
        genre_ids: item.genre_ids.filter(i => i === value.id),
      }));
      const aux2 = aux.filter(item => item.genre_ids.length !== 0);
      setDataMidiaGenres(aux2);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const nextPageDataGenres = async () => {
    try {
      setLoading(true);
      const {data} = await getMidia(
        route.name === 'HomeMovie' ? 'movie' : 'tv',
        pageGenres,
      );
      const aux = data.results.map(item => ({
        ...item,
        genre_ids: item.genre_ids.filter(i => i === genresSelected.id),
      }));
      const aux2 = aux.filter(item => item.genre_ids.length !== 0);
      setDataMidiaGenres([...dataMidiaGenres, ...aux2]);
    } catch (error) {
      console.warn(error);
    } finally {
      setPageGenres(pageGenres + 1);
      setLoading(false);
    }
  };

  return user && dataMidiaPopular ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <ButtonAvatar user={user} navigation={navigation} />
        <Greeting screen={route.name} user={user} />
        <Text style={styles.title}>
          {route.name === 'HomeMovie' ? 'Filmes' : 'Séries'} populares este mês
        </Text>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <FlatList
          ListHeaderComponent={() => (
            <Pressable
              onPress={getResponseMidiaPopular}
              style={[
                styles.genresBtn,
                {
                  backgroundColor:
                    popular.id === genresSelected.id ? '#EC2626' : '#000',
                },
              ]}>
              <Text style={styles.genresText}>{popular.name}</Text>
            </Pressable>
          )}
          data={dataGenres}
          renderItem={({item}) => (
            <Pressable
              onPress={() => genresSelect(item)}
              style={[
                styles.genresBtn,
                {
                  backgroundColor:
                    item.id === genresSelected.id ? '#EC2626' : '#000',
                },
              ]}>
              <Text style={styles.genresText}>{item.name}</Text>
            </Pressable>
          )}
          keyExtractor={item => String(item.id)}
          horizontal={true}
        />
      </View>
      <FlatList
        numColumns={4}
        contentContainerStyle={styles.contentContainerStyle}
        data={
          genresSelected.id === 'Popular' ? dataMidiaPopular : dataMidiaGenres
        }
        keyExtractor={item => String(item.id)}
        onEndReached={
          genresSelected.id === 'Popular'
            ? nextPageDataPopular
            : nextPageDataGenres
        }
        onEndReachedThreshold={0.1}
        ListFooterComponent={<Loading load={loading} />}
        renderItem={({item}) => (
          <Midia
            {...item}
            navigation={navigation}
            rating={item.vote_average}
            rated={true}
            stack={route.name === 'HomeMovie' ? 'MoviePage' : 'SeriePage'}
          />
        )}
      />
    </View>
  ) : (
    <Load />
  );
};

export default Home;
