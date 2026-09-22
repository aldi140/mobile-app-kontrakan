import { colors } from "@/constants/color";
import {
  Text as RNText,
  TextProps as RNTextProps,
  StyleProp,
  TextStyle,
} from "react-native";

type Variant =
  | "primary"
  | "secondary"
  | "neutral"
  | "danger"
  | "warning"
  | "success"
  | "muted"
  | "white"
  | "whiteLight"
  | "mutedForeground"
  | "foreground"
  | "black";

type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface TextProps extends RNTextProps {
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  weight?: "regular" | "medium" | "semibold" | "bold";
  style?: StyleProp<TextStyle>;
}

const textVariants: Record<Variant, string> = {
  primary: colors.primary[700],
  secondary: colors.secondary[700],
  neutral: colors.neutral[700],
  danger: colors.error[700],
  warning: colors.warning[700],
  success: colors.success[700],
  muted: colors.muted,
  foreground: colors.foreground,
  mutedForeground: colors.mutedForeground,
  white: colors.white,
  whiteLight: colors.whiteLight,
  black: colors.black,
};

const textSizes: Record<Size, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 24,
  "2xl": 28,
};

const fontWeights: Record<NonNullable<TextProps["weight"]>, string> = {
  regular: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semibold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};

export const Text = ({
  children,
  variant = "black",
  size = "md",
  weight = "regular",
  style,
  ...props
}: TextProps) => {
  return (
    <RNText
      {...props}
      style={[
        {
          color: textVariants[variant],
          fontSize: textSizes[size],
          fontFamily: fontWeights[weight],
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};
