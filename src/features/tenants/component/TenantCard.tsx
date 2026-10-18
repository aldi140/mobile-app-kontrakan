import { Text } from "@/components/ui/atoms/Text";
import { colors } from "@/constants/color";
import { StyleSheet, View } from "react-native";
import { Tenant } from "../tenant.type";

export const TenantCard = ({ tenant }: { tenant: Tenant }) => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text size="sm" weight="semibold" variant="neutral">{tenant.name}</Text>
            </View>
            <View style={styles.footer}>
                <Text size="sm" variant="muted">{tenant.phone}</Text>

                <Text size="sm" variant="muted">{tenant.email}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        // justifyContent: "space-between",
        alignItems: "flex-start",
        padding: 16,
        backgroundColor: colors.white,
        borderRadius: 12,
        marginBottom: 12,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    footer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
});