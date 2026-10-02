import { Button } from "@/components/ui/atoms/Button";
import { Text } from "@/components/ui/atoms/Text";
import { Card, CardContent } from "@/components/ui/molecules/Card";
import { colors } from "@/constants/color";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { formatDate, formatRupiah } from "@/utils/format";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { router } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const TenantCard = ({ tenant }: { tenant: any }) => {
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

export default function HomeScreen() {
  const { data, isLoading } = useDashboard();
  const { mutate: logout, isPending: isPendingLogout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        flex: 1,
        backgroundColor: colors.primary[700],
      }}
    >
      {/* <StatusBar style="light" /> */}

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        {/* Bagian saldo */}
        <View
          style={{
            flexDirection: "row",
            padding: 16,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              padding: 16,
              gap: 16,
            }}
          >
            <View
              style={{
                padding: 6,
                backgroundColor: colors.white,
                borderRadius: 12,
              }}
            >
              <Image
                source={require("@/assets/images/logo-app.svg")}
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                }}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Text size="md" weight="bold" variant="white">
                Kontrakan Hj wiwi
              </Text>
              <Text size="sm" weight="regular" variant="white">
                Kelola properti
              </Text>
            </View>
          </View>
          <Button
            variant="outline"
            size="sm"
            icon="log-out-outline"
            onPress={handleLogout}
          />
        </View>
        <View style={{ padding: 16 }}>
          <Card style={styles.card_balance}>
            <BlurView
              intensity={10}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
            <CardContent>
              <Text size="sm" variant="white" weight="medium">
                Saldo Bersih
              </Text>
              <Text size="2xl" weight="bold" variant="white">
                {formatRupiah(data?.summary?.balance)}
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
                  {data?.summary?.comparison.balance.percentage !== null && (
                    <Ionicons
                      name={
                        data?.summary?.comparison.balance.trend === "up"
                          ? "trending-up"
                          : data?.summary?.comparison.balance.trend === "down"
                            ? "trending-down"
                            : "swap-horizontal-outline"
                      }
                      size={18}
                      color={
                        data?.summary?.comparison.balance.trend === "up"
                          ? colors.success[400]
                          : data?.summary.comparison.balance.trend === "down"
                            ? colors.error[400]
                            : colors.neutral[100]
                      }
                    />
                  )}

                  {data?.summary?.comparison.balance.percentage !== null && (
                    <Text
                      size="sm"
                      weight="semibold"
                      variant="primary"
                      style={{
                        color:
                          data?.summary?.comparison.balance.trend === "up"
                            ? colors.success[400]
                            : data?.summary?.comparison.balance.trend === "down"
                              ? colors.error[400]
                              : colors.neutral[100],
                      }}
                    >
                      {data?.summary?.comparison.balance.trend === "up"
                        ? "+"
                        : data?.summary?.comparison.balance.trend === "down"
                          ? "-"
                          : ""}{" "}
                      {data?.summary?.comparison.balance.percentage}%
                    </Text>
                  )}
                </View>
                {data?.summary?.comparison.balance.percentage !== null ? (
                  <Text size="sm" variant="white" style={{ opacity: 0.8 }}>
                    dari bulan lalu
                  </Text>
                ) : (
                  <Text size="sm" variant="white" style={{ opacity: 0.8 }}>
                    Tidak ada data bulan lalu
                  </Text>
                )}
              </View>
            </CardContent>
          </Card>
          <View
            style={{
              marginTop: 16,
              flexDirection: "row",
              gap: 16,
            }}
          >
            <Card style={styles.card_income}>
              <BlurView
                intensity={10}
                tint="light"
                style={StyleSheet.absoluteFill}
              />
              <CardContent>
                <Text
                  size="sm"
                  variant="white"
                  weight="medium"
                  style={{ opacity: 0.8 }}
                >
                  Pemasukan
                </Text>

                <Text size="lg" weight="bold" variant="white">
                  {formatRupiah(data?.summary?.income)}
                </Text>
              </CardContent>
            </Card>

            <Card style={styles.card_expense}>
              <BlurView
                intensity={10}
                tint="light"
                style={StyleSheet.absoluteFill}
              />
              <CardContent>
                <Text
                  size="sm"
                  variant="white"
                  weight="medium"
                  style={{ opacity: 0.8 }}
                >
                  Pengeluaran
                </Text>

                <Text size="lg" weight="bold" variant="white">
                  {formatRupiah(data?.summary?.expenses)}
                </Text>
              </CardContent>
            </Card>
          </View>
        </View>

        {/* Bagian overview */}
        <View
          style={{
            backgroundColor: colors.white,
            flex: 1,
            padding: 16,
            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
            marginTop: 16,
            gap: 24,
            flexDirection: "column",
          }}
        >
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <View>
                <Text size="md" weight="bold" variant="foreground">
                  Status Unit
                </Text>
                <Text size="sm" weight="regular" variant="mutedForeground">
                  Ringkasan unit kontrakan
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 16,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 12,
                      backgroundColor: colors.primary[700],
                    }}
                  ></View>
                  <Text size="sm" weight="regular" variant="foreground">
                    Tersedia
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: 12,
                      backgroundColor: colors.foreground,
                    }}
                  ></View>
                  <Text size="sm" weight="regular" variant="foreground">
                    Terisi
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.containerListUnit}>
              {data?.rooms && data?.rooms.length > 0 ? (
                data?.rooms.map((room: any) => (
                  <View
                    key={room.id}
                    style={
                      room.status === "terisi"
                        ? styles.itemUnitOccupied
                        : styles.itemUnitEmpty
                    }
                  >
                    <Text
                      variant={
                        room.status === "terisi" ? "mutedForeground" : "primary"
                      }
                      weight="bold"
                      size="sm"
                    >
                      {room.room_number}
                    </Text>
                  </View>
                ))
              ) : (
                <Text>Belum ada unit</Text>
              )}
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text size="md" weight="bold" variant="foreground">
                  Penyewa Terbaru
                </Text>
                <Text size="sm" weight="regular" variant="mutedForeground">
                  Riwayat penyewa yang baru masuk
                </Text>
              </View>
              <TouchableOpacity onPress={() => router.push("/contracts")}>
                <Text size="sm" weight="semibold" variant="primary">
                  Lihat semua
                </Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={data?.tenant}
              keyExtractor={(item, index) =>
                item.id ? item.id.toString() : index.toString()
              }
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ gap: 10, marginTop: 12 }}
              renderItem={({ item }) => <TenantCard tenant={item} />}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <Ionicons
                    name="people-outline"
                    size={36}
                    color={colors.neutral[300]}
                  />
                  <Text
                    size="sm"
                    variant="mutedForeground"
                    style={{ marginTop: 8 }}
                  >
                    Belum ada data penyewa terbaru
                  </Text>
                </View>
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card_balance: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    elevation: 0,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
  },

  card_income: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    elevation: 0,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
    flex: 1,
    minWidth: 0,
  },

  card_expense: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 10,
    elevation: 0,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
    flex: 1,
    minWidth: 0,
  },

  containerListUnit: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    rowGap: 10,
  },
  itemUnit: {
    padding: 16,
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[700],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "24%",
  },
  itemUnitEmpty: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[700],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "24%",
  },
  itemUnitOccupied: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    backgroundColor: colors.neutral[100],
    borderWidth: 1,
    borderColor: colors.neutral[400],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: "24%",
  },

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
  emptyContainer: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    borderStyle: "dashed",
    marginTop: 12,
  },
});
