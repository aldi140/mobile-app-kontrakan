import { AppToast } from "../molecules/AppToast";

export const toastConfig = {
  success: ({ text1 }: any) => <AppToast type="success" message={text1} />,

  error: ({ text1 }: any) => <AppToast type="error" message={text1} />,

  info: ({ text1 }: any) => <AppToast type="info" message={text1} />,
};
