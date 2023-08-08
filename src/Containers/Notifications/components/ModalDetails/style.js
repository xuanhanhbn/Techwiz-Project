import { StyleSheet } from 'react-native';
import { Colors } from '@/Theme/Variables';

export const styles = StyleSheet.create({
  btnDelete: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    borderRadius: 8,
    paddingVertical: 20,
    textAlign: 'center',
  },
  btnCancel: {
    backgroundColor: '#FFF7F5',
    borderRadius: 8,
    paddingVertical: 20,
    textAlign: 'center',
    color: Colors.primary,
    marginVertical: 20,
  },
});
