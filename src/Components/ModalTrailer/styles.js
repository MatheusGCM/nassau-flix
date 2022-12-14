import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerExit: {
    flex: 1.2,
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 230,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  modalTxtHeader: {
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 21,
    color: '#000',
    marginBottom: 17,
  },
  modalTxtMid: {
    fontSize: 13,
    fontFamily: 'OpenSans-Regular',
    lineHeight: 20,
    color: '#969696',
    marginBottom: 35,
  },
  modalContainerFooter: {
    alignItems: 'center',
  },
  modalContentFooter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn: {
    cancelar: {
      width: 85,
      height: 20,
      backgroundColor: '#000',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sim: {
      width: 85,
      height: 20,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  modalTxtFooter: {
    fontSize: 10,
    fontFamily: 'OpenSans-Bold',
    lineHeight: 15,
    color: '#000',
    white: {
      fontSize: 10,
      fontFamily: 'OpenSans-Bold',
      color: '#fff',
    },
  },
});

export default styles;
