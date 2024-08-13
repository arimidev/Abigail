import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import spacing from "../utils/spacing";
import _styles from "../utils/_styles";
import { Image } from "expo-image";
import { useSelector } from "react-redux";
import { select_user } from "../redux_utils/features/user";
import colors from "../utils/colors";
import IonIcons from "@expo/vector-icons/Ionicons";
import { getImage, getName } from "../functions";
import { useNavigation } from "@react-navigation/native";
import { useFollowUser } from "../hooks/useFollowUser";
import { select_seen_users } from "../redux_utils/features/seen_users";

interface Props {
  user: UserProps;
}

export const ProfileHeader = ({ user }: Props) => {
  // redux
  const User: UserProps = useSelector(select_user);
  const seenUsers: Array<UserProps> = useSelector(select_seen_users);
  const appUserToUse = seenUsers.find((item) => item._id == User._id);

  // hooks
  const navigation = useNavigation<any>();
  const { FollowUser } = useFollowUser();

  // functions

  async function followUserFunc() {
    FollowUser({ user, appUser: appUserToUse ?? User });
  }

  const UserRightElements = () => {
    return (
      <View style={[_styles.flex_row, { gap: 15 }]}>
        <View style={[_styles.all_center, styles.profile_header_icon_cont]}>
          <IonIcons name="search-outline" size={16} color={colors.color_2} />
        </View>
        <Pressable
          style={[_styles.all_center, styles.profile_header_icon_cont]}
          onPress={() => navigation.navigate("profile_menu")}
        >
          <IonIcons name="create-outline" size={16} color={colors.color_2} />
        </Pressable>
      </View>
    );
  };

  const Following = () => {
    return (
      <Pressable
        onPress={followUserFunc}
        style={[
          _styles.all_center,
          styles.profile_header_icon_cont,
          { backgroundColor: colors.color_4, borderWidth: 0 },
        ]}
      >
        <IonIcons name="checkmark" size={16} color={"#fff"} />
      </Pressable>
    );
  };

  const NotFollowing = () => {
    return (
      <Pressable
        style={[_styles.all_center, styles.profile_header_icon_cont]}
        onPress={followUserFunc}
      >
        <IonIcons name="add" size={16} color={colors.color_2} />
      </Pressable>
    );
  };

  const StrangerRightElement = ({ user }: { user: UserProps }) => {
    return (
      <View style={[_styles.flex_row, { gap: 15 }]}>
        <View style={[_styles.all_center, styles.profile_header_icon_cont]}>
          <IonIcons
            name="chatbubble-outline"
            size={16}
            color={colors.color_2}
          />
        </View>
        {user.is_followed_by_user ? <Following /> : <NotFollowing />}
      </View>
    );
  };
  return (
    <View
      style={[
        _styles.flex_row,
        {
          marginTop: spacing.padding_top,
          paddingHorizontal: spacing.padding_horizontal,
        },
      ]}
    >
      <View style={[_styles.flex_row, { gap: 15, flex: 1 }]}>
        <Image
          source={getImage({ uri: user?.image_url, gender: user?.gender })}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={[_styles.font_14_bold, { color: colors.color_2 }]}>
            {getName(user?.name)}
          </Text>
          <Text style={[_styles.font_14_medium, { color: colors.color_6 }]}>
            @{user.username}
          </Text>
        </View>
      </View>
      {user._id == User._id ? (
        <UserRightElements />
      ) : (
        <StrangerRightElement user={user} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  profile_header_icon_cont: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderColor: "#DBDBDB",
    borderWidth: 1,
  },
  follow_btn: {
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 7,
    backgroundColor: colors.color_4,
  },
});
