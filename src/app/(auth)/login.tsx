import { Button } from "@/components/ui/atoms/Button";
import { FloatingInput } from "@/components/ui/molecules/FloatingInput";
import { colors } from "@/constants/color";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { Image } from "expo-image";
import { useFormik } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function LoginScreen() {
  const { mutate: doLogin, isPending, isError, error } = useLogin();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("Submitting login form:", values);
      doLogin(values, {
        onSuccess: (data) => {
          console.log("Login Success Data:", data);
        },
        onError: (err: any) => {
          console.log(
            "Login Error Response:",
            err?.response?.data || err.message,
          );
        },
      });
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo-app-kontrakan.png")}
          style={{
            width: "60%",
            aspectRatio: 512 / 223,
            resizeMode: "contain",
          }}
        />
        <View style={styles.form}>
          <View>
            <Text style={styles.title}>Selamat Datang</Text>
            <Text style={styles.subtitle}>
              Masuk dengan akun Anda untuk melanjutkan
            </Text>
          </View>

          <View style={{ gap: 16 }}>
            {isError && (
              <Text style={styles.errorText}>
                {(error as any)?.response?.data?.message ||
                  (error as any)?.message ||
                  "Email atau password salah"}
              </Text>
            )}
            <View>
              <FloatingInput
                label="Email"
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                error={formik.touched.email && formik.errors.email}
              />
            </View>

            <View>
              <FloatingInput
                label="Password"
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                autoCapitalize="none"
                secureTextEntry
                error={formik.touched.password && formik.errors.password}
              />
            </View>

            <Button
              title="Login"
              variant="primary"
              loading={isPending}
              onPress={() => formik.handleSubmit()}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  form: {
    width: "80%",
    gap: 20,
  },
  title: {
    fontSize: 24,
    color: colors.black,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.neutral[500],
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  errorText: {
    color: colors.error?.[600] ?? "red",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: 4,
    marginLeft: 4,
  },
});
