import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import _styles from "../../utils/_styles";
import spacing from "../../utils/spacing";
import { getImage, getName } from "../../functions";
import colors from "../../utils/colors";
import IonIcons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { PressToPage } from "../PressToPage";
import { useMenuPressContext } from "../../contexts/MenuPressContext";

export const PostHeader = ({
  item,
  type = "post",
}: {
  item: UserPostProps;
  type?: "reposted" | "post" | "details";
}) => {
  const { showMenu } = useMenuPressContext();
  return (
    <View
      style={[
        _styles.flex_row,
        { paddingHorizontal: spacing.padding_horizontal },
      ]}
    >
      <View style={[_styles.flex_row, { gap: 10, flex: 1 }]}>
        <PressToPage user={item.owner}>
          <Image
            source={getImage({
              uri: item.owner?.image_url,
              gender: item.owner?.gender,
            })}
            style={[
              { height: 50, width: 50, borderRadius: 100 },
              type == "reposted" && { height: 40, width: 40 },
            ]}
          />
        </PressToPage>

        <View>
          <Text
            style={[
              _styles.font_14_semi_bold,
              { color: colors.color_2, lineHeight: 17 },
              type == "reposted" && { fontSize: 13 },
            ]}
          >
            {getName(item?.owner?.name)}
          </Text>
          <Text
            style={[
              _styles.font_12_medium,
              { color: colors.color_5 },
              type == "reposted" && { fontSize: 11 },
            ]}
          >
            @{item?.owner?.username}
          </Text>
        </View>
      </View>
      <Pressable onPress={() => showMenu({ type: item.type, item })}>
        <IonIcons name="ellipsis-vertical" size={17} color={colors.color_2} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({});
