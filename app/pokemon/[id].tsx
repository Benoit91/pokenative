import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

export default function Pokemon() {
  const params = useLocalSearchParams() as { id: string };
  const {data:pokemon} = useFetchQuery("/pokemon/[id]", {id: params.id})
  return (
    <RootView>
      <Row style={styles.header}>
        <Pressable onPress={router.back}>
          <Row gap={8}>
          <Image source={require("@/assets/images/back.png")} width={32} height={32} />
          <ThemedText color="grayWhite" variant="headline">
              {pokemon?.name}
          </ThemedText>
          </Row >
          </Pressable>
        <ThemedText color="grayWhite" variant="subtitle2">#{params.id.padStart(3, '0')}</ThemedText>
        </Row>
        </RootView>)
}

const styles = StyleSheet.create({
  text: {
    marginTop: 40
  },
  header: {
    margin: 20,
    justifyContent: 'space-between',
    paddingTop: 24
  }
});