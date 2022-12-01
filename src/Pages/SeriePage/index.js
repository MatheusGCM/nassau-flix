import React, {useContext, useEffect, useState} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';
import styles from './style';
import {
  getSeriesDetails,
  getAccountStates,
  rate,
  unmarkFavorite,
  markFavorite,
  getVideo,
  getProviders,
} from '../../service/api';
import Icon from 'react-native-vector-icons/AntDesign';
import Load from '../../Components/Load';
import * as Animatable from 'react-native-animatable';
import Season from '../../Components/Season';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Context} from '../../context';
import ModalRating from '../../Components/ModalRating';
import ButtonFavorite from '../../Components/ButtonFavorite';
import ButtonGoBack from '../../Components/ButtonGoBack';
import ModalTrailer from '../../Components/ModalTrailer';

const SeriePage = ({route, navigation}) => {
  const {id, user, udapte, setUpdate} = useContext(Context);

  const [seriesDetails, setSeriesDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [seasonNumber, setSeasonNumber] = useState();
  const [seasonSelected, setSeasonSelected] = useState();

  const [modalVisible, setModalVisible] = useState(false);
  const [rated, setRated] = useState();
  const [rating, setRating] = useState(0);

  const [fav, setFav] = useState();
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const [modalTrailerVisible, setModalTrailerVisible] = useState(false);
  const [loadingTrailer, setLoadingTrailer] = useState(false);
  const [trailer, setTrailer] = useState([]);
  const [dataStreaming, setDataStreaming] = useState([]);

  useEffect(() => {
    getResponseSeriesDetails();
    getResponseFavorite();
    getResponseRated();
    getStreaming();
  }, []);

  useEffect(() => {
    getResponseRated();
  }, [udapte]);

  const getResponseSeriesDetails = async () => {
    try {
      setLoading(true);
      const {data} = await getSeriesDetails(route.params.id);
      setSeriesDetails(data);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoading(false);
    }
  };

  const getResponseFavorite = async () => {
    try {
      setLoadingFavorite(true);
      const {data} = await getAccountStates('tv', route.params.id, id);
      setFav(data.favorite);
    } catch (error) {
      console.warn(error);
    } finally {
      setLoadingFavorite(false);
    }
  };

  const getResponseRated = async () => {
    try {
      const {data} = await getAccountStates('tv', route.params.id, id);
      setRated(data.rated.value);
    } catch (error) {
      console.warn(error);
    }
  };

  const favorite = async () => {
    try {
      if (fav) {
        setFav(false);
        await unmarkFavorite(user.id, id, 'tv', route.params.id);
      } else {
        setFav(true);
        await markFavorite(user.id, id, 'tv', route.params.id);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const rateSeries = async () => {
    await rate('tv', route.params.id, id, rating);
    setUpdate(!udapte);
  };

  const getTrailer = async () => {
    try {
      setModalTrailerVisible(true);
      setLoadingTrailer(true);
      const {data} = await getVideo(route.params.id, 'tv');
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
      const {data} = await getProviders(route.params.id, 'tv');
      setDataStreaming(data.results.BR);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return !loading ? (
    <View style={styles.container}>
      <ImageBackground
        style={styles.flex1}
        source={{
          uri: `http://image.tmdb.org/t/p/original/${seriesDetails.backdrop_path}`,
        }}>
        <View style={styles.btnsContainer}>
          <ButtonGoBack navigation={navigation} SeriePage={true} />
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
                uri: `http://image.tmdb.org/t/p/original/${seriesDetails.poster_path}`,
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
            setRating={value => setRating(value)}
            rate={rateSeries}
          />

          <View style={styles.flex1}>
            <View style={styles.contentHeaderTop}>
              <Text style={styles.titleMovie}>{seriesDetails.name}</Text>
              <Text style={styles.yearMovie}>
                {new Date(seriesDetails.first_air_date).getFullYear()}
              </Text>
              <View style={styles.boxDirectorMovie}>
                <Text style={styles.directorMovie}>Criado por</Text>
                <Text style={styles.directorMovie.director}>
                  {seriesDetails.created_by
                    ? seriesDetails?.created_by[0]?.name
                    : 'Desconhecido'}
                </Text>
              </View>
            </View>

            <View style={styles.contentHeaderBottom}>
              <Text style={styles.voteAverageMovie}>
                {seriesDetails.vote_average?.toFixed(1)} / 10
              </Text>
              <View style={styles.boxPopularityMovie}>
                <Animatable.View
                  animation="pulse"
                  easing="ease-out"
                  iterationCount="infinite">
                  <Icon name="heart" color={'#EC2626'} size={22} />
                </Animatable.View>

                <Text style={styles.popularityMovie}>
                  {seriesDetails.popularity >= 1000
                    ? `${(seriesDetails.popularity / 1000)?.toFixed(0)}K`
                    : seriesDetails.popularity?.toFixed()}
                </Text>
              </View>
            </View>
            {dataStreaming && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 5,
                  marginBottom: 10,
                  alignItems: 'center',
                }}>
                {dataStreaming?.flatrate?.map(item => (
                  <Image
                    key={String(item.provider_id)}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 7,
                      marginEnd: 5,
                      borderWidth: 1,
                      borderColor: 'rgba(255,255,255,0.2)',
                    }}
                    source={{
                      uri: `http://image.tmdb.org/t/p/original/${item.logo_path}`,
                    }}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
        <ScrollView>
          <View>
            <Text style={styles.taglineMovie}>
              {seriesDetails.tagline ? seriesDetails.tagline : 'Sinopse:'}
            </Text>
            <ScrollView style={styles.contentOverview}>
              <Text style={styles.overviewMovie}>
                {seriesDetails.overview
                  ? seriesDetails.overview
                  : 'Sem descrição...'}
              </Text>
            </ScrollView>
          </View>
          <View>
            {seriesDetails?.seasons?.map((item, index) => (
              <Season
                {...item}
                key={String(item.id)}
                id={route.params.id}
                visible={visible}
                index={index}
                seasonNumber={seasonNumber}
                seasonSelected={seasonSelected}
                onPress={() => {
                  setVisible(!visible);
                  setSeasonNumber(item.season_number);
                  setSeasonSelected(item.season_number);
                }}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  ) : (
    <Load />
  );
};

export default SeriePage;
