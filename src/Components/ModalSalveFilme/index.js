import React from 'react';
import {Text, TouchableOpacity, View, FlatList} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/AntDesign';
import {RadioButton} from 'react-native-paper';
import styles from './styles';

const ModalSalveFilme = ({
  bottomSheetRef,
  onExit,
  value,
  onValueChange,
  userList,
  navigation,
  selected,
  listSelected,
  onPress,
}) => {
  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={[1, 280]}>
      <View>
        <View style={styles.modalViewHeader}>
          <Text style={styles.modalViewHeaderTitle}>Salvar filme em...</Text>
          <TouchableOpacity onPress={onExit}>
            <Icon name="close" color={'#000'} size={22} />
          </TouchableOpacity>
        </View>
        <View style={styles.divisor} />
        <View>
          <RadioButton.Group value={value} onValueChange={onValueChange}>
            <View style={styles.radioBottomRow}>
              <FlatList
                data={userList}
                keyExtractor={item => String(item.id)}
                style={{height: 125}}
                ListEmptyComponent={
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('profileScreen', {
                        screen: 'ListPage',
                      })
                    }>
                    <Text style={styles.emptyTexList}>
                      Para adicionar um filme você precisar criar uma lista
                      primeiro. Clique aqui para criar uma lista!
                    </Text>
                  </TouchableOpacity>
                }
                renderItem={({item}) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <RadioButton color="#000" value={item.id} />
                    <Text style={styles.textRadioBottom}>{item.name}</Text>
                  </View>
                )}
              />
            </View>
            <View>
              <View
                style={{
                  alignItems: 'center',
                  height: 22,
                }}>
                {!listSelected && (
                  <Text
                    style={{
                      color: '#EC2626',
                      fontFamily: 'OpenSans-Regular',
                    }}>
                    Selecione uma lista!
                  </Text>
                )}
                {selected && (
                  <Text
                    style={{
                      color: '#EC2626',
                      fontFamily: 'OpenSans-Regular',
                    }}>
                    Filme já existe na lista!
                  </Text>
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                disabled={userList.length === 0}
                style={[
                  styles.btnSave,
                  {
                    backgroundColor: userList.length === 0 ? '#C4C4C4' : '#000',
                  },
                ]}>
                <Text style={styles.textSave}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    </BottomSheet>
  );
};

export default ModalSalveFilme;
