import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { UserPage } from "../../components/user/UserPage";
import { MenuDisplay } from "../../components/MenuDisplay";
import { useMenuPressContext } from "../../contexts/MenuPressContext";
import { useFocusEffect } from "@react-navigation/native";

export const UserProfilePage = ({ navigation, route }) => {
  const passedData: UserProps = route.params.passedData;
  const { sheetRef, sheetOpen } = useMenuPressContext();

  // useFocusEffect(
  //   React.useCallback(() => {
  //     return () => {
  //       if (sheetRef.current) {
  //         sheetRef.current.close();
  //       }
  //     };
  //   }, [])
  // );

  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        console.log("listening");
        if (!sheetOpen) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();
        sheetRef.current?.close();
      }),
    [navigation]
  );
  return (
    <>
      <UserPage pageOwner={passedData} />
    </>
  );
};

const styles = StyleSheet.create({});
