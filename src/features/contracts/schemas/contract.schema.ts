import * as Yup from "yup";

export const createContractSchema = Yup.object().shape({
  tenant_name: Yup.string().required("Nama penyewa wajib diisi"),
  tenant_email: Yup.string()
    .email("Format email salah")
    .required("Email penyewa wajib diisi"),
  tenant_phone: Yup.string()
    .min(10, "Nomor telepon minimal 10 karakter")
    .required("Nomor telepon wajib diisi"),
});
