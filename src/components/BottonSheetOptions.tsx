import { StyleSheet, Text, View } from "react-native";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import colors from "../utils/colors";
import { CustomBackdrop } from "./CustomBacdrop";

interface Props {
  children: JSX.Element;
  height: Array<`${number}%`>;
}

export const BottonSheetOptions = forwardRef(
  ({ children, height }: Props, ref) => {
    const localRef = useRef<BottomSheet>();
    useImperativeHandle(ref, () => ({
      expand: () => localRef.current?.expand(),
      close: () => localRef.current?.close(),
    }));

    return (
      <BottomSheet
        snapPoints={height}
        ref={localRef}
        index={-1}
        backdropComponent={CustomBackdrop}
        enablePanDownToClose
      >
        <BottomSheetView style={{ flex: 1, backgroundColor: colors.color_1 }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({});
