import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { select_seen_posts } from "../redux_utils/features/seen_posts";

const useCrossCheckPosts = () => {
  const seen_posts = useSelector(select_seen_posts);
  const crossCheckedPosts = (
    arr: Array<UserPostProps | ProductProps | CommentProps>
  ) => {
    const validated_items = arr.map((post_item) => {
      const reduxItem = seen_posts.find(
        (seen_post_item) => seen_post_item._id === post_item._id
      );
      return reduxItem ? { ...post_item, ...reduxItem } : post_item;
    });
    return validated_items;
  };

  return { crossCheckedPosts };
};

export { useCrossCheckPosts };

const styles = StyleSheet.create({});
