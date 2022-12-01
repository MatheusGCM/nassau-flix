import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  containerSucess: {
    width: '85%',
    height: 166,
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingTop: 29,
  },
  modalbackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  textSucess: {
    fontFamily: 'OpenSans-Bold',
    color: '#000',
    fontSize: 14,
    marginTop: 17,
  },
  btnOk: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 83,
    height: 22,
    borderRadius: 5,
    backgroundColor: '#000',
    marginTop: 21,
  },
  textOk: {
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-Bold',
    fontSize: 10,
    color: '#fff',
  },
});

export default styles;
