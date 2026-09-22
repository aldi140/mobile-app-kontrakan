import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { forwardRef, ReactNode, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppBottomSheetProps {
  children: ReactNode;
  footer?: ReactNode;
  snapPoints?: Array<string | number>;
  showBackdrop?: boolean;
  enableDynamicSizing?: boolean;
  showHandle?: boolean;
  onDismiss?: () => void;
}

export const AppBottomSheet = forwardRef<BottomSheetModal, AppBottomSheetProps>(
  (
    {
      children,
      footer,
      snapPoints = ["50%"],
      showBackdrop = true,
      showHandle = true,
      onDismiss,
    },
    ref,
  ) => {
    const insets = useSafeAreaInsets();

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          pressBehavior="close"
        />
      ),
      [],
    );

    const renderFooter = useCallback(
      (props: BottomSheetFooterProps) => (
        <BottomSheetFooter {...props} bottomInset={0}>
          <View
            style={[
              styles.footerContainer,
              { paddingBottom: Math.max(insets.bottom, 40) },
            ]}
          >
            {footer}
          </View>
        </BottomSheetFooter>
      ),
      [footer, insets.bottom],
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        enablePanDownToClose
        enableDismissOnClose
        enableDynamicSizing={false}
        onDismiss={onDismiss}
        backdropComponent={showBackdrop ? renderBackdrop : undefined}
        footerComponent={footer ? renderFooter : undefined}
        backgroundStyle={styles.background}
        handleComponent={showHandle ? undefined : null}
        handleIndicatorStyle={styles.indicator}
        style={styles.sheet}
      >
        {children}
      </BottomSheetModal>
    );
  },
);

AppBottomSheet.displayName = "AppBottomSheet";

const styles = StyleSheet.create({
  sheet: {
    elevation: 24,
  },
  background: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  indicator: {
    width: 40,
    height: 4,
    borderRadius: 10,
    backgroundColor: "#a3a3a3",
  },
  footerContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 1,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    flex: 1,
    borderTopColor: "#e5e7eb",
  },
});
