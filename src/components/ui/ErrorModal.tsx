import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { Modal, StyleSheet, View } from "react-native";

interface ErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export const ErrorModal = ({ visible, message, onClose }: ErrorModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text variant="neutral" size="md" weight="bold">
            Terjadi Kesalahan
          </Text>

          <Text variant="neutral" size="sm" weight="regular">
            {message}
          </Text>

          <Button title="Tutup" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    flexDirection: "column",
    gap: 24,
    backgroundColor: "white",
    padding: 24,
    borderRadius: 20,
  },
});
