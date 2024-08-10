import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { MainContainer } from "../MainContainer";
import _styles from "../../utils/_styles";
import colors from "../../utils/colors";
import IonIcons from "@expo/vector-icons/Ionicons";
import spacing from "../../utils/spacing";
import { useNavigation } from "@react-navigation/native";

export const FullPageLoader = () => {
  const navigation = useNavigation();
  return (
    <MainContainer>
      <View style={{ flex: 1, backgroundColor: colors.color_1 }}>
        <View
          style={{
            padding: spacing.padding_horizontal,
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <IonIcons name="arrow-back" size={20} color={colors.color_2} />
          </Pressable>
        </View>
        <View style={[_styles.all_center, _styles.flex_1]}>
          <ActivityIndicator size={50} color={colors.color_2} />
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({});
