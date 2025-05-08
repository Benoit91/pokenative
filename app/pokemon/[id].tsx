import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet } from "react-native";

export default function Pokemon() {
  const colors = useThemeColors()
  const params = useLocalSearchParams() as { id: string };
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
  const mainType = pokemon?.types?.[0].type.name
  const colorType = mainType ? Colors.type[mainType] : colors.tint;

  return (
    <RootView style={{backgroundColor: colorType}}>
        <Image style={styles.pokeball} source={require("@/assets/images/Pokeball_big.png")} width={208} height={208}/>
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
  },
  pokeball: {
    opacity: .1,
    position: "absolute",
    top: 8,
    right: 8,
    marginTop: 40,
  }
});