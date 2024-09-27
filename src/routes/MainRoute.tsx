import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabRoute from "./TabRoute";
import { ProfileMenu } from "../screens/profile_section/ProfileMenu";
import { PersonalDetails } from "../screens/profile_section/PersonalDetails";
import { PostDetails } from "../screens/general-screens/PostDetails";
import { CommentPage } from "../screens/general-screens/CommentPage";
import { ProductDetails } from "../screens/general-screens/ProductDetails";
import { UserProfilePage } from "../screens/user/UserProfilePage";
import { Search } from "../screens/bottom_tabs/home/search/Search";
import { MainSearch } from "../screens/bottom_tabs/home/search/MainSearch";

const MainRoute = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen component={TabRoute} name="tab_route" />
      <Stack.Group>
        <Stack.Screen
          component={ProfileMenu}
          name="profile_menu"
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          component={PersonalDetails}
          name="personal_details"
          options={{ animation: "slide_from_bottom" }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen
          component={PostDetails}
          name="post_details"
          options={{ headerShown: true, title: "Post" }}
        />
        <Stack.Screen
          component={CommentPage}
          name="comment_page"
          options={{ headerShown: true, title: "Comment" }}
        />
        <Stack.Screen
          component={ProductDetails}
          name="product_details"
          options={{ headerShown: true, title: "Product" }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ animation: "slide_from_right" }}>
        <Stack.Screen component={Search} name="search" />
        <Stack.Screen component={MainSearch} name="main-search" />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen component={UserProfilePage} name="UserPage" />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default MainRoute;

const styles = StyleSheet.create({});
