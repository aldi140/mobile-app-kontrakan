import { colors } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ComponentProps } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  Text,
  View,
  ViewStyle,
} from "react-native";

type IconName = ComponentProps<typeof Ionicons>["name"];
interface ButtonProps {
  title?: string;
  variant?: Variant;
  size?: "sm" | "md" | "lg" | "xl";
  style?: StyleProp<ViewStyle>;
  icon?: IconName;
  loading?: boolean;
  disable?: boolean;
  onPress?: () => void;
}
type Variant = keyof typeof buttonVariants;

const buttonVariants = {
  primary: {
    type: "solid",
    backgroundColor: colors.primary[600],
    color: colors.white,
  },
  secondary: {
    type: "solid",
    backgroundColor: colors.secondary[600],
    color: colors.white,
  },
  neutral: {
    type: "solid",
    backgroundColor: colors.neutral[600],
    color: colors.white,
  },
  outline: {
    type: "solid",
    backgroundColor: colors.white,
    color: colors.mutedForeground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  outlineBlue: {
    type: "solid",
    backgroundColor: colors.white,
    color: colors.primary[700],
    borderWidth: 1,
    borderColor: colors.primary[700],
  },
  danger: {
    type: "solid",
    backgroundColor: colors.error[600],
    color: colors.white,
  },
  warning: {
    type: "solid",
    backgroundColor: colors.warning[600],
    color: colors.white,
  },
  success: {
    type: "solid",
    backgroundColor: colors.success[700],
    color: colors.white,
  },
  primaryGradient: {
    type: "gradient",
    gradient: [colors.primary[600], colors.primary[800]] as const,
    color: colors.white,
  },
  successGradient: {
    type: "gradient",
    gradient: [colors.success[600], colors.success[800]] as const,
    color: colors.white,
  },
  secondaryGradient: {
    type: "gradient",
    gradient: [colors.secondary[600], colors.secondary[800]] as const,
    color: colors.white,
  },
  neutralGradient: {
    type: "gradient",
    gradient: [colors.neutral[600], colors.neutral[800]] as const,
    color: colors.white,
  },
} as const;

const buttonSizes = {
  sm: {
    minHeight: 40,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 13,
  },
  md: {
    minHeight: 44,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 14,
  },
  lg: {
    minHeight: 52,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
  },
  xl: {
    minHeight: 56,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
  },
};

export const Button = ({
  title,
  variant = "secondary",
  size = "md",
  style,
  children,
  ...props
}: ButtonProps & { children?: React.ReactNode }) => {
  const variantStyle = buttonVariants[variant];
  const sizeStyle = buttonSizes[size];
  const isDisabled = props.disable || props.loading;

  const content = (pressed: boolean) => (
    <>
      {props.loading ? (
        <ActivityIndicator color={variantStyle.color} />
      ) : (
        <>
          {props.icon && (
            <Ionicons name={props.icon} size={20} color={variantStyle.color} />
          )}
          {title && (
            <Text
              style={{
                color: variantStyle.color,
                fontSize: sizeStyle.fontSize,
                fontFamily: "Poppins_500Medium",
              }}
            >
              {title}
            </Text>
          )}
        </>
      )}
      {children}
    </>
  );

  const containerStyle = {
    borderRadius: 12,
    paddingVertical: sizeStyle.paddingVertical,
    paddingHorizontal: sizeStyle.paddingHorizontal,
    borderWidth: "borderWidth" in variantStyle ? variantStyle.borderWidth : 0,
    borderColor:
      "borderColor" in variantStyle ? variantStyle.borderColor : undefined,
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 12,
  };

  return (
    <Pressable onPress={props.onPress} disabled={isDisabled} style={style}>
      {({ pressed }) =>
        variantStyle.type === "gradient" ? (
          <LinearGradient
            colors={variantStyle.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              ...containerStyle,
              opacity: pressed ? 0.8 : isDisabled ? 0.5 : 1,
            }}
          >
            {content(pressed)}
          </LinearGradient>
        ) : (
          <View
            style={{
              ...containerStyle,
              backgroundColor: variantStyle.backgroundColor,
              opacity: pressed ? 0.8 : isDisabled ? 0.5 : 1,
            }}
          >
            {content(pressed)}
          </View>
        )
      }
    </Pressable>
  );
};
