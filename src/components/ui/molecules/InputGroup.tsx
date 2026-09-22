import { colors } from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { View } from "react-native";

import { Text } from "../atoms/Text";
import { TextInput } from "../atoms/TextInput";

interface InputGroupProps extends ComponentProps<typeof TextInput> {
  icon?: ComponentProps<typeof Ionicons>["name"];
  prefix?: string;
  placeholder?: string;
  label?: string;
}

export const InputGroup = ({
  icon,
  prefix,
  placeholder,
  label,
  ...props
}: InputGroupProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        borderWidth: 1,
        flex: 1,
        gap: 8,
        borderColor: colors.border,
        borderRadius: 10,
        backgroundColor: colors.white,
      }}
    >
      {icon && <Ionicons name={icon} size={20} color={colors.muted} />}

      {prefix && (
        <Text
          style={{
            color: colors.neutral[700],
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          {prefix}
        </Text>
      )}

      <TextInput
        style={{
          borderWidth: 0,
          paddingHorizontal: 0,
        }}
        {...props}
        placeholder={placeholder}
      />
    </View>
  );
};
