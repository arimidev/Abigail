import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import colors from "../../../../utils/colors";
import { useSearchPostsMutation } from "../../../../redux_utils/api_slice";
import { useCrossCheckPosts } from "../../../../hooks/useCrossCheckPosts";
import { useDispatch } from "react-redux";
import { add_post } from "../../../../redux_utils/features/seen_posts";
import _styles from "../../../../utils/_styles";
import { PostView } from "../../../../components/posts/PostView";
import { ListLoader } from "../../../../components/loadingDisplay/ListLoader";

export const PostsSearch = ({ query }) => {
  // state

  const [posts, setPosts] = useState([]);
  const [isDataAvailable, setDataAvailable] = useState(true);
  const [postsPage, setPostsPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  //   const [inputSearch, setInputSearch] = useState("");

  // api hooks

  const [searchPosts, { isLoading, isError }] = useSearchPostsMutation();

  // hooks
  const { crossCheckedPosts } = useCrossCheckPosts();
  const dispatch = useDispatch();

  // functions

  async function getPostsFunc(page) {
    try {
      const res = await searchPosts({ page, query }).unwrap();
      res.results.map((item) => {
        dispatch(add_post(item));
      });
      setDataAvailable(res.results.length > 0 && res.totalPages > postsPage);
      return res.results;
    } catch (error) {
      //   showToast({
      //     description: "Something went wrong",
      //     duration: 3000,
      //     type: "error",
      //   });
    }
  }

  function setNextPage(data) {
    setPosts([...posts, ...data]);
    setPostsPage(postsPage + 1);
  }

  const refreshFunc = useCallback(() => {
    setRefreshing(true);
    getPostsFunc(1).then((res) => {
      setPosts([...res, ...posts]);
    });
    setRefreshing(isLoading);
  }, [isLoading]);

  const uniquePosts: Array<UserPostProps> = Array.from(
    crossCheckedPosts(posts)
      .reduce((map, obj) => map.set(obj._id, obj), new Map())
      .values()
  );

  useEffect(() => {
    getPostsFunc(1).then((data) => {
      setPosts([...data]);
      setPostsPage(2);
    });
  }, [query]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.color_1 }}>
      {isLoading ? (
        <View style={[_styles.all_center, _styles.flex_1]}>
          <ActivityIndicator size={50} color={colors.color_2} />
        </View>
      ) : (
        <FlatList
          refreshing={refreshing}
          onRefresh={refreshFunc}
          data={uniquePosts}
          contentContainerStyle={{
            gap: 15,
          }}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <PostView item={item} display_type="feed" />
          )}
          ListFooterComponent={isLoading ? <ListLoader /> : <View />}
          onEndReached={() => {
            if (isDataAvailable == true && !isLoading && !isError) {
              getPostsFunc(postsPage).then(setNextPage);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
