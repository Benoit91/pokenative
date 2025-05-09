import { useThemeColors } from "@/hooks/useThemeColors";
import { useEffect } from "react";
import {
    SafeAreaView,
    ViewProps,
    ViewStyle
} from "react-native";
import Animated, {
    Easing,
    interpolateColor,
    ReduceMotion,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";

// Props personnalisées pour RootView
type Props = ViewProps & {
  /**
   * Couleur de fond animée. Si non fournie, on utilise la couleur du thème.
   */
  backgroundColor?: string;

  /**
   * Contenu enfant à afficher dans la vue.
   */
  children?: React.ReactNode;
};

/**
 * Composant RootView :
 * - Encapsule une `SafeAreaView` dans une `Animated.View`
 * - Anime en douceur le changement de couleur de fond
 * - Utilise `react-native-reanimated` pour gérer l'animation
 * - S'utilise comme conteneur principal d'une page
 */
export function RootView({ style, backgroundColor, children, ...rest }: Props) {
  const colors = useThemeColors();

  // Valeur animée de progression (de 0 à 1)
  const progress = useSharedValue(0);

  // Style animé de la vue : interpoler la couleur entre la teinte par défaut et celle reçue en props
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.tint, backgroundColor ?? colors.tint],
      ),
    };
  }, [backgroundColor]);

  // Quand la couleur de fond change, on déclenche une animation fluide
  useEffect(() => {
    if (backgroundColor) {
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: 700,
        easing: Easing.out(Easing.quad),
        reduceMotion: ReduceMotion.System, // respecte les préférences d’accessibilité
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backgroundColor]);

  // Si aucune couleur fournie, on retourne simplement une SafeAreaView sans animation
  if (!backgroundColor) {
    return (
      <SafeAreaView
        style={[RootStyle, { backgroundColor: colors.tint }, style]}
        {...rest}
      >
        {children}
      </SafeAreaView>
    );
  }

  // Vue animée avec SafeAreaView imbriquée pour gérer les zones sûres (notch, etc.)
  return (
    <Animated.View style={[{ flex: 1 }, animatedStyle, style]}>
      <SafeAreaView style={RootStyle} {...rest}>
        {children}
      </SafeAreaView>
    </Animated.View>
  );
}

// Style de base de la zone principale
const RootStyle = {
  flex: 1,
  padding: 4,
} satisfies ViewStyle;
