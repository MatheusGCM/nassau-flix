import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import styles from './styles';

const ModalTrailer = ({visible, exit, trailer, loading}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={exit}
      statusBarTranslucent={true}>
      <TouchableWithoutFeedback onPress={exit} touchSoundDisabled>
        <View style={styles.containerExit} />
      </TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        {loading ? (
          <ActivityIndicator color={'#EC2626'} size="large" />
        ) : (
          <>
            {trailer ? (
              <YoutubePlayer
                width={'100%'}
                height={'100%'}
                play={false}
                videoId={trailer.key}
              />
            ) : (
              <Text
                style={{
                  color: '#fff',
                  fontSize: 15,
                  fontWeight: '700',
                  marginEnd: 5,
                  fontFamily: 'OpenSans-Bold',
                }}>
                Não há trailer disponivel!!
              </Text>
            )}
          </>
        )}
      </View>
      <TouchableWithoutFeedback onPress={exit} touchSoundDisabled>
        <View style={styles.containerExit} />
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalTrailer;
