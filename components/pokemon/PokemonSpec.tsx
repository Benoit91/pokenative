import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    View,
    type ViewProps
} from "react-native";
import { Row } from "../Row";
import ThemedText from "../ThemedText";

// Props du composant PokemonSpec :
// - `title` : valeur principale à afficher (ex: "6.9kg")
// - `description` : étiquette secondaire (ex: "Weight")
// - `image` : icône associée (optionnelle)
type Props = ViewProps & {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
};

/**
 * Composant `PokemonSpec` :
 * - Affiche une statistique spécifique d’un Pokémon (poids, taille, etc.)
 * - Affiche une icône + valeur principale + description
 * - Peut être utilisé dans une ligne de 2 ou 3 blocs côte à côte
 */
export function PokemonSpec({
  style,
  image,
  title,
  description,
  ...rest
}: Props) {
  return (
    <View style={[style, styles.root]} {...rest}>
      {/* Ligne avec image et valeur */}
      <Row style={styles.row}>
        {image && <Image source={image} width={16} height={16} />}
        <ThemedText>{title}</ThemedText>
      </Row>

      {/* Description en petit texte */}
      <ThemedText variant="caption" color="grayMedium">
        {description}
      </ThemedText>
    </View>
  );
}

// Styles du bloc de statistique
const styles = StyleSheet.create({
  root: {
    flex: 1,
    gap: 4,
    alignItems: "center",
  },
  row: {
    height: 32,
    alignItems: "center",
  },
});
