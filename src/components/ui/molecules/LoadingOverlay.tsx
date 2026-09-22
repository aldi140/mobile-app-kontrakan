import { colors } from "@/constants/color";
import { ActivityIndicator, View } from "react-native";

export const LoadingOverlay = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
      }}
    >
      <ActivityIndicator size="large" color={colors.primary[600]} />
    </View>
  );
};
