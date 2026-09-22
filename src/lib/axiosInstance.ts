import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { AppError } from "./AppError";

export const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.code === "ECONNABORTED") {
      throw new AppError("Koneksi terlalu lama.", "TIMEOUT");
    }

    if (!error.response) {
      throw new AppError("Tidak dapat terhubung ke server.", "NETWORK_ERROR");
    }

    const status = error.response.status;
    const data = error.response.data;

    switch (status) {
      case 401:
        await AsyncStorage.removeItem("token");

        throw new AppError(
          "Sesi Anda telah berakhir.",
          "UNAUTHORIZED",
          401,
          data,
        );

      case 403:
        throw new AppError(
          data?.message ?? "Anda tidak memiliki akses.",
          "FORBIDDEN",
          403,
          data,
        );

      case 404:
        throw new AppError(
          data?.message ?? "Data tidak ditemukan.",
          "NOT_FOUND",
          404,
          data,
        );

      case 422:
        throw new AppError(
          data?.message ?? "Data tidak valid.",
          "VALIDATION",
          422,
          data,
        );

      case 429:
        throw new AppError(
          "Terlalu banyak permintaan.",
          "RATE_LIMIT",
          429,
          data,
        );

      default:
        if (status >= 500) {
          throw new AppError(
            "Server sedang mengalami gangguan.",
            "SERVER_ERROR",
            status,
            data,
          );
        }

        throw new AppError(
          data?.message ?? "Terjadi kesalahan.",
          "UNKNOWN",
          status,
          data,
        );
    }
  },
);
