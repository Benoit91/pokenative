import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Pokemon() {
    const params = useLocalSearchParams()
    return <View style={styles.text}>
            <Text>Pokemon {params.id}</Text>
        </View>
}

const styles = StyleSheet.create({
  text: {
    marginTop: 40
  }
});