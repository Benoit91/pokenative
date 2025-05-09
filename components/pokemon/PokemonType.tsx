import { Colors } from "@/constants/Colors";
import { View, ViewStyle } from "react-native";
import ThemedText from "../ThemedText";

// Props attendue :
// - `name` : nom du type (ex: "fire", "water", etc.)
//   Il doit correspondre à une clé de Colors.type
type Props = {
  name: keyof typeof Colors["type"];
};

/**
 * Composant `PokemonType` :
 * - Affiche un badge coloré avec le nom du type Pokémon (ex: Fire, Grass)
 * - La couleur de fond est définie dynamiquement selon le type
 * - Le texte est en blanc et capitalisé
 */
export function PokemonType({ name }: Props) {
  return (
    <View style={[rootStyle, { backgroundColor: Colors.type[name] }]}>
      <ThemedText
        color="grayWhite"
        variant="subtitle3"
        style={{ textTransform: "capitalize" }}
      >
        {name}
      </ThemedText>
    </View>
  );
}

// Style de base du badge type
const rootStyle = {
  flex: 0, // ne prend que l’espace nécessaire
  height: 20,
  paddingHorizontal: 8,
  borderRadius: 8,
} satisfies ViewStyle;
