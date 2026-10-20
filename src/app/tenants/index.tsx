import { Text } from "@/components/ui/atoms/Text";
import { Header } from "@/components/ui/Header";
import { InputGroup } from "@/components/ui/molecules/InputGroup";
import { colors } from "@/constants/color";
import { TenantCard } from "@/features/tenants/component/TenantCard";
import { useGetTenants } from "@/features/tenants/hooks/useGetTenants";
import { useDebounce } from "@/hooks/useDebounce";
import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TenantScreen() {

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 500);
    const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetTenants({
        search: debouncedSearch,
    });
    const tenants = useMemo(() => data?.pages.flatMap((page: any) => page.data) ?? [], [data]);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: colors.background,
            }}
        >
            <Header title="Penyewa" description="Daftar Penyewa" showBack />
            <View style={{ flex: 1, gap: 16, padding: 16 }}>
                <View>
                    <InputGroup
                        icon="search-outline"
                        placeholder="Cari nama penyewa"
                        containerStyle={{ flex: 1 }}
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>
                {
                    isLoading ? (
                        <ActivityIndicator />
                    ) : (
                        <FlatList
                            data={tenants}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => <TenantCard tenant={item} />}
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
                                <View style={{ paddingVertical: 40, alignItems: "center" }}>
                                    <Text variant="neutral" size="sm">Belum ada penyewa</Text>
                                </View>
                            }
                        />
                    )
                }
            </View>
        </SafeAreaView>
    )
}