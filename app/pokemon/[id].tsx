import { Card } from "@/components/card";
import { PokemonSpec } from "@/components/pokemon/PokemonSpec";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { PokemonType } from "@/components/pokemon/PokemonType";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import ThemedText from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { formatWeight, getPokemonArtwork } from "@/functions/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, View } from "react-native";


export default function Pokemon() {
  const colors = useThemeColors()
  const params = useLocalSearchParams() as { id: string };
  const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
  const { data: species } = useFetchQuery("/pokemon-species/[id]", { id: params.id });
  const mainType = pokemon?.types?.[0]?.type?.name?.toLowerCase();
const colorType = mainType && Colors.type[mainType] ? Colors.type[mainType] : colors.tint;

  const types = pokemon?.types ?? [];
  const bio = species?.flavor_text_entries?.find(({ language }) => language.name === 'en')?.flavor_text.replaceAll("\n", " .");

  return (
    <RootView backgroundColor={colorType}>
        <Image style={styles.pokeball} source={require("@/assets/images/Pokeball_big.png")} width={208} height={208}/>
      <Row style={styles.header}>
        
        <Pressable onPress={router.back}>
          <Row gap={8}>
          <Image source={require("@/assets/images/back.png")} width={32} height={32} />
          <ThemedText color="grayWhite" variant="headline" style={{textTransform: "capitalize"}}>
              {pokemon?.name}
          </ThemedText>
          </Row >
          </Pressable>
        <ThemedText color="grayWhite" variant="subtitle2">#{params.id.padStart(3, '0')}</ThemedText>
      </Row>
      <View style={styles.body}>
        <Image style={styles.artwork}
                    source={{ uri: getPokemonArtwork(params.id) }}
                    width={200}
                    height={200}
        />
      <Card style={styles.card}>
          <Row gap={16}>
            {types.map(type => <PokemonType name={type.type.name} key={type.type.name}/>)}
          </Row>
          {/* About*/}
          <ThemedText variant="subtitle1" style={{ color: colorType }}>About</ThemedText>
          <Row>
            <PokemonSpec style={{ borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLigth }} title={formatWeight(pokemon?.weight)} description="Weight" image={require("@/assets/images/weight.png")} />
            <PokemonSpec style={{ borderStyle: "solid", borderRightWidth: 1, borderColor: colors.grayLigth }} title={formatWeight(pokemon?.height)} description="Size" image={require("@/assets/images/straighten.png")} />
            <PokemonSpec title={pokemon?.moves.slice(0, 2).map(m => m.move.name).join('\n')} description="Moves" />
          </Row>
          <ThemedText>{bio}</ThemedText>
          {/* Stats*/}
          <ThemedText variant="subtitle1" style={{ color: colorType }}>Base Stats</ThemedText>
          <View style={{ alignSelf: 'stretch' }}>
            {pokemon?.stats.map(stat => <PokemonStat key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={colorType} />)}
            
          </View>
        </Card>
      </View>
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
  },
  artwork: {
    alignSelf: "center",
    position: 'absolute',
    marginTop: -140,
    zIndex: 2
  },
  body: {
    marginTop: 144
  },
  card: {
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom:20,
    gap: 16,
    alignItems: "center"
  }
});