import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useMenuPressContext } from "../contexts/MenuPressContext";
import _styles from "../utils/_styles";
import colors from "../utils/colors";
import spacing from "../utils/spacing";
import { useNavigation } from "@react-navigation/native";

export const MenuDisplay = () => {
  const { menuArray, onPressItem, sheetRef, setSheetOpen, sheetOpen } =
    useMenuPressContext();

  const CustomBackDrop = (props) => {
    return (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    );
  };

  return (
    <BottomSheet
      snapPoints={[menuArray.length < 1 ? 1 : menuArray.length * 60]}
      index={-1}
      ref={sheetRef}
      backdropComponent={CustomBackDrop}
      enablePanDownToClose
      onChange={(index) => {
        if (index == 0) {
          setSheetOpen(true);
        } else if (index == -1) {
          setSheetOpen(false);
        }
      }}
    >
      <BottomSheetView style={{ flex: 1 }}>
        {menuArray?.map((item, index) => (
          <Pressable
            style={({ pressed }) => [
              {
                height: 50,
                width: "100%",
                paddingHorizontal: spacing.padding_horizontal,
                backgroundColor: pressed ? "rgba(0,0,0,0.05)" : "transparent",
                justifyContent: "center",
              },
            ]}
            key={index}
            onPress={() => onPressItem(item)}
          >
            <Text style={[_styles.font_14_medium, { color: colors.color_2 }]}>
              {item?.name}
            </Text>
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({});
