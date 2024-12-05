import { StyleSheet, Text, View } from "react-native";
import React from "react";
import IonIcon from "@expo/vector-icons/Ionicons";

const IonIcons = ({
  name,
  color,
  size,
}: {
  name: string;
  size: number;
  color: string;
}) => {
  return <IonIcon name={name} color={color} size={size} />;
};

export { IonIcons };

const styles = StyleSheet.create({});
