import { colors } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Text, View } from "react-native";

type BadgeVariant = keyof typeof badgeVariants;
type IconName = ComponentProps<typeof Ionicons>["name"];
interface BadgeProps {
  title: string;
  variant?: BadgeVariant;
  icon?: IconName;
}

const badgeVariants = {
  success: {
    backgroundColor: colors.success[50],
    color: colors.success[700],
  },
  warning: {
    backgroundColor: colors.warning[50],
    color: colors.warning[700],
  },
  error: {
    backgroundColor: colors.error[50],
    color: colors.error[700],
  },
  neutral: {
    backgroundColor: colors.neutral[50],
    color: colors.neutral[700],
  },
  primary: {
    backgroundColor: colors.primary[50],
    color: colors.primary[700],
  },
  secondary: {
    backgroundColor: colors.secondary[50],
    color: colors.secondary[700],
  },
  outline: {
    backgroundColor: colors.background,
    color: colors.primary[700],
    borderWidth: 1,
    borderColor: colors.primary[700],
  },
};

export const Badge = ({ title, variant = "success", icon }: BadgeProps) => {
  const style = badgeVariants[variant];

  return (
    <View
      style={{
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 16,
        backgroundColor: style.backgroundColor,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      {icon && <Ionicons name={icon} size={16} color={style.color} />}
      <Text style={{ color: style.color, fontSize: 14, fontWeight: "800" }}>
        {title}
      </Text>
    </View>
  );
};
