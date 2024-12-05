import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import spacing from "../utils/spacing";
import colors from "../utils/colors";
import { Image } from "expo-image";
import { getImage, getName, showToast } from "../functions";
import _styles from "../utils/_styles";
import IonIcons from "@expo/vector-icons/Ionicons";
import { CustomButton } from "./CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { select_user } from "../redux_utils/features/user";
import { useNavigation } from "@react-navigation/native";
import {
  add_user,
  select_seen_users,
} from "../redux_utils/features/seen_users";
import { useGet_suggested_accountsMutation } from "../redux_utils/api_slice";
import { useCrossCheckUsers } from "../hooks/useCrossCheckUsers";
import { useFollowUser } from "../hooks/useFollowUser";
import { PressToPage } from "./PressToPage";

export const SuggestedAccount = ({ item }: { item: UserProps }) => {
  // hooks
  const navigation = useNavigation<any>();
  const { FollowUser } = useFollowUser();

  // // redux
  const User: UserProps = useSelector(select_user);
  const seenUsers: Array<UserProps> = useSelector(select_seen_users);
  const appUserToUse = seenUsers.find((item) => item._id == User._id);

  function followUserFunc() {
    FollowUser({ user: item, appUser: appUserToUse ?? User });
  }
  return (
    <View style={styles.account_cont}>
      <PressToPage user={item}>
        <Image
          source={getImage({ uri: item.image_url, gender: null })}
          style={{ height: 60, width: 60, borderRadius: 100 }}
        />
      </PressToPage>

      <View style={{ marginTop: 10, alignItems: "center" }}>
        <Text
          style={[_styles.font_14_bold, { color: colors.color_2 }]}
          numberOfLines={1}
        >
          {getName(item.name)}
        </Text>
        <Text
          style={[_styles.font_12_medium, { color: colors.color_5 }]}
          numberOfLines={1}
        >
          @{item.username}
        </Text>
      </View>
      <Pressable
        style={{ position: "absolute", top: 10, right: 10 }}
        onPress={null}
      >
        <IonIcons name="close" size={20} color={colors.color_5} />
      </Pressable>
      <View>
        <CustomButton
          text={item.is_followed_by_user ? "Following" : "Follow"}
          background_color={colors.color_4}
          text_color="#fff"
          on_press={followUserFunc}
          button_style={{ height: "auto", paddingVertical: 7, marginTop: 10 }}
        />
      </View>
    </View>
  );
};

export const SuggestedAccounts = ({ user }: { user: UserProps }) => {
  // redux
  const dispatch = useDispatch();

  // states
  const [suggested_accounts, set_suggested_accts] = useState([]);

  // api hooks
  const [
    get_suggested_accounts,
    { isLoading: suggestedLoading, isError: suggestedErr },
  ] = useGet_suggested_accountsMutation();

  // hooks

  const { crossCheckedUsers } = useCrossCheckUsers();

  // functions

  async function getSuggested() {
    try {
      const res = await get_suggested_accounts({
        page: 1,
        limit: 5,
        userId: user._id,
      }).unwrap();

      res.results.map((item) => {
        dispatch(add_user(item));
      });
      set_suggested_accts(res.results);
    } catch (error) {
      console.log(error);
      showToast({
        description: "something went wrong:",
        type: "error",
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    getSuggested();
  }, []);

  if (suggestedErr || (suggested_accounts?.length < 1 && !suggestedLoading)) {
    return <View />;
  }
  return (
    <View style={{ marginTop: 20, gap: 10 }}>
      <View>
        <Text
          style={[
            _styles.font_14_bold,
            {
              color: colors.color_2,
              paddingHorizontal: spacing.padding_horizontal,
            },
          ]}
        >
          Suggested Accounts
        </Text>
      </View>
      {suggestedLoading ? (
        <FlatList
          data={[...Array(4)]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatlist_cont}
          renderItem={({ _, index }) => (
            <View key={index} style={styles.placeholder} />
          )}
        />
      ) : (
        <FlatList
          data={crossCheckedUsers(suggested_accounts)}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatlist_cont}
          renderItem={(item) => <SuggestedAccount {...item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  account_cont: {
    width: 170,
    height: 200,
    backgroundColor: colors.color_1,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  flatlist_cont: {
    paddingHorizontal: spacing.padding_horizontal,
    gap: 15,

    paddingVertical: 5,
  },
  placeholder: {
    width: 170,
    height: 200,
    backgroundColor: "#ECECEC",
    borderRadius: 10,
  },
});
