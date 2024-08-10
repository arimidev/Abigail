import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useSave_postMutation,
  useSave_productMutation,
} from "../redux_utils/api_slice";
import { showToast } from "../functions";
import { useDispatch, useSelector } from "react-redux";
import { add_post, update_post } from "../redux_utils/features/seen_posts";
import { select_user } from "../redux_utils/features/user";

const useSavePostFunction = () => {
  const [save_post] = useSave_postMutation();
  const [save_product] = useSave_productMutation();
  const dispatch = useDispatch();

  const savePost = async ({
    post,
    type,
  }: {
    post: UserPostProps | ProductProps;
    type: "post" | "product";
  }) => {
    // ================== local update
    function localUpdate() {
      if (post.is_saved_by_user == true) {
        dispatch(
          update_post({
            ...post,
            is_saved_by_user: false,
          })
        );
      } else {
        dispatch(
          update_post({
            ...post,
            is_saved_by_user: true,
          })
        );
      }
    }

    localUpdate();

    //  update on backend
    try {
      const res =
        type == "post"
          ? await save_post(post._id).unwrap()
          : await save_product(post._id).unwrap();
      dispatch(add_post(res.results));
      console.log(res.results);
      showToast({
        description:
          res.action == "saved"
            ? `${type == "post" ? "Post" : "Product"} added to bookmark.`
            : `${type == "post" ? "Post" : "Product"} removed from bookmark.`,
        type: "default",
        duration: 3000,
      });
    } catch (error) {
      // localUpdate();
      console.log(error);
      showToast({
        description: "Something went wrong",
        type: "error",
        duration: 3000,
      });
    }
  };
  return { savePost };
};

export default useSavePostFunction;

const styles = StyleSheet.create({});
