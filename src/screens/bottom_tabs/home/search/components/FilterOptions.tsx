import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../../../../../utils/colors";
import _styles from "../../../../../utils/_styles";

export const FilterOptions = ({
  label,
  value,
  onPress,
  active,
}: {
  label: string;
  value: string;
  active: boolean;
  onPress: () => void;
}) => (
  <Pressable
    onPress={onPress}
    style={[
      _styles.all_center,
      styles.options,
      active && { backgroundColor: colors.color_4 },
    ]}
  >
    <Text
      style={[
        _styles.font_12_semi_bold,
        { color: colors.color_6 },
        active && { color: "#fff" },
      ]}
    >
      {label}
    </Text>
  </Pressable>
);

const styles = StyleSheet.create({
  options: {
    gap: 5,
    backgroundColor: colors.color_7,
    borderRadius: 50,
    paddingHorizontal: 20,
    // paddingVertical: 5,
    height: 33,
    // maxWidth: 250,
  },
});
