import { colors } from "@/constants/color";
import * as React from "react";
import { StyleSheet, Text, TextProps, View, ViewProps } from "react-native";

export interface CardProps extends ViewProps {}
export interface CardHeaderProps extends ViewProps {}
export interface CardTitleProps extends TextProps {}
export interface CardDescriptionProps extends TextProps {}
export interface CardContentProps extends ViewProps {}
export interface CardFooterProps extends ViewProps {}

const CardHeader = React.forwardRef<View, CardHeaderProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.header, style]} {...props} />
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<Text, CardTitleProps>(
  ({ style, ...props }, ref) => (
    <Text ref={ref} style={[styles.title, style]} {...props} />
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<Text, CardDescriptionProps>(
  ({ style, ...props }, ref) => (
    <Text ref={ref} style={[styles.description, style]} {...props} />
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<View, CardContentProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.content, style]} {...props} />
  ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<View, CardFooterProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.footer, style]} {...props} />
  ),
);
CardFooter.displayName = "CardFooter";

const CardBase = React.forwardRef<View, CardProps>(
  ({ style, ...props }, ref) => (
    <View ref={ref} style={[styles.card, style]} {...props} />
  ),
);
CardBase.displayName = "Card";

export const Card = Object.assign(CardBase, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});

export { CardContent, CardDescription, CardFooter, CardHeader, CardTitle };

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  header: {
    padding: 20,
    gap: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.foreground,
    letterSpacing: -0.4,
    lineHeight: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  description: {
    fontSize: 14,
    color: colors.mutedForeground,
    lineHeight: 20,
    fontFamily: "Poppins_400Regular",
  },
  content: {
    padding: 16,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 0,
    flexDirection: "row",
    alignItems: "center",
  },
});
