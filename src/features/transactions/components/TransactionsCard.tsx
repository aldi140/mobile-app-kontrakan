import { Text } from "@/components/ui/atoms/Text";
import { colors } from "@/constants/color";
import { formatDate, formatRupiah } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export interface Transaction {
  id: number;
  type: "income" | "expense";
  date: string;
  amount: number;
  title: string;
  description: string;
  notes?: string | null;
}

interface TransactionCardProps {
  transaction: Transaction;
}

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const isIncome = transaction.type === "income";

  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: isIncome ? colors.success[50] : colors.error[50],
          },
        ]}
      >
        <Ionicons
          name={isIncome ? "arrow-down-outline" : "arrow-up-outline"}
          size={20}
          color={isIncome ? colors.success[600] : colors.error[600]}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text
              size="sm"
              weight="semibold"
              variant="neutral"
              numberOfLines={1}
            >
              {transaction.title}
            </Text>

            <Text size="xs" variant="mutedForeground" numberOfLines={1}>
              {transaction.description}
            </Text>
          </View>

          <Text
            size="sm"
            weight="semibold"
            style={{
              color: isIncome ? colors.success[600] : colors.error[600],
            }}
          >
            {isIncome ? "+" : "-"}
            {formatRupiah(transaction.amount)}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.date}>
            <Ionicons
              name="calendar-outline"
              size={13}
              color={colors.neutral[400]}
            />

            <Text size="xs" variant="muted">
              {formatDate(transaction.date, "short")}
            </Text>
          </View>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: isIncome
                  ? colors.success[50]
                  : colors.error[50],
              },
            ]}
          >
            <Text
              size="xs"
              weight="medium"
              style={{
                color: isIncome ? colors.success[600] : colors.error[600],
              }}
            >
              {isIncome ? "Pemasukan" : "Pengeluaran"}
            </Text>
          </View>
        </View>

        {transaction.notes ? (
          <View style={styles.notes}>
            <Text size="xs" variant="muted">
              {transaction.notes}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 12,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    backgroundColor: colors.white,
  },

  iconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    flex: 1,
    gap: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },

  titleContainer: {
    flex: 1,
    gap: 2,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  date: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },

  notes: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
});
