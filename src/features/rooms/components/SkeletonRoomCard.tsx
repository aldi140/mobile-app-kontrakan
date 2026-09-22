import { Card, CardContent, CardHeader } from "@/components/ui/molecules/Card";
import { colors } from "@/constants/color";
import { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

export const SkeletonRoomCard = () => {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Card style={styles.card}>
      <CardHeader style={styles.cardHeader}>
        <View style={styles.headerInfoContainer}>
          <Animated.View style={[styles.skeletonBlock, { width: 36, height: 36, borderRadius: 6, opacity }]} />
          <View style={styles.headerTextContainer}>
            <Animated.View style={[styles.skeletonBlock, { width: 90, height: 16, borderRadius: 4, opacity }]} />
            <Animated.View style={[styles.skeletonBlock, { width: 140, height: 12, borderRadius: 4, opacity }]} />
          </View>
        </View>
        <Animated.View style={[styles.skeletonBlock, { width: 72, height: 24, borderRadius: 12, opacity }]} />
      </CardHeader>

      <CardContent style={styles.cardContent}>
        <View style={styles.infoRow}>
          <View style={styles.infoCol}>
            <Animated.View style={[styles.skeletonBlock, { width: 50, height: 12, borderRadius: 4, opacity }]} />
            <Animated.View style={[styles.skeletonBlock, { width: 75, height: 16, borderRadius: 4, opacity }]} />
          </View>
          <View style={styles.infoCol}>
            <Animated.View style={[styles.skeletonBlock, { width: 60, height: 12, borderRadius: 4, opacity }]} />
            <Animated.View style={[styles.skeletonBlock, { width: 70, height: 16, borderRadius: 4, opacity }]} />
          </View>
          <View style={styles.infoCol}>
            <Animated.View style={[styles.skeletonBlock, { width: 70, height: 12, borderRadius: 4, opacity }]} />
            <Animated.View style={[styles.skeletonBlock, { width: 80, height: 16, borderRadius: 4, opacity }]} />
          </View>
        </View>

        <View style={styles.infoCol}>
          <Animated.View style={[styles.skeletonBlock, { width: 110, height: 12, borderRadius: 4, opacity }]} />
          <Animated.View style={[styles.skeletonBlock, { width: 90, height: 16, borderRadius: 4, opacity }]} />
        </View>

        <View style={styles.buttonRow}>
          <Animated.View style={[styles.skeletonBlock, styles.buttonSkeleton, { opacity }]} />
          <Animated.View style={[styles.skeletonBlock, styles.buttonSkeleton, { opacity }]} />
        </View>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    width: "100%",
    marginBottom: 16,
  },
  cardHeader: {
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  headerInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerTextContainer: {
    flexDirection: "column",
    gap: 6,
  },
  cardContent: {
    flexDirection: "column",
    backgroundColor: colors.white,
    borderRadius: 16,
    gap: 20,
    padding: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  infoCol: {
    flexDirection: "column",
    gap: 6,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 14,
    width: "100%",
  },
  buttonSkeleton: {
    flex: 1,
    height: 44,
    borderRadius: 12,
  },
  skeletonBlock: {
    backgroundColor: "#E2E8F0",
  },
});
