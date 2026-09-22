import { colors } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Text } from "../atoms/Text";

interface AppToastProps {
  message?: string;
  type?: "success" | "error" | "info";
}

export const AppToast = ({ message, type = "success" }: AppToastProps) => {
  const config = {
    success: {
      icon: "checkmark" as const,
      backgroundColor: "#0f9f44ff",
    },

    error: {
      icon: "close" as const,
      backgroundColor: "#EF4444",
    },

    info: {
      icon: "information" as const,
      backgroundColor: "#3B82F6",
    },
  };

  const current = config[type];

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: current.backgroundColor,
          },
        ]}
      >
        <Ionicons name={current.icon} size={18} color={colors.white} />
      </View>

      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: colors.backgroundLight,

    paddingHorizontal: 16,
    paddingVertical: 14,

    borderRadius: 16,

    gap: 10,

    marginHorizontal: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 6,
  },

  iconContainer: {
    width: 28,
    height: 28,

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",
  },

  message: {
    flexShrink: 1,

    fontSize: 14,
    fontWeight: "500",

    color: colors.neutral[800],
  },
});
