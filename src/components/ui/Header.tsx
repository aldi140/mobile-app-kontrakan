import { colors } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { Text } from "./atoms/Text";

interface HeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header = ({
  title,
  description,
  showBack = false,
  onBack,
}: HeaderProps) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    router.back();
  };
  return (
    <View
      style={{
        backgroundColor: colors.white,
        padding: 16,
        borderBottomColor: colors.borderLight,
        borderBottomWidth: 1,
        gap: 24,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
        }}
      >
        {showBack && (
          <Pressable
            onPress={handleBack}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
              borderWidth: 1,
              borderColor: colors.borderLight,
            }}
          >
            <Ionicons
              name="chevron-back-outline"
              size={20}
              color={colors.foreground}
            />
          </Pressable>
        )}
        <View>
          <Text
            variant="neutral"
            size="sm"
            weight="semibold"
          >
            {title}
          </Text>
          {description && (
            <Text variant="muted" size="xs">
              {description}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};
