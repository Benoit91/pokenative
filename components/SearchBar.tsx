import { useThemeColors } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TextInput } from "react-native";
import { Row } from "./Row";

// Props attendues par la SearchBar :
// - `value` : texte actuellement saisi
// - `onChange` : fonction appelée à chaque modification de l’input
type Props = {
  value: string;
  onChange: (s: string) => void;
};

/**
 * Composant SearchBar :
 * - Affiche une barre de recherche avec une icône
 * - Permet la saisie d’un texte (contrôlé par `value`)
 * - Appelle `onChange` à chaque modification
 */
export function SearchBar({ value, onChange }: Props) {
  const colors = useThemeColors();

  return (
    <Row
      gap={8}
      style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}
    >
      {/* Icône de loupe */}
      <Image
        source={require("@/assets/images/search.png")}
        width={16}
        height={16}
      />

      {/* Champ de saisie contrôlé */}
      <TextInput
        style={styles.input}
        onChangeText={onChange}
        value={value}
      />
    </Row>
  );
}

// Styles de la SearchBar
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 32,
  },
  input: {
    flex: 1,
    fontSize: 10,
    lineHeight: 16,
    color: "#212121",      // texte noir
    paddingVertical: 4,
  },
});
