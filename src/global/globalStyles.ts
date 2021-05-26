import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#6548A3',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
});
