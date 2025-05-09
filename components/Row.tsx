import {
    View,
    type ViewProps,
    type ViewStyle
} from "react-native";

// Props étendues de ViewProps avec une option supplémentaire :
// - `gap` : espace horizontal entre les enfants du Row
type Props = ViewProps & {
  gap?: number;
};

/**
 * Composant `Row` :
 * - Rendu simplifié d’un `View` en ligne (`flexDirection: row`)
 * - Aligne les enfants au centre verticalement
 * - Accepte un `gap` (espacement horizontal entre les éléments)
 * - Tous les autres props de `View` sont autorisés (style, onPress, etc.)
 */
export function Row({ style, gap, ...rest }: Props) {
  return (
    <View
      style={[
        rowStyle, // style de base (ligne horizontale)
        style,    // styles personnalisés éventuels
        gap ? { gap: gap } : undefined // application du gap si fourni
      ]}
      {...rest}
    />
  );
}

// Style de base du Row : disposition en ligne et alignement vertical centré
const rowStyle = {
  flex: 0,
  flexDirection: 'row',
  alignItems: "center"
} satisfies ViewStyle;
