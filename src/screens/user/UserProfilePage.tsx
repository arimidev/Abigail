import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserPage } from "../../components/user/UserPage";

export const UserProfilePage = ({ navigation, route }) => {
  const passedData: UserProps = route.params.passedData;
  return <UserPage pageOwner={passedData} />;
};

const styles = StyleSheet.create({});
