import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'column',
    margin: 16,
    padding: 10,
  },
  header_title: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
    marginEnd: 4,
  },
  header_label: {
    fontSize: 18,
    color: '#E9A6A6',
    fontFamily: 'OpenSans-Bold'
  },
  header_text: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'OpenSans-Bold',
  },
  header_description: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '400',
    fontFamily: 'OpenSans-Regular',
  },
  container_header: {
    marginBottom: 20,
    marginVertical: 10,
    margin: 16,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'OpenSans-Regular'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
