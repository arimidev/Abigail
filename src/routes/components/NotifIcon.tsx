import { StyleSheet, Text, View } from "react-native";
import React from "react";
import _styles from "../../utils/_styles";
import colors from "../../utils/colors";
import IonIcons from "@expo/vector-icons/Ionicons";

export const NotifIcon = ({
  isFocused,
  size,
  color,
}: {
  isFocused: boolean;
  size: number;
  color: string;
}) => {
  return (
    <View style={[_styles.all_center]}>
      <IonIcons
        name={isFocused ? "notifications" : "notifications-outline"}
        size={size}
        color={color}
      />
      <View
        style={{
          position: "absolute",
          height: 4,
          width: 4,
          borderRadius: 30,
          backgroundColor: colors.color_4,
          bottom: -7,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
