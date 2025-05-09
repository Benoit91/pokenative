import { Colors } from "@/constants/Colors";
import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, Text, type TextProps } from "react-native";

// Styles typographiques utilisés selon les variantes disponibles
const styles = StyleSheet.create({
  body3: {
    fontSize: 10,
    lineHeight: 16,
  },
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "bold",
    marginTop: 16,
  },
  caption: {
    fontSize: 8,
    lineHeight: 12,
  },
  subtitle1: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle2: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "bold",
  },
  subtitle3: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: "bold",
  },
});

// Props supplémentaires autorisées en plus de celles de Text
type Props = TextProps & {
  /**
   * Nom du style typographique à appliquer
   * (ex: "headline", "subtitle1", "body3", etc.)
   */
  variant?: keyof typeof styles;

  /**
   * Clé de couleur issue de Colors.light (ex: "grayDark", "tint", etc.)
   */
  color?: keyof typeof Colors["light"];
};

/**
 * Composant texte personnalisé qui applique :
 * - un style typographique (`variant`)
 * - une couleur de thème (`color`)
 * - les props standards d’un <Text />
 */
export default function ThemedText({ variant, color, style, ...rest }: Props) {
  const colors = useThemeColors(); // récupère les couleurs du thème actif

  return (
    <Text
      style={[
        styles[variant ?? "body3"],               // style typographique par défaut
        { color: colors[color ?? "grayDark"] },   // couleur par défaut si non précisée
        style                                      // styles additionnels
      ]}
      {...rest}
    />
  );
}
