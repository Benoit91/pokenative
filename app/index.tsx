import { Card } from '@/components/card';
import { PokemonCard } from '@/components/pokemon/pokemonCard';
import { getPokemonId } from '@/functions/pokemon';
import { useInfiniteFetchQuery } from '@/hooks/useFetchQuery';
import { useThemeColors } from '@/hooks/useThemeColors';
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import ThemedText from '../components/ThemedText';

export default function Index() {
  const colors = useThemeColors();

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useInfiniteFetchQuery('/pokemon?limit=21');

  const pokemons = data?.pages.flatMap((page: { results: any[] }) => page.results) ?? [];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/pokeball.png")} width={24} height={24} />
        <ThemedText variant="headline" color="grayLigth">Pokédex</ThemedText>
      </View>

      <Card style={styles.body}>
        <FlatList
          data={pokemons}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          keyExtractor={(item) => item.url}
          renderItem={({ item }) => (
            <PokemonCard
              id={getPokemonId(item.url)}
              name={item.name}
              style={{ flex: 1 / 3, height: 100 }}
            />
          )}
          ListFooterComponent={
            isFetchingNextPage ? <ActivityIndicator color={colors.tint} /> : null
          }
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 12,
  },
  body: {
    flex: 1,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
});
