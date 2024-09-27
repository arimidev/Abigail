import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { MainContainer } from "../../components/MainContainer";
import colors from "../../utils/colors";
import { showToast } from "../../functions";
import spacing from "../../utils/spacing";
import _styles from "../../utils/_styles";
import {
  useGetNotificationsMutation,
  useQueryNotificationsQuery,
} from "../../redux_utils/api_slice";
import { useDispatch } from "react-redux";
import { add_post } from "../../redux_utils/features/seen_posts";
import { useCrossCheckPosts } from "../../hooks/useCrossCheckPosts";
import { ListLoader } from "../../components/loadingDisplay/ListLoader";
import { FullPageError } from "../../components/errorDisplay/FullPageError";
import { NotificationComp } from "../../components/NotificationComp";

export const Notifications = () => {
  // api hooks
  const [getNotifications, { isLoading, isError }] =
    useGetNotificationsMutation();
  const {
    isLoading: queryLoading,
    isError: quueryErr,
    refetch: queryRefetch,
    data: queryData,
  } = useQueryNotificationsQuery(null);

  const [notifications, setNotifications] = useState<Array<NotificationProps>>(
    []
  );
  const [isDataAvailable, setDataAvailable] = useState(true);
  const [notifPage, setNotifPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  // hooks
  const { crossCheckedPosts } = useCrossCheckPosts();
  const dispatch = useDispatch();

  // functions

  async function getNotifFunc(page) {
    try {
      const res = await getNotifications({ page, limit: 10 }).unwrap();
      res.results.map((item) => {
        dispatch(add_post(item));
      });
      setDataAvailable(res.results.length > 0 && res.totalPages > notifPage);
      return res.results;
    } catch (error) {
      showToast({
        description: "Something went wrong",
        duration: 3000,
        type: "error",
      });
    }
  }

  function setNextPage(data) {
    setNotifications([...notifications, ...data]);
    setNotifPage(notifPage + 1);
  }

  const refreshFunc = useCallback(() => {
    setRefreshing(true);
    getNotifFunc(1).then((res) => {
      setNotifications([...res, ...notifications]);
    });
    setRefreshing(isLoading);
  }, [isLoading]);

  const uniqueNotifications: Array<NotificationProps> = Array.from(
    crossCheckedPosts(notifications)
      .reduce((map, obj) => map.set(obj._id, obj), new Map())
      .values()
  );

  useEffect(() => {
    // getNotifFunc(notifPage).then(setNextPage);
    if (queryData) {
      queryData.results.map((item) => {
        dispatch(add_post(item));
      });
      setNotifications([...queryData.results, ...notifications]);
    }
  }, [queryData]);

  if (quueryErr) {
    return <FullPageError />;
  }
  return (
    <MainContainer translucent={false} statusbar_background={colors.color_1}>
      <View style={{ flex: 1, backgroundColor: colors.color_1 }}>
        {queryLoading ? (
          <View style={[_styles.all_center, { flex: 1 }]}>
            <ActivityIndicator size={50} color={colors.color_2} />
          </View>
        ) : (
          <FlatList
            refreshing={refreshing}
            onRefresh={refreshFunc}
            data={uniqueNotifications}
            contentContainerStyle={{
              // paddingHorizontal: spacing.padding_horizontal,
              paddingVertical: 20,
              gap: 10,
            }}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <NotificationComp
                item={item}
                index={index}
                data={uniqueNotifications}
              />
            )}
            ListFooterComponent={isLoading ? <ListLoader /> : <View />}
            onEndReached={() => {
              if (isDataAvailable == true && !isLoading && !isError) {
                getNotifFunc(notifPage).then(setNextPage);
              }
            }}
          />
        )}
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({});
