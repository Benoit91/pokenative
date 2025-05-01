import { SafeAreaView, StyleSheet } from 'react-native';
import ThemedText from '../components/ThemedText';

export default function Index() {
  return (
    
    <SafeAreaView style={styles.container}>
        <ThemedText variant="headline" color="grayWhite">Pokédex</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',
    padding: 24,
  },

  text: {
    marginTop: 16
  }
});
