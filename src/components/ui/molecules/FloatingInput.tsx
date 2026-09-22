import { colors } from "@/constants/color";
import { useRef, useState } from "react";
import {
  Animated,
  TextInput as RNTextInput,
  StyleSheet,
  Text,
  TextInputProps,
  View,
} from "react-native";

interface FloatingInputProps extends TextInputProps {
  label: string;
  error?: string | boolean;
}

export const FloatingInput = ({
  label,
  value,
  error,
  onFocus,
  onBlur,
  ...props
}: FloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const handleFocus = (e: any) => {
    setIsFocused(true);
    animate(1);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (!value) animate(0);
    onBlur?.(e);
  };

  const animate = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const labelStyle = {
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -8],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: colors.mutedForeground,
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.label, labelStyle]}>{label}</Animated.Text>
      <RNTextInput
        style={[
          styles.input,
          {
            borderColor: error
              ? (colors.error?.[600] ?? "red")
              : isFocused
                ? colors.primary[700]
                : colors.border,
          },
        ]}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: 8,
    backgroundColor: colors.background,
  },
  label: {
    position: "absolute",
    left: 12,
    backgroundColor: colors.background,
    paddingHorizontal: 4,
    zIndex: 1,
    fontFamily: "Poppins_500Medium",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.foreground,
    fontFamily: "Poppins_500Medium",
  },
  errorText: {
    color: colors.error?.[600] ?? "red",
    fontSize: 12,
    fontFamily: "Poppins_700Bold",
    marginTop: 4,
    marginLeft: 4,
  },
});
