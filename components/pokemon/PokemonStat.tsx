import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect } from "react";
import { StyleSheet, View, type ViewProps } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import { Row } from "../Row";
import ThemedText from "../ThemedText";

// Props du composant :
// - `color` : couleur principale utilisée pour la stat (barre + texte)
// - `name` : nom complet de la statistique (ex: "special-attack")
// - `value` : valeur numérique de la stat
type Props = ViewProps & {
  color: string;
  name: string;
  value: number;
};

/**
 * Fonction utilitaire pour transformer un nom de stat en abrégé lisible.
 * Exemple :
 * - "special-attack" → "SATK"
 * - "defense" → "DEF"
 */
function statShortName(name: string) {
  return name
    .replaceAll("special", "S")
    .replaceAll("-", "")
    .replaceAll("attack", "ATK")
    .replaceAll("defense", "DEF")
    .replaceAll("speed", "SPD")
    .toUpperCase();
}

/**
 * Composant `PokemonStat` :
 * - Affiche une statistique Pokémon sous forme abrégée
 * - Affiche la valeur avec une barre animée
 * - Utilise `react-native-reanimated` pour animer la largeur de la barre
 */
export function PokemonStat({ style, color, name, value, ...rest }: Props) {
  const colors = useThemeColors();

  // Valeur animée pour la partie remplie
  const sharedValue = useSharedValue(value);

  // Style animé de la barre remplie (progression)
  const barInnerStyle = useAnimatedStyle(() => {
    return {
      flex: sharedValue.value,
    };
  });

  // Style animé de la partie vide restante
  const barbackgroundStyle = useAnimatedStyle(() => {
    return {
      flex: 255 - sharedValue.value, // 255 = max stat possible
    };
  });

  // Déclenche l'animation à chaque changement de valeur
  useEffect(() => {
    sharedValue.value = withSpring(value);
  }, [value]);

  return (
    <Row gap={8} style={[styles.root, style]} {...rest}>
      {/* Nom abrégé de la stat avec une bordure à droite */}
      <View style={[styles.name, { borderColor: colors.grayLigth }]}>
        <ThemedText variant="subtitle3" style={{ color: color }}>
          {statShortName(name)}
        </ThemedText>
      </View>

      {/* Valeur affichée (formatée sur 3 chiffres) */}
      <View style={styles.number}>
        <ThemedText>{value.toString().padStart(3, "0")}</ThemedText>
      </View>

      {/* Barre de progression animée */}
      <Row style={styles.bar}>
        <Animated.View
          style={[styles.barInner, { backgroundColor: color }, barInnerStyle]}
        />
        <Animated.View
          style={[styles.barBackground, { backgroundColor: color }, barbackgroundStyle]}
        />
      </Row>
    </Row>
  );
}

// Styles utilisés pour les sections du composant
const styles = StyleSheet.create({
  root: {},

  name: {
    width: 40,
    paddingRight: 8,
    borderRightWidth: 1,
    borderStyle: "solid",
  },

  number: {
    width: 23,
  },

  bar: {
    flex: 1,
    borderRadius: 20,
    height: 4,
    overflow: "hidden",
  },

  barInner: {
    height: 4,
  },

  barBackground: {
    height: 4,
    opacity: 0.24,
  },
});
