import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PostsSearch } from "./PostsSearch";
import { ProductsSearch } from "./ProductsSearch";
import { AccountsSearch } from "./AccountsSearch";
import _styles from "../../../../utils/_styles";
import colors from "../../../../utils/colors";

export const TopTabs = ({ query }: { query: string }) => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: [_styles.font_12_semi_bold],
        tabBarIndicatorStyle: { backgroundColor: colors.color_4 },
        tabBarPressColor: "rgba(0,0,0,0.05)",
        tabBarActiveTintColor: colors.color_4,
        tabBarInactiveTintColor: colors.color_2,
      }}
    >
      <Tab.Screen
        name="post-search"
        // component={PostsSearch}
        options={{ title: "Posts" }}
        initialParams={{ query }}
        children={() => <PostsSearch query={query} />}
      />
      <Tab.Screen
        name="product-search"
        options={{ title: "Products" }}
        initialParams={{ query }}
        children={() => <ProductsSearch query={query} />}
      />
      <Tab.Screen
        name="accounts-search"
        options={{ title: "Accounts" }}
        initialParams={{ query }}
        children={() => <AccountsSearch query={query} />}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});
