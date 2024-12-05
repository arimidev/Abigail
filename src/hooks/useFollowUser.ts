import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useFollow_userMutation } from "../redux_utils/api_slice";
import { useDispatch } from "react-redux";
import { add_user } from "../redux_utils/features/seen_users";
import { showToast } from "../functions";

export const useFollowUser = () => {
  // api hooks
  const [follow_user] = useFollow_userMutation();

  // redux
  const dispatch = useDispatch();
  const FollowUser = async ({
    user,
    appUser,
  }: {
    user: UserProps;
    appUser: UserProps;
  }) => {
    function followLocally() {
      if (user.is_followed_by_user == true) {
        dispatch(
          add_user({
            ...appUser,
            following: appUser.following - 1,
          })
        );
        dispatch(
          add_user({
            ...user,
            is_followed_by_user: false,
            followers: user.followers - 1,
          })
        );
      } else {
        dispatch(
          add_user({
            ...appUser,
            following: appUser.following + 1,
          })
        );
        dispatch(
          add_user({
            ...user,
            is_followed_by_user: true,
            followers: user.followers + 1,
          })
        );
      }
    }

    followLocally();
    try {
      const res = await follow_user(user?._id).unwrap();
      if (res.action === "follow") {
        showToast({
          description: `You followed @${user?.username}`,
          type: "default",
          duration: 3000,
        });
      }
    } catch (err) {
      console.log(err);
      showToast({
        description: "Coundn't follow user!",
        type: "error",
        duration: 3000,
      });

      // unfollow locally ==========================
      // followLocally();
    }
  };
  return { FollowUser };
};

const styles = StyleSheet.create({});
