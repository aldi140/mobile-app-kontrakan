import { Text } from "@/components/ui/atoms/Text";
import { Header } from "@/components/ui/Header";
import { InputGroup } from "@/components/ui/molecules/InputGroup";
import { Tabs } from "@/components/ui/Tabs";
import { colors } from "@/constants/color";
import { CreateContractBottomSheet } from "@/features/contracts/components/CreateContractBottomSheet";
import { EndContractBottomSheet } from "@/features/contracts/components/EndContractBottomSheet";
import { CreatePaymentBottomSheet } from "@/features/payments/components/CreatePaymentBottomSheet";
import { RoomCard } from "@/features/rooms/components/RoomCard";
import { SkeletonRoomCard } from "@/features/rooms/components/SkeletonRoomCard";
import { useRooms } from "@/features/rooms/hooks/useRooms";
import { Room, RoomStatus } from "@/features/rooms/room.types";
import { useDebounce } from "@/hooks/useDebounce";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type FilterValue = "semua" | RoomStatus;

export default function UnitScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [activeTab, setActiveTab] = useState<FilterValue>("semua");

  const { data, isFetching } = useRooms({
    search: debouncedSearch || undefined,
    status: activeTab === "semua" ? undefined : activeTab,
  });
  const rooms = data?.data ?? [];

  const createContractRef = useRef<BottomSheetModal>(null);
  const endContractRef = useRef<BottomSheetModal>(null);
  const createPaymentRef = useRef<BottomSheetModal>(null);

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const handleOpenCreateContract = useCallback((room: Room) => {
    setSelectedRoom(room);
    createContractRef.current?.present();
  }, []);

  const handleOpenEndContract = useCallback((room: Room) => {
    setSelectedRoom(room);
    endContractRef.current?.present();
  }, []);

  const handleOpenCreatePayment = useCallback((room: Room) => {
    setSelectedRoom(room);
    createPaymentRef.current?.present();
  }, []);

  const handleCloseCreateContract = useCallback(() => {
    createContractRef.current?.dismiss();
  }, []);

  const handleCloseEndContract = useCallback(() => {
    endContractRef.current?.dismiss();
  }, []);

  const handleCloseCreatePayment = useCallback(() => {
    createPaymentRef.current?.dismiss();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Daftar Kamar" description="Kontrakan Hj. Wiwi" />

      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 16,
          gap: 16,
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "column",
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <InputGroup
            icon="search-outline"
            placeholder="Cari kamar, nama penyewa"
            onChangeText={setSearch}
            value={search}
            containerStyle={{ flex: 1 }}
          />
        </View>

        <Tabs
          items={[
            {
              label: "Semua",
              value: "semua",
              content: null,
              count: data?.summary.total_all || 0,
            },
            {
              label: "Tersedia",
              value: "tersedia",
              content: null,
              count: data?.summary.total_available || 0,
            },
            {
              label: "Terisi",
              value: "terisi",
              content: null,
              count: data?.summary.total_occupied || 0,
            },
          ]}
          onChange={(value) => setActiveTab(value as FilterValue)}
        />
      </View>
      <View
        style={{
          paddingVertical: 24,
          paddingHorizontal: 16,
          gap: 16,
          flex: 1,
        }}
      >
        <FlatList
          data={rooms}
          keyExtractor={(item) => item.id.toString()}
          style={{ flex: 1 }}
          renderItem={({ item }) => (
            <RoomCard
              room={item}
              onCreateContract={() => handleOpenCreateContract(item)}
              onDeleteContract={() => handleOpenEndContract(item)}
              onCreatePayment={() => handleOpenCreatePayment(item)}
            />
          )}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 16,
          }}
          ListEmptyComponent={
            isFetching ? (
              <View style={{ gap: 16 }}>
                <SkeletonRoomCard />
                <SkeletonRoomCard />
                <SkeletonRoomCard />
              </View>
            ) : (
              <Text style={{ textAlign: "center", marginTop: 24 }}>
                Tidak ada kamar
              </Text>
            )
          }
        />
      </View>

      <CreateContractBottomSheet
        ref={createContractRef}
        selectedRoom={selectedRoom}
        onClose={handleCloseCreateContract}
        onDismiss={() => setSelectedRoom(null)}
      />
      <EndContractBottomSheet
        ref={endContractRef}
        selectedRoom={selectedRoom}
        onClose={handleCloseEndContract}
        onDismiss={() => setSelectedRoom(null)}
      />
      <CreatePaymentBottomSheet
        ref={createPaymentRef}
        selectedRoom={selectedRoom}
        onClose={handleCloseCreatePayment}
        onDismiss={() => setSelectedRoom(null)}
      />
    </SafeAreaView>
  );
}
