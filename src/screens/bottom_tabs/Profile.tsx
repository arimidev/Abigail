import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserPage } from "../../components/user/UserPage";
import { useSelector } from "react-redux";
import { select_user } from "../../redux_utils/features/user";
import { useMenuPressContext } from "../../contexts/MenuPressContext";
import { useFocusEffect } from "@react-navigation/native";

export const Profile = ({ navigation }) => {
  const User: UserProps = useSelector(select_user);
  const { sheetRef, sheetOpen } = useMenuPressContext();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sheetOpen == true) {
          sheetRef.current?.close();
        }
      };
    }, [sheetOpen])
  );
  return (
    <>
      <UserPage pageOwner={User} />
    </>
  );
};

const styles = StyleSheet.create({});
