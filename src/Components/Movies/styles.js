import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  image: {
    width: 85,
    height: 135,
    borderRadius: 10,
    marginEnd: 8,
  },
  containerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginBottom: 28,
  },
  text: {
    fontSize: 10,
    color: '#fff',
    marginLeft: 4,
    fontFamily: 'OpenSans-Regular',
  },
});

export default styles;
