import * as Yup from "yup";

export const createRoomSchema = Yup.object().shape({
  name: Yup.string().required("Nama kamar wajib diisi"),
  price: Yup.number().required("Harga kamar wajib diisi"),
  description: Yup.string().optional(),
});
