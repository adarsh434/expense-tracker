import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GlobalStyles} from '../../config/styles';

function LoadingOverlay() {
  return (
    <View style={styles.contianer}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}
export default LoadingOverlay;

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
