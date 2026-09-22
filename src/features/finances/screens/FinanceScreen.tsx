import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { Header } from "@/components/ui/Header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/molecules/Card";
import { colors } from "@/constants/color";
import { useFinance } from "@/features/finances/hooks/useFinance";
import { formatRupiah } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { TransactionCard } from "@/features/transactions/components/TransactionsCard";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Link, router } from "expo-router";
import { BarChart } from "react-native-gifted-charts";
import { CreateTransactionSheet } from "../components/CreateTransactionSheet";

const screenWidth = Dimensions.get("window").width;
interface MonthlyTrend {
  month: number;
  year: number;
  label: string;
  income: number;
  expenses: number;
}

interface LegendProps {
  color: string;
  label: string;
}
const Legend = ({ color, label }: LegendProps) => {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text size="xs" variant="mutedForeground">
        {label}
      </Text>
    </View>
  );
};

export const FinanceScreen = () => {
  const [period, setPeriod] = useState(() => {
    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${now.getFullYear()}-${month}`;
  });
  const { data, isLoading, error } = useFinance(period);
  const createTransactionRef = useRef<BottomSheetModal>(null);

  const handleOpenCreateTransaction = useCallback(() => {
    createTransactionRef.current?.present();
  }, []);

  const handleCloseCreateTransaction = useCallback(() => {
    createTransactionRef.current?.dismiss();
  }, []);

  const handleIncomePress = useCallback(() => {
    createTransactionRef.current?.dismiss();

    router.push("/transactions/create/income");
  }, []);

  const handleExpensePress = useCallback(() => {
    createTransactionRef.current?.dismiss();

    router.push("/transactions/create/expense");
  }, []);

  const chartData = useMemo(() => {
    return (
      data?.monthly_trend?.flatMap((item: MonthlyTrend) => [
        {
          value: item.income / 1_000_000,
          label: item.label.toUpperCase(),
          frontColor: colors.primary[700],
          spacing: 4,
          labelWidth: 46,
          labelTextStyle: {
            color: colors.mutedForeground,
            fontSize: 12,
          },
        },
        {
          value: item.expenses / 1_000_000,
          frontColor: colors.error[700],
          spacing: 24,
        },
      ]) ?? []
    );
  }, [data?.monthly_trend]);
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <Header title="Keuangan" />
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 100,
            gap: 16,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* <FinancePeriodFilter /> */}
          <Card style={styles.card_balance}>
            <CardContent>
              <Text
                size="md"
                variant="white"
                weight="medium"
                style={{ opacity: 0.8 }}
              >
                Saldo Bersih
              </Text>
              <Text size="2xl" weight="bold" variant="white">
                {formatRupiah(data?.balance)}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                  marginTop: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Ionicons
                    name={
                      data?.comparison.balance.trend === "up"
                        ? "trending-up"
                        : data?.comparison.balance.trend === "down"
                          ? "trending-down"
                          : "swap-horizontal-outline"
                    }
                    size={18}
                    color={
                      data?.comparison.balance.trend === "up"
                        ? colors.success[400]
                        : data?.comparison.balance.trend === "down"
                          ? colors.error[400]
                          : colors.neutral[100]
                    }
                  />
                  <Text
                    size="sm"
                    weight="semibold"
                    variant="white"
                    style={{
                      color:
                        data?.comparison.balance.trend === "up"
                          ? colors.success[400]
                          : data?.comparison.balance.trend === "down"
                            ? colors.error[400]
                            : colors.neutral[100],
                    }}
                  >
                    {data?.comparison.balance.trend === "up"
                      ? "+"
                      : data?.comparison.balance.trend === "down"
                        ? "-"
                        : ""}{" "}
                    {data?.comparison.balance.percentage}%
                  </Text>
                </View>
                <Text size="sm" variant="white" style={{ opacity: 0.8 }}>
                  dari bulan lalu
                </Text>
              </View>
            </CardContent>
          </Card>
          <Card style={styles.card_transaction}>
            <CardContent style={{ gap: 16 }}>
              <View
                style={{ gap: 16, flexDirection: "row", alignItems: "center" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                    backgroundColor: colors.success[50],
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                  }}
                >
                  <Ionicons
                    name="arrow-down-outline"
                    size={24}
                    color={colors.success[600]}
                  />
                </View>
                <View>
                  <Text size="md" weight="medium" variant="mutedForeground">
                    Pemasukan
                  </Text>
                  <Text
                    size="lg"
                    weight="bold"
                    style={{ color: colors.neutral[700] }}
                  >
                    {formatRupiah(data?.income)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: colors.whiteLight,
                  width: "100%",
                  height: 1,
                }}
              />
              <View
                style={{ gap: 16, flexDirection: "row", alignItems: "center" }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 12,
                    backgroundColor: colors.error[50],
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                  }}
                >
                  <Ionicons
                    name="arrow-up-outline"
                    size={24}
                    color={colors.error[600]}
                  />
                </View>
                <View>
                  <Text size="md" weight="medium" variant="mutedForeground">
                    Pengeluaran
                  </Text>
                  <Text
                    size="lg"
                    weight="bold"
                    style={{ color: colors.neutral[700] }}
                  >
                    {formatRupiah(data?.expenses)}
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
          <Button
            title="Laporan"
            variant="outlineBlue"
            size="md"
            icon="download-outline"
          />
          <Card style={styles.card_transaction}>
            <CardHeader>
              <CardTitle>Tren Keuangan (4 Bulan Terakhir)</CardTitle>
            </CardHeader>
            <CardContent style={{ gap: 16 }}>
              <BarChart
                data={chartData}
                width={screenWidth - 110}
                height={150}
                barWidth={15}
                maxValue={10}
                noOfSections={5}
                stepValue={2}
                initialSpacing={16}
                yAxisLabelSuffix=" jt"
                yAxisLabelWidth={42}
                yAxisTextStyle={{
                  color: colors.neutral[500],
                  fontSize: 10,
                }}
                yAxisThickness={0}
                xAxisThickness={1}
                xAxisColor={colors.neutral[200]}
                rulesType="dashed"
                rulesColor={colors.neutral[200]}
                isAnimated
              />
              <View style={styles.legend}>
                <Legend color={colors.primary[700]} label="Pemasukan" />

                <Legend color={colors.error[700]} label="Pengeluaran" />
              </View>
            </CardContent>
          </Card>
          {/* <Card style={styles.card_recent_activities}>
            <CardHeader
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CardTitle>Transaksi Terbaru</CardTitle>
              <Link href="/transactions" asChild>
                <Text size="sm" weight="semibold" variant="primary">
                  Lihat Semua
                </Text>
              </Link>
            </CardHeader>
            <CardContent style={{ gap: 16 }}>
              {data?.recent_activities.length === 0 && (
                <Text size="md" variant="muted">
                  Tidak ada aktivitas
                </Text>
              )}
            </CardContent>
          </Card> */}
          <View style={{ gap: 12, flexDirection: "column", marginTop: 16 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text size="md" weight="medium" variant="foreground">
                Transaksi Terbaru
              </Text>
              <Link href="/transactions" asChild>
                <Text size="sm" weight="semibold" variant="primary">
                  Lihat Semua
                </Text>
              </Link>
            </View>
            {data?.recent_activities.map((item: any, index: number) => (
              <TransactionCard transaction={item} key={`${item.id}-${index}`} />
            ))}
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
            right: 16,
            zIndex: 100,
          }}
        >
          <Button
            title="Tambah Transaksi"
            size="lg"
            variant="primaryGradient"
            icon="add-outline"
            onPress={handleOpenCreateTransaction}
          />
        </View>
      </SafeAreaView>

      <CreateTransactionSheet
        ref={createTransactionRef}
        onIncomePress={handleIncomePress}
        onExpensePress={handleExpensePress}
        onClose={handleCloseCreateTransaction}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card_balance: {
    backgroundColor: colors.primary[700],
    borderRadius: 10,
  },
  card_transaction: {
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  card_recent_activities: {
    elevation: 0,
    borderRadius: 10,
  },
});
