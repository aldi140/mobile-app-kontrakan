import { login } from "../api/login";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      console.log("token : ", data.token);
      await AsyncStorage.setItem("token", data.token);
      queryClient.invalidateQueries({ queryKey: ["me"] });
      router.replace("/(tabs)");
    },
    onError: (error: any) => {
      console.log("useLogin Mutation Error:", error?.response?.data || error.message);
    },
  });
};
