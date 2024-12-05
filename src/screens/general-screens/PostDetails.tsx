import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import _styles from "../../utils/_styles";
import colors from "../../utils/colors";
import {
  useGet_post_detailsQuery,
  useGetPostCommentsMutation,
} from "../../redux_utils/api_slice";
import { Loader } from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import {
  add_post,
  select_seen_posts,
  update_post,
} from "../../redux_utils/features/seen_posts";
import CommentInput from "../../components/posts/CommentInput";
import { CommentComp } from "../../components/posts/Comment";
import { showToast } from "../../functions";
import { PostView } from "../../components/posts/PostView";
import { useCrossCheckPosts } from "../../hooks/useCrossCheckPosts";
import { MenuDisplay } from "../../components/MenuDisplay";
import { useFocusEffect } from "@react-navigation/native";
import { useMenuPressContext } from "../../contexts/MenuPressContext";

export const PostDetails = ({ route, navigation }) => {
  // redux
  const seen_posts: Array<UserPostProps> = useSelector(select_seen_posts);
  const dispatch = useDispatch();
  // route stuff
  const passedData: UserPostProps = route.params.passedData;
  // context
  const { sheetRef, sheetOpen } = useMenuPressContext();
  // ======= states ====
  const [comments, setComments] = useState<Array<CommentProps>>([]);
  const [commentsPage, setPage] = useState(1);
  const [is_data_available, set_is_data_available] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // hooks

  const { crossCheckedPosts } = useCrossCheckPosts();
  // ===== api hooks  ====
  const {
    data: postData,
    isLoading: postLoading,
    isError: postErr,
    refetch: postReftch,
  } = useGet_post_detailsQuery({ id: passedData._id });

  const reduxItem = seen_posts.find(
    (seen_post_item) => seen_post_item._id === postData?.results?._id
  );

  const postDataState = reduxItem ?? passedData;

  // comments
  const [
    getPostComments,
    { isLoading: mutCommentsLoading, isError: mutCommentErr },
  ] = useGetPostCommentsMutation();

  // functions

  async function getComments(page: number) {
    try {
      const res = await getPostComments({
        postId: passedData._id,
        page: page,
        limit: 5,
      }).unwrap();
      res.results.map((item) => {
        dispatch(add_post(item));
      });
      set_is_data_available(res.results?.length > 0);
      return res.results;
    } catch (err) {
      console.log(err);
      showToast({
        description: "Error getting comments",
        duration: 3000,
        type: "error",
      });
    }
  }

  function setNextCommentPage(data) {
    setComments([...comments, ...data]);
    setPage(commentsPage + 1);
  }

  const refreshFunc = useCallback(() => {
    setRefreshing(true);
    postReftch();
    if (postData) {
      dispatch(add_post(postData.results));
    }
    getComments(1).then((data) => {
      setComments([...data, ...comments]);
    });
    setRefreshing(mutCommentsLoading);
  }, [postData, mutCommentsLoading]);

  const uniqueComments = Array.from(
    crossCheckedPosts(comments)
      .reduce((map, obj) => map.set(obj._id, obj), new Map())
      .values()
  );

  //effects

  useEffect(() => {
    getComments(commentsPage).then(setNextCommentPage);
  }, []);

  React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (sheetOpen == false || sheetOpen == undefined) {
          return;
        }

        e.preventDefault();
        sheetRef.current?.close();
      }),
    [navigation, sheetOpen]
  );
  return (
    <View style={[_styles.flex_1, { backgroundColor: colors.color_1 }]}>
      <View style={{ flex: 1 }}>
        {postLoading && <Loader />}
        {!postLoading && (
          <FlatList
            refreshing={refreshing}
            onRefresh={refreshFunc}
            ListHeaderComponent={
              <PostView item={postDataState} display_type="details" />
            }
            data={uniqueComments}
            keyExtractor={(item) => item._id.toString()}
            renderItem={(item) => <CommentComp {...item} />}
            ListFooterComponent={
              mutCommentsLoading ? (
                <View style={[_styles.all_center]}>
                  <ActivityIndicator size={40} color={colors.color_2} />
                </View>
              ) : (
                <View />
              )
            }
            onEndReached={() => {
              if (
                is_data_available == true &&
                !mutCommentsLoading &&
                !mutCommentErr
              ) {
                getComments(commentsPage).then(setNextCommentPage);
              }
            }}
          />
        )}
      </View>

      <CommentInput />
    </View>
  );
};

const styles = StyleSheet.create({});
