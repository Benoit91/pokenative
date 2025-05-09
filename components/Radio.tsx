import { useThemeColors } from "@/hooks/useThemeColors";
import { StyleSheet, View } from "react-native";

// Props du composant :
// - `checked` : indique si le bouton est sélectionné ou non
type Props = {
  checked: boolean;
};

/**
 * Composant `Radio` :
 * - Affiche un bouton radio stylisé
 * - Le contour est toujours visible
 * - Si `checked` est vrai, on affiche un cercle intérieur coloré
 */
export function Radio({ checked }: Props) {
  const colors = useThemeColors();

  return (
    <View style={[styles.radio, { borderColor: colors.tint }]}>
      {/* Cercle intérieur uniquement visible si sélectionné */}
      {checked && (
        <View style={[styles.radioInner, { backgroundColor: colors.tint }]} />
      )}
    </View>
  );
}

// Styles du bouton radio
const styles = StyleSheet.create({
  radio: {
    width: 14,
    height: 14,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 14, // cercle extérieur
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    borderRadius: 6, // cercle intérieur
    width: 6,
    height: 6,
  },
});
