import { Text } from "@/components/ui/atoms/Text";
import { colors } from "@/constants/color";
import { formatDate } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Tenant } from "../tenant.type";

export const TenantCard = ({ tenant }: { tenant: Tenant }) => {
    return (
        <View style={styles.tenantCard}>
            <View style={styles.tenantAvatar}>
                <Ionicons name="person-outline" size={20} color={colors.primary[600]} />
            </View>

            <View style={{ flex: 1, gap: 4 }}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Text
                        size="sm"
                        weight="semibold"
                        variant="foreground"
                        numberOfLines={1}
                    >
                        {tenant.name}
                    </Text>

                    {tenant.created_at ? (
                        <View style={styles.tenantDateBadge}>
                            <Ionicons
                                name="calendar-outline"
                                size={12}
                                color={colors.primary[600]}
                            />
                            <Text
                                size="xs"
                                weight="medium"
                                style={{ color: colors.primary[700] }}
                            >
                                {formatDate(tenant.created_at, "short")}
                            </Text>
                        </View>
                    ) : null}
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 12,
                        marginTop: 2,
                    }}
                >
                    {tenant.phone ? (
                        <View style={styles.tenantMetaItem}>
                            <Ionicons
                                name="call-outline"
                                size={13}
                                color={colors.mutedForeground}
                            />
                            <Text size="xs" variant="mutedForeground">
                                {tenant.phone}
                            </Text>
                        </View>
                    ) : null}

                    {tenant.email ? (
                        <View style={styles.tenantMetaItem}>
                            <Ionicons
                                name="mail-outline"
                                size={13}
                                color={colors.mutedForeground}
                            />
                            <Text
                                size="xs"
                                variant="mutedForeground"
                                numberOfLines={1}
                                style={{ maxWidth: 160 }}
                            >
                                {tenant.email}
                            </Text>
                        </View>
                    ) : null}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tenantCard: {
        flexDirection: "row",
        gap: 12,
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.neutral[200],
        backgroundColor: colors.white,
        alignItems: "center",
    },
    tenantAvatar: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: colors.primary[50],
        justifyContent: "center",
        alignItems: "center",
    },
    tenantDateBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: colors.primary[50],
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    tenantMetaItem: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
    },
});