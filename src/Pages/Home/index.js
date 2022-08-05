import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Movies from '../../Components/Movies';
import styles from './style';
import {getAccount, getMovies} from '../../service/api';
import {Context} from '../../context';
import Loading from '../../Components/Loading';

const Home = ({navigation, route}) => {
  const {id} = useContext(Context);

  const [page, setPage] = useState(1);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [dataMovies, setDataMovies] = useState([]);
  const getResponseMovies = async () => {
    if (loading) {
      return;
    }
    setLoading(true);

    const response = await getMovies(page);
    setDataMovies([...dataMovies, ...response.data.results]);
    setPage(page + 1);
    setLoading(false);
  };
  useEffect(() => {
    const getResponseAccount = async () => {
      const response = await getAccount(id);
      setUser(response.data);
    };
    getResponseAccount();
  }, [id]);

  useEffect(() => {
    getResponseMovies();
  }, []);

  return user && dataMovies ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.header_title}>Olá,</Text>
          <Text style={styles.header_label}>{user.name}</Text>
          <Text style={styles.header_text}>!</Text>
        </View>
        <Text style={styles.header_description}>
          Reveja ou acompanhe os filmes que você assistiu...
        </Text>
      </View>
      <View style={styles.container_header}>
        <Text style={styles.title}>Filmes populares este mês</Text>
      </View>
      <FlatList
        numColumns={4}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        data={dataMovies}
        keyExtractor={item => String(item.id)}
        onEndReached={getResponseMovies}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<Loading load={loading} />}
        renderItem={({item}) => (
          <Movies
            text={`${item.vote_average}/10`}
            poster_path={item.poster_path}
            onPress={() =>
              navigation.navigate('MoviePage', {
                id: item.id,
              })
            }
          />
        )}
      />
    </View>
  ) : (
    <ActivityIndicator size={50} color="red" />
  );
};

export default Home;
