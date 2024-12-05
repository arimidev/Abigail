import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "react-native-collapsible-tab-view";
import _styles from "../../utils/_styles";
import { ListLoader } from "../loadingDisplay/ListLoader";

export const PostFlatList = ({
  loading,
  data,
  error,
  onEndReached,
  isDataAvailable = true,
  renderItem,
}: {
  loading: boolean;
  data: Array<UserPostProps>;
  error: boolean;
  onEndReached: () => void;
  isDataAvailable: boolean;
  renderItem: any;
}) => {
  return (
    <Tabs.FlatList
      data={data}
      refreshing={true}
      contentContainerStyle={{ marginTop: 20, paddingBottom: 50 }}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      ListFooterComponent={loading ? <ListLoader /> : <View />}
      onEndReached={() => {
        if (isDataAvailable == true && !loading) {
          onEndReached();
        }
      }}
    />
  );
};

const styles = StyleSheet.create({});
