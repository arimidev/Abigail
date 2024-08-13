import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import _styles from "../utils/_styles";
import colors from "../utils/colors";
import { Image } from "expo-image";
import { getDate, getImage } from "../functions";

export const NotificationComp = ({
  item,
  index,
  data,
}: {
  item: NotificationProps;
  index: number;
  data: Array<NotificationProps>;
}) => {
  return (
    <>
      {item.seen == false && data[index - 1]?.seen == undefined && (
        <Text
          style={[
            _styles.font_12_semi_bold,
            { color: colors.color_2, marginBottom: 10 },
          ]}
        >
          New
        </Text>
      )}
      {item.seen == true && data[index - 1]?.seen == false && (
        <Text
          style={[
            _styles.font_12_semi_bold,
            { color: colors.color_2, marginBottom: 10 },
          ]}
        >
          Recent
        </Text>
      )}

      <Pressable
        style={[
          _styles.flex_row,
          {
            padding: 15,
            borderRadius: 10,
            backgroundColor: "#F6F6F6",
            alignItems: "flex-start",
            gap: 10,
          },
        ]}
      >
        <Image
          source={getImage({
            uri: item.user?.image_url,
            gender: item.user?.gender,
          })}
          style={{ height: 25, width: 25, borderRadius: 30 }}
        />
        <View style={{ gap: 5, flex: 1 }}>
          {/* <Text style={[_styles.font_14_bold, { color: colors.color_2 }]}>
              {item.title}
            </Text> */}

          <Text style={[_styles.font_14_semi_bold, { color: colors.color_2 }]}>
            {item.body}
          </Text>
          <Text
            style={[_styles.font_12_medium, { color: "#999", fontSize: 10 }]}
          >
            {getDate(item.createdAt)}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({});
