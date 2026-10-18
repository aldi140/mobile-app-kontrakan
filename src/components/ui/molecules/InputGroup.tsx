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
        minHeight: 40,
        flex: 1,
        borderStyle: "solid",
        gap: 8,
        borderColor: colors.border,
        borderRadius: 10,
        backgroundColor: colors.white,
        overflow: "hidden",
      }}
    >
      {icon && <Ionicons name={icon} size={18} color={colors.muted} />}

      {prefix && (
        <Text
          style={{
            color: colors.neutral[700],
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          {prefix}
        </Text>
      )}

      <TextInput
        style={{
          padding: 0,
          borderWidth: 0,
        }}
        {...props}
        placeholder={placeholder}
      />
    </View>
  );
};
