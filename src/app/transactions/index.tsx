import { Badge } from "@/components/ui/atoms/Badge";
import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { Header } from "@/components/ui/Header";
import { InputGroup } from "@/components/ui/molecules/InputGroup";
import { colors } from "@/constants/color";
import {
  FilterSheetTransaction,
  TransactionFilter,
} from "@/features/transactions/components/FilterSheetTransaction";
import { TransactionCard } from "@/features/transactions/components/TransactionsCard";
import { useTransactions } from "@/features/transactions/hooks/useTransactions";
import {
  TransactionType,
  transactionTypeLabel,
} from "@/features/transactions/transaction.type";
import { useDebounce } from "@/hooks/useDebounce";
import { formatDate } from "@/utils/format";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { useCallback, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FinanceTransactionScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [filters, setFilters] = useState<TransactionFilter>({});
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTransactions({
      search: debouncedSearch,
      type: filters.type,
      start_date: filters.start_date,
      end_date: filters.end_date,
    });

  const transactions = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  const filterSheetRef = useRef<BottomSheetModal>(null);

  const handleOpenFilter = useCallback(() => {
    filterSheetRef.current?.present();
  }, []);

  const handleCloseFilter = useCallback(() => {
    filterSheetRef.current?.dismiss();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.background,
      }}
    >
      <Header title="Transactions" description="Daftar Transaksi" showBack />
      <View style={{ gap: 16, marginTop: 16 }}>
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            gap: 16,
          }}
        >
          <InputGroup
            icon="search-outline"
            placeholder="Cari berdasarkan kamar, kategori"
            containerStyle={{ flex: 1 }}
            value={search}
            onChangeText={setSearch}
          />
          <Button
            icon="filter-outline"
            variant="outline"
            size="lg"
            onPress={handleOpenFilter}
          >
            {Object.keys(filters).length > 0 && (
              <View
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: 10,
                  backgroundColor: colors.error[500],
                }}
              ></View>
            )}
          </Button>
        </View>
        {Object.keys(filters).length > 0 && (
          <View
            style={{
              paddingHorizontal: 16,
              gap: 16,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Text variant="neutral" size="sm">
                Filter
              </Text>
              <View
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: colors.error[500],
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text variant="white" size="xs" weight="bold">
                  {Object.keys(filters).length}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 8,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {Object.entries(filters).map(([key, value], index) => {
                const label =
                  key === "type"
                    ? transactionTypeLabel[value as TransactionType]
                    : formatDate(value, "long");
                return (
                  <Badge key={index} title={`${label}`} variant="primary" />
                );
              })}
            </View>
          </View>
        )}

        {isLoading ? (
          <View
            style={{
              paddingVertical: 40,
              alignItems: "center",
            }}
          >
            <ActivityIndicator />
          </View>
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            renderItem={({ item }) => <TransactionCard transaction={item} />}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: Object.keys(filters).length > 0 ? 0 : 16,
              gap: 12,
            }}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <View style={{ paddingVertical: 16 }}>
                  <ActivityIndicator />
                </View>
              ) : null
            }
            ListEmptyComponent={
              <View
                style={{
                  paddingVertical: 40,
                  alignItems: "center",
                }}
              >
                <Text variant="neutral" size="sm">
                  Belum ada s
                </Text>
              </View>
            }
          />
        )}
        <FilterSheetTransaction
          ref={filterSheetRef}
          value={filters}
          onClose={handleCloseFilter}
          onApply={(filter) => {
            // console.log(filter);
            setFilters(filter);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
