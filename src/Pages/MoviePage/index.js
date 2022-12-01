/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState, useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import styles from './style';
import {
  getMoviesDetails,
  getMovieCredits,
  rate,
  getAccountStates,
  markFavorite,
  unmarkFavorite,
  addMovieList,
  getUserList,
  getMoviesDetailsList,
  getVideo,
  getProviders,
} from '../../service/api';
import Icon from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Cast from '../../Components/Cast';
import Load from '../../Components/Load';
import * as Animatable from 'react-native-animatable';
import ModalRating from '../../Components/ModalRating';
import {Context} from '../../context';
import ButtonFavorite from '../../Components/ButtonFavorite';
import ButtonGoBack from '../../Components/ButtonGoBack';
import ModalTrailer from '../../Components/ModalTrailer';
import ModalListSucess from '../../Components/ModalListSucess';
import ModalSalveFilme from '../../Components/ModalSalveFilme';

const MoviePage = ({route, navigation}) => {
  const {id, user, udapte, setUpdate} = useContext(Context);
  const bottomSheetRef = useRef(BottomSheet);

  const [movieDetails, setMovieDetails] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [loading, setLoading] = useState(false);

  const [fav, setFav] = useState();
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const [rated, setRated] = useState();
  const [rating, setRating] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const [modalTrailerVisible, setModalTrailerVisible] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [trailer, setTrailer] = useState([]);

  const [dataStreaming, setDataStreaming] = useState();

  const [value, setValue] = useState(0);
  const [modalVisibleSucess, setModalVisibleSucess] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selected, setSelected] = useState(false);
  const [listSelected, setListSelected] = useState(true);
  const [tratColor] = useState(new Animated.Value(0));

  useEffect(() => {
    getResponseMovieDetails();
    getResponseMovieCredits();
    getResponseFavorite();
    getResponseRated();
    getResponseListMovies();
    getStreaming();
  }, []);

  useEffect(() => {
    getResponseRated();
  }, [udapte]);

  const getResponseMovieDetails = async () => {
    try {
      setLoading(true);
      const {data} = await getMoviesDetails(route.params.id);
      setMovieDetails(data);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const getResponseMovieCredits = async () => {
    try {
      setLoading(true);
      const {data} = await getMovieCredits(route.params.id);
      setMovieCredits(data.cast.slice(0, 10));
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const getResponseFavorite = async () => {
    try {
      setLoadingFavorite(true);
      const {data} = await getAccountStates('movie', route.params.id, id);
      setFav(data.favorite);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoadingFavorite(false);
    }
  };

  const getResponseRated = async () => {
    try {
      const {data} = await getAccountStates('movie', route.params.id, id);
      setRated(data.rated.value);
    } catch (error) {
      console.warn(error);
    }
  };

  const getResponseListMovies = async () => {
    const {data} = await getUserList(user.id, id);
    setUserList(data.results);
  };

  const favorite = async () => {
    try {
      if (fav) {
        setFav(false);
        await unmarkFavorite(user.id, id, 'movie', route.params.id);
      } else {
        setFav(true);
        await markFavorite(user.id, id, 'movie', route.params.id);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const rateMovie = async () => {
    await rate('movie', route.params.id, id, rating);
    setUpdate(!udapte);
  };

  const getResponseAddMovie = async () => {
    if (value > 0) {
      const responseDetailsList = await getMoviesDetailsList(value);
      if (
        responseDetailsList.data.items.find(item => item.id === route.params.id)
      ) {
        setSelected(true);
      } else {
        await addMovieList(id, route.params.id, value);
        setModalVisibleSucess(true);
        setSelected(false);
      }
    } else {
      setListSelected(false);
    }
  };

  const getTrailer = async () => {
    try {
      setModalTrailerVisible(true);
      setLoadingTrailer(true);
      const {data} = await getVideo(route.params.id, 'movie');
      setTrailer(data.results[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTrailer(false);
    }
  };

  const getStreaming = async () => {
    try {
      setLoading(true);
      const {data} = await getProviders(route.params.id, 'movie');
      setDataStreaming(data.results.BR);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  function handleOpen() {
    bottomSheetRef.current?.expand();
  }

  function handleClose() {
    bottomSheetRef.current?.close();
    Animated.timing(tratColor, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setValue(0);
      setSelected(false);
    });
  }

  const Directing = movieCredits.crew?.find(
    element => element.job === 'Director',
  )?.name;

  return !loading ? (
    <View style={styles.container}>
      <ImageBackground
        style={styles.flex1}
        source={{
          uri: `http://image.tmdb.org/t/p/original/${movieDetails.backdrop_path}`,
        }}>
        <View style={styles.btnsContainer}>
          <ButtonGoBack navigation={navigation} />
          <ButtonFavorite
            onPress={favorite}
            favorite={fav}
            loading={loadingFavorite}
          />
        </View>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Pressable onPress={getTrailer}>
            <Image
              style={styles.posterMovie}
              source={{
                uri: `http://image.tmdb.org/t/p/original/${movieDetails.poster_path}`,
              }}
            />
            <EvilIcons
              name="play"
              size={50}
              color="#fff"
              style={{position: 'absolute', left: 35, top: 20}}
            />
            <ModalTrailer
              visible={modalTrailerVisible}
              exit={() => setModalTrailerVisible(false)}
              trailer={trailer}
              loading={loadingTrailer}
            />
          </Pressable>
          {rated ? (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.rated}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text style={styles.rated.text}>
                Sua nota: {rated === 10 ? rated : rated?.toFixed(1)}/10
              </Text>

              <View style={styles.icon}>
                <EvilIcons name="pencil" size={10} />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.rate}
              onPress={() => {
                setModalVisible(true);
              }}>
              <Text style={styles.rate.text}>Avalie agora</Text>
            </TouchableOpacity>
          )}

          <ModalRating
            modalVisible={modalVisible}
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            rating={rating}
            setRating={v => setRating(v)}
            rate={rateMovie}
          />

          <View style={styles.flex1}>
            <View style={styles.contentHeaderTop}>
              <Text style={styles.titleMovie}>{movieDetails.title}</Text>
              <Text style={styles.yearMovie}>
                {new Date(movieDetails.release_date).getFullYear()}
              </Text>
              <Text style={styles.timeMovie}>{movieDetails.runtime} min</Text>
              {Directing && (
                <View style={styles.boxDirectorMovie}>
                  <Text style={styles.directorMovie}>Direção por</Text>
                  <Text style={styles.directorMovie.director}>{Directing}</Text>
                </View>
              )}
            </View>

            <View style={styles.contentHeaderBottom}>
              <Text style={styles.voteAverageMovie}>
                {movieDetails.vote_average?.toFixed(1)} / 10
              </Text>
              <View style={styles.boxPopularityMovie}>
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite">
                  <Icon name="heart" color={'#EC2626'} size={22} />
                </Animatable.View>

                <Text style={styles.popularityMovie}>
                  {movieDetails.popularity >= 1000
                    ? `${(movieDetails.popularity / 1000)?.toFixed(0)}K`
                    : movieDetails.popularity?.toFixed()}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={handleOpen}
                style={styles.containerAdd}>
                <View style={styles.btnAddList}>
                  <MaterialIcons
                    name="add"
                    size={22}
                    color="#000"
                    backgroundStyle="#fff"
                  />
                </View>
                <Text style={styles.textAddList}>Adicionar a uma lista</Text>
              </TouchableOpacity>
              {dataStreaming && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 7,
                      marginEnd: 5,
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.2)',
                    }}
                    source={{
                      uri: `http://image.tmdb.org/t/p/original/${
                        dataStreaming.flatrate
                          ? dataStreaming.flatrate[0].logo_path
                          : dataStreaming.buy[0].logo_path
                      }`,
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={styles.contentOverview}>
            <Text style={styles.taglineMovie}>
              {movieDetails.tagline ? movieDetails.tagline : 'Sinopse:'}
            </Text>
            <Text style={styles.overviewMovie}>
              {movieDetails.overview
                ? movieDetails.overview
                : 'Sem descrição...'}
            </Text>
          </View>
          <View style={styles.boxElenco}>
            <Text style={styles.txtBoxElenco}>Elenco</Text>
          </View>
          <View style={styles.line} />
          {movieCredits.map((item, i) => (
            <Cast key={i} {...item} />
          ))}
        </ScrollView>
      </View>
      <ModalSalveFilme
        bottomSheetRef={bottomSheetRef}
        onExit={handleClose}
        value={value}
        onValueChange={newValue => {
          setValue(newValue);
          setListSelected(true);
        }}
        userList={userList}
        navigation={navigation}
        selected={selected}
        listSelected={listSelected}
        onPress={getResponseAddMovie}
      />
      <ModalListSucess
        modalVisibleSucess={modalVisibleSucess}
        onPress={() => {
          setModalVisibleSucess(false);
          setUpdate(!udapte);
        }}
      />
    </View>
  ) : (
    <Load />
  );
};

export default MoviePage;
