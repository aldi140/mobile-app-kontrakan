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
    borderWidth: 0,
    borderColor: "none",
  },
  warning: {
    backgroundColor: colors.warning[50],
    color: colors.warning[700],
    borderWidth: 0,
    borderColor: "none",
  },
  error: {
    backgroundColor: colors.error[50],
    color: colors.error[700],
    borderWidth: 0,
    borderColor: "none",
  },
  neutral: {
    backgroundColor: colors.neutral[50],
    color: colors.neutral[700],
    borderWidth: 0,
    borderColor: "none",
  },
  primary: {
    backgroundColor: colors.primary[50],
    color: colors.primary[700],
    borderWidth: 0,
    borderColor: "none",
  },
  secondary: {
    backgroundColor: colors.secondary[50],
    color: colors.secondary[700],
    borderWidth: 0,
    borderColor: "none",
  },
  outline: {
    backgroundColor: colors.white,
    color: colors.mutedForeground,
    borderWidth: 1,
    borderColor: colors.border,
  },
};

export const Badge = ({ title, variant = "success", icon }: BadgeProps) => {
  const style = badgeVariants[variant];

  return (
    <View
      style={{
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: style.backgroundColor,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
      }}
    >
      {icon && <Ionicons name={icon} size={16} color={style.color} />}
      <Text style={{ color: style.color, fontSize: 11, fontWeight: "500" }}>
        {title}
      </Text>
    </View>
  );
};
