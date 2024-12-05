import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { select_user } from "../redux_utils/features/user";

export const PressToPage = ({
  children,
  user,
}: {
  children: JSX.Element;
  user: UserProps;
}) => {
  const navigation = useNavigation();
  const User: UserProps = useSelector(select_user);

  return (
    <Pressable
      onPress={() => {
        if (User._id == user._id) {
          navigation.navigate("profile");
        } else {
          navigation.push("UserPage", { passedData: user });
        }
      }}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({});
