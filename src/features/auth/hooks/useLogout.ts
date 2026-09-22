import { logout } from "../api/logout";
import { useAuthStore } from "../authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useLogout = () => {
  const clearUser = useAuthStore((state) => state.clearUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await AsyncStorage.removeItem("token");
      clearUser();
      queryClient.clear();
      router.replace("/(auth)/login");
    },
  });
};
