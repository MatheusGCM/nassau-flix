import React from 'react';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';

const ModalListSucess = ({modalVisibleSucess, onPress}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisibleSucess}>
      <View style={styles.modalbackground}>
        <View style={styles.containerSucess}>
          <Image source={require('../../assets/check.png')} />
          <Text style={styles.textSucess}>Lista atualizada com sucesso!</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            style={styles.btnOk}>
            <Text style={styles.textOk}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalListSucess;
