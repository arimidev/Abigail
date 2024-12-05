import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../../../../utils/colors";
import { useSearchUsersMutation } from "../../../../redux_utils/api_slice";
import { useCrossCheckUsers } from "../../../../hooks/useCrossCheckUsers";
import { useDispatch } from "react-redux";
import { add_user } from "../../../../redux_utils/features/seen_users";
import _styles from "../../../../utils/_styles";
import { ListLoader } from "../../../../components/loadingDisplay/ListLoader";
import { Image } from "expo-image";
import { getImage, getName } from "../../../../functions";
import spacing from "../../../../utils/spacing";
import { PressToPage } from "../../../../components/PressToPage";
// import { SuggestedAccount } from "../../../../components/SuggestedAccounts";

export const AccountsSearch = ({ query }) => {
  const [users, setUsers] = useState([]);
  const [isDataAvailable, setDataAvailable] = useState(true);
  const [searchPage, setSearchPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // api hooks

  const [searchUsers, { isLoading, isError }] = useSearchUsersMutation();

  // hooks
  const { crossCheckedUsers } = useCrossCheckUsers();
  const dispatch = useDispatch();

  // functions

  async function getUsersFunc(page) {
    try {
      const res = await searchUsers({ page, query }).unwrap();
      res.results.map((item) => {
        dispatch(add_user(item));
      });
      setDataAvailable(res.results.length > 0 && res.totalPages > searchPage);
      return res.results;
    } catch (error) {
      // do sum here...
    }
  }

  function setNextPage(data) {
    setUsers([...users, ...data]);
    setSearchPage(searchPage + 1);
  }

  // const refreshFunc = useCallback(() => {
  //   setRefreshing(true);
  //   getPostsFunc(1).then((res) => {
  //     setPosts([...res, ...posts]);
  //   });
  //   setRefreshing(isLoading);
  // }, [isLoading]);

  const uniqueUsers: Array<UserProps> = Array.from(
    crossCheckedUsers(users)
      .reduce((map, obj) => map.set(obj._id, obj), new Map())
      .values()
  );

  useEffect(() => {
    getUsersFunc(1).then((data) => {
      setUsers([...data]);
      setSearchPage(2);
    });
  }, [query]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.color_1,
        paddingHorizontal: spacing.padding_horizontal,
      }}
    >
      {isLoading ? (
        <View style={[_styles.all_center, _styles.flex_1]}>
          <ActivityIndicator size={50} color={colors.color_2} />
        </View>
      ) : (
        <FlatList
          data={uniqueUsers}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            paddingBottom: 50,
            gap: 15,
          }}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <View style={[_styles.flex_row, { gap: 10 }]}>
              <PressToPage user={item}>
                <Image
                  source={getImage({
                    uri: item.image_url,
                    gender: item.gender,
                  })}
                  style={{ height: 45, width: 45, borderRadius: 50 }}
                />
              </PressToPage>

              <View>
                <Text
                  style={[
                    _styles.font_14_semi_bold,
                    { color: colors.color_2, lineHeight: 17 },
                  ]}
                >
                  {getName(item.name)}
                </Text>
                <Text
                  style={[_styles.font_12_medium, { color: colors.color_5 }]}
                >
                  @{item.username}
                </Text>
              </View>
            </View>
          )}
          ListFooterComponent={isLoading ? <ListLoader /> : <View />}
          onEndReached={() => {
            if (isDataAvailable == true && !isLoading && !isError) {
              getUsersFunc(searchPage).then(setNextPage);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
