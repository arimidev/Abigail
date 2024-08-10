import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { select_seen_users } from "../redux_utils/features/seen_users";

const useCrossCheckUsers = () => {
  const seen_users = useSelector(select_seen_users);
  const crossCheckedUsers = (arr: Array<UserPostProps | ProductProps>) => {
    const validated_items = arr.map((post_user) => {
      const reduxItem = seen_users.find(
        (seen_post_user) => seen_post_user._id === post_user._id
      );
      return reduxItem ? { ...post_user, ...reduxItem } : post_user;
    });
    return validated_items;
  };

  return { crossCheckedUsers };
};

export { useCrossCheckUsers };

const styles = StyleSheet.create({});
