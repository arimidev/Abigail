import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

export const CustomBackdrop = (props) => (
  <BottomSheetBackdrop
    {...props}
    appearsOnIndex={0}
    disappearsOnIndex={-1}
    opacity={0.2}
  />
);

const styles = StyleSheet.create({});
