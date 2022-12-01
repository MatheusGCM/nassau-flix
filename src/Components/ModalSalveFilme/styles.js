import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modalViewHeaderTitle: {
    color: '#000',
    fontSize: 13,
    fontFamily: 'OpenSans-Bold',
  },
  modalViewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  divisor: {
    width: '100%',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#BEBEBE',
  },
  btnSave: {
    alignSelf: 'center',
    alignItems: 'center',
    padding: 10,
    width: '25%',
    borderRadius: 5,
    backgroundColor: '#000',
  },
  textSave: {
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-Bold',
    fontSize: 10,
    color: '#fff',
  },

  textRadioBottom: {
    textTransform: 'uppercase',
    fontFamily: 'OpenSans-Regular',
    fontSize: 12,
    color: '#000',
  },
  radioBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  emptyTexList: {
    color: '#000',
    margin: '10%',
    fontFamily: 'OpenSans-Regular',
    fontSize: 13,
    borderRadius: 6,
  },
});

export default styles;
