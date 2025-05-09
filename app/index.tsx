import { Card } from '@/components/card';
import { PokemonCard } from '@/components/pokemon/pokemonCard';
import { RootView } from '@/components/RootView';
import { Row } from '@/components/Row';
import { SearchBar } from '@/components/SearchBar';
import { SortButton } from '@/components/SortButton';
import { getPokemonId } from '@/functions/pokemon';
import { useInfiniteFetchQuery, useSearchPokemon } from '@/hooks/useFetchQuery';
import { useThemeColors } from '@/hooks/useThemeColors';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Image, Platform, StatusBar, StyleSheet } from 'react-native';
import ThemedText from '../components/ThemedText';

export default function Index() {
  const colors = useThemeColors();

  const {
    data,
    isFetching,
    fetchNextPage,
  } = useInfiniteFetchQuery('/pokemon?limit=21');

  const [search, setsearch] = useState('');
  const [sortKey, setSortKey] = useState<"id" | "name">('id')
  const pokemons = data?.pages.flatMap((page: { results: any[] }) => page.results.map(r => ({ name: r.name, id: getPokemonId(r.url) }))) ?? [];
  const { data: searchedPokemon } = useSearchPokemon(search);
  const filteredPokemons = search && searchedPokemon
  ? [searchedPokemon]
  : [...pokemons].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));


  return (
    <RootView>
      <Row style={styles.header} gap= {16}>
        <Image style={styles.image} source={require("@/assets/images/pokeball.png")} width={24} height={24}  />
        <ThemedText variant="headline" color="grayLigth">Pokédex</ThemedText>
      </Row>
      <Row gap={16} style={styles.form}>
        <SearchBar value={search} onChange={setsearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>

      <Card style={styles.body}>
        <FlatList
          data={filteredPokemons}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}

          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint} /> : null
          }
          onEndReached={search ? undefined : () => {fetchNextPage();
          }}

          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              style={{ flex: 1 / 3, height: 100 }}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    </RootView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,  // affichage dynamique de la zone tampon 
  },
  header: {
    paddingHorizontal: 12,
    paddingBottom: 8,
    padding: 24
  },
  image: {
    marginTop: 12
  },
  body: {
    flex: 1,
    marginTop: 16,
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
  form: {
    paddingHorizontal: 12
  }
});
