import { colors } from "@/constants/color";
import LottieView from "lottie-react-native";
import { View } from "react-native";
import { Button } from "./atoms/Button";
import { Text } from "./atoms/Text";

interface SuccessScreenProps {
  title: string;
  description: string;
  onClose: () => void;
}

export const SuccessScreen = ({
  title,
  description,
  onClose,
}: SuccessScreenProps) => {
  return (
    <View
      style={{
        position: "relative",
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        backgroundColor: colors.white,
      }}
    >
      <LottieView
        source={require("@/assets/animations/Done.json")}
        autoPlay
        loop={true}
        style={{
          width: 350,
          height: 350,
        }}
      />

      <Text variant="neutral" size="xl" weight="bold">
        {title}
      </Text>

      <Text
        variant="muted"
        size="sm"
        style={{
          marginTop: 8,
          textAlign: "center",
        }}
      >
        {description}
      </Text>

      <Button
        title="Tutup"
        onPress={onClose}
        variant="outline"
        size="md"
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          paddingHorizontal: 16,
          paddingTop: 24,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.white,
        }}
      />
    </View>
  );
};
