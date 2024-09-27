import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import _styles from "../utils/_styles";
import spacing from "../utils/spacing";
import colors from "../utils/colors";
import { IonIcons } from "./icons/IonIcons";
import { useNavigation } from "@react-navigation/native";

export const SearchBox = ({
  placeholder,
  onChangeText,
  onSubmit,
  defaultText,
}: {
  placeholder: string;
  onSubmit: () => void;
  onChangeText: (val: string) => void;
  defaultText?: string;
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        _styles.flex_row,
        {
          marginTop: 20,
          gap: 20,
          paddingHorizontal: spacing.padding_horizontal,
        },
      ]}
    >
      <Pressable onPress={() => navigation.goBack()}>
        <IonIcons name="arrow-back-outline" size={20} color={colors.color_6} />
      </Pressable>
      <View style={[_styles.flex_row, styles.inputCont]}>
        <TextInput
          style={[
            _styles.flex_1,
            _styles.font_12_medium,
            { flex: 1, height: "100%", color: colors.color_2 },
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.color_6}
          onSubmitEditing={() => {
            onSubmit();
          }}
          onChangeText={onChangeText}
          defaultValue={defaultText}
        />
        <Pressable onPress={onSubmit}>
          <IonIcons name="search-outline" size={20} color={colors.color_6} />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputCont: {
    gap: 15,
    flex: 1,
    height: 45,
    // borderColor: colors.color_6,
    backgroundColor: colors.color_3,
    // borderWidth: 1.5,
    borderRadius: 50,
    paddingHorizontal: 10,
  },
});
