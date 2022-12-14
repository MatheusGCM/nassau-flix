import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    marginLeft: 14,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'OpenSans-Regular',
  },
  genresBtn: {
    padding: 8,
    marginEnd: 7,
    borderRadius: 50,
    borderColor: '#EC2626',
    borderWidth: 1,
  },
  genresText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
  },
  contentContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
