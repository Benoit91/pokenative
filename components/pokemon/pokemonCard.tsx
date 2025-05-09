import { getPokemonArtwork } from "@/functions/pokemon";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import {
    Image,
    Pressable,
    StyleSheet,
    View,
    ViewStyle
} from "react-native";
import { Card } from "../card";
import ThemedText from "../ThemedText";

// Props attendues pour une carte de Pokémon :
// - `style` : style externe appliqué à la carte (utile pour la grille)
// - `id` : identifiant du Pokémon
// - `name` : nom du Pokémon
type Props = {
  style: ViewStyle;
  id: number;
  name: string;
};

/**
 * Composant `PokemonCard` :
 * - Affiche une carte cliquable d’un Pokémon avec son image, nom et numéro
 * - Utilise `expo-router` pour naviguer vers le détail (`/pokemon/[id]`)
 * - Affiche une ombre de fond et utilise un effet ripple sur Android
 */
export function PokemonCard({ style, id, name }: Props) {
  const colors = useThemeColors();

  return (
    // `Link asChild` permet à `Pressable` d'agir comme lien
    <Link href={{ pathname: "/pokemon/[id]", params: { id: id } }} asChild>
      <Pressable
        style={style}
        android_ripple={{ color: colors.tint, foreground: true }}
      >
        {/* Carte avec numéro, image et nom */}
        <Card style={[styles.card]}>
          <ThemedText
            style={styles.id}
            variant="caption"
            color="grayMedium"
          >
            #{id.toString().padStart(3, "0")}
          </ThemedText>

          {/* Ombre douce sous l'image */}
          <View
            style={[styles.shadow, { backgroundColor: colors.grayBackground }]}
          />

          {/* Illustration du Pokémon */}
          <Image
            source={{ uri: getPokemonArtwork(id) }}
            width={72}
            height={72}
          />

          {/* Nom du Pokémon */}
          <ThemedText>{name}</ThemedText>
        </Card>
      </Pressable>
    </Link>
  );
}

// Styles de la carte Pokémon
const styles = StyleSheet.create({
  card: {
    position: "relative",
    alignItems: "center",
    padding: 4,
  },
  id: {
    alignSelf: "flex-end",
  },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
  },
});
