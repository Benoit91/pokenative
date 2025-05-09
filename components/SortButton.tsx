import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRef, useState } from "react";
import { Dimensions, Image, Modal, Pressable, StyleSheet, View } from "react-native";
import { Card } from "./card";
import { Radio } from "./Radio";
import { Row } from "./Row";
import ThemedText from "./ThemedText";

// Props attendues : valeur actuelle du tri, et callback pour changer cette valeur
type Props = {
  value: "id" | "name";
  onChange: (v: "id" | "name") => void;
};

// Options disponibles pour le tri (ordre fixe, label + valeur)
const options = [
  {
    label: "Number",
    value: "id",
  },
  {
    label: "Name",
    value: "name",
  },
] as const;

/**
 * Composant de bouton de tri :
 * - Affiche une icône (numérique ou alphabétique)
 * - Ouvre un modal positionné dynamiquement sous le bouton
 * - Permet de sélectionner un critère de tri (id ou name)
 */
export function SortButton({ value, onChange }: Props) {
  const buttonRef = useRef<View>(null); // Référence au bouton pour connaître sa position à l'écran
  const colors = useThemeColors();
  const [isModalVisible, setModalVisibility] = useState(false); // Affichage du popup
  const [position, setPosition] = useState<null | { top: number; right: number }>(null); // Position dynamique du modal

  // Gestion de l'ouverture du modal : calcule la position du bouton
  const onButtonPress = () => {
    buttonRef.current?.measureInWindow((x, y, width, height) => {
      setPosition({
        top: y + height,
        right: Dimensions.get("window").width - x - width,
      });
      setModalVisibility(true);
    });
  };

  const onClose = () => {
    setModalVisibility(false);
  };

  return (
    <>
      {/* Bouton flottant d’ouverture */}
      <Pressable onPress={onButtonPress}>
        <View
          ref={buttonRef}
          style={[styles.button, { backgroundColor: colors.grayWhite }]}
        >
          <Image
            source={
              value === "id"
                ? require("@/assets/images/number.png")
                : require("@/assets/images/alpha.png")
            }
            width={16}
            height={16}
          />
        </View>
      </Pressable>

      {/* Modal de sélection */}
      <Modal
        animationType="fade"
        transparent
        visible={isModalVisible}
        onRequestClose={onClose}
      >
        {/* Zone cliquable pour fermer le modal */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        {/* Contenu du popup (positionné dynamiquement) */}
        <View
          style={[styles.popup, { backgroundColor: colors.tint, ...position }]}
        >
          <ThemedText style={styles.title} variant="subtitle2" color="grayWhite">
            Sort by :
          </ThemedText>
          <Card style={styles.card}>
            {options.map((o) => (
              // eslint-disable-next-line react/jsx-key
              <Pressable onPress={() => onChange(o.value)}>
                <Row key={o.value} gap={8}>
                  <Radio checked={o.value === value} />
                  <ThemedText>{o.label}</ThemedText>
                </Row>
              </Pressable>
            ))}
          </Card>
        </View>
      </Modal>
    </>
  );
}

// Styles associés au bouton, au modal et à ses composants internes
const styles = StyleSheet.create({
  button: {
    width: 32,
    height: 32,
    borderRadius: 32,
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)", // fond semi-transparent derrière le popup
  },
  popup: {
    position: "absolute",
    padding: 4,
    paddingTop: 16,
    gap: 16,
    borderRadius: 12,
    ...Shadows.dp2, // ombre du popup
  },
  title: {
    paddingLeft: 20,
  },
  card: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
});
