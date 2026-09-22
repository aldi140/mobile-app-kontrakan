import { colors } from "@/constants/color";
import {
  TextInput as ReactNativeTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "./Text";

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  optional?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

export const TextInput = ({
  label,
  error,
  style,
  containerStyle,
  ...props
}: TextInputProps) => {
  return (
    <View style={[{ gap: 4 }, containerStyle]}>
      {label && (
        <Text variant="neutral" size="md" weight="medium">
          {label}{" "}
          {props.optional && (
            <Text variant="neutral" size="sm">
              {" "}
              (opsional)
            </Text>
          )}
        </Text>
      )}

      <ReactNativeTextInput
        {...props}
        placeholderTextColor={colors.muted}
        style={[
          {
            minHeight: 48,
            borderWidth: 1,
            borderColor: error ? colors.error[500] : colors.border,
            borderRadius: 8,
            padding: 12,
            fontSize: 14,
            color: colors.black,
            fontFamily: "Poppins_400Regular",
            backgroundColor:
              props.editable === false ? colors.background : colors.white,
          },
          style,
        ]}
      />

      {error && (
        <Text variant="danger" size="xs" weight="medium">
          {error}
        </Text>
      )}
    </View>
  );
};
