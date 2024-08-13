import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useRef, useState } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import { useSelector } from "react-redux";
import { select_user } from "../redux_utils/features/user";

const MenuPress = React.createContext<{
  showMenu: (val: {
    type: "post" | "product" | "comment" | "user" | "repost";
    user?: UserProps;
    appUser?: UserProps;
    item: UserPostProps | CommentProps | ProductProps;
  }) => void;
  menuArray: Array<{ id: string; name: string }>;
  onPressItem: (val: { id: string; name: string }) => void;
  sheetRef: any;
  sheetOpen: boolean;
  setSheetOpen: any;
}>({
  showMenu: undefined,
  menuArray: [],
  onPressItem: undefined,
  sheetRef: undefined,
  sheetOpen: undefined,
  setSheetOpen: undefined,
});

const MenuPressContext = ({ children }: { children: JSX.Element }) => {
  const User: UserProps = useSelector(select_user);
  const sheetRef = useRef<BottomSheet>();
  const [menuArray, setMenuArray] = useState([]);
  const [document, setDocument] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(undefined);

  const showMenu = ({
    type = "post",
    appUser = User,
    user,
    item,
  }: {
    type: "post" | "product" | "comment" | "user" | "repost";
    appUser?: UserProps;
    user: UserProps;
    item: UserPostProps | ProductProps | CommentProps;
  }) => {
    if (user) {
      setDocument(user);
    } else {
      setDocument(item);
    }

    const isUser = () => {
      return item?.owner._id == appUser?._id || user?._id == appUser?._id;
    };
    const menuList = {
      post: [
        !isUser() && { id: "share", name: "Share" },
        !isUser() && { id: "follow", name: `Follow @${item.owner.username}` },
        { id: "hide_post", name: "I don't want to see this" },
        !isUser() && { id: "message", name: `Message @${item.owner.username}` },
        !isUser() && { id: "block", name: `Block @${item.owner.username}` },
        !isUser() && { id: "report_post", name: `Report` },
        isUser() && { id: "delete", name: "Delete" },
        isUser() && { id: "edit", name: "Edit" },
      ].filter((option) => option !== false && option !== null),
      comment: [
        !isUser() && { id: "follow", name: `Follow @${item.owner.username}` },
        !isUser() && { id: "message", name: `Message @${item.owner.username}` },
        !isUser() && { id: "block", name: `Block @${item.owner.username}` },
        !isUser() && { id: "report_comment", name: "Report" },
        isUser() && { id: "delete", name: "Delete" },
      ].filter((option) => option !== false && option !== null),
      user: [
        { id: "share_profile", name: "Share profile" },
        !isUser() && {
          id: "message_user",
          name: `Message @${item.owner.username}`,
        },
        !isUser() && {
          id: "block_user",
          name: `Block @${item.owner.username}`,
        },
        !isUser() && { id: "report_user", name: "Report" },
        isUser() && { id: "settings", name: "Settings" },
      ].filter((option) => option !== false && option !== null),
    };

    if (
      item.type == "post" ||
      item.type == "product" ||
      item.type == "repost"
    ) {
      setMenuArray(menuList.post);
      sheetRef.current?.expand();
      setSheetOpen(true);
      return;
    }
    if (item.type == "comment") {
      setMenuArray(menuList.comment);
      sheetRef.current?.expand();
      setSheetOpen(true);
      return;
    }
    if (type == "user" && user) {
      setMenuArray(menuList.user);
      sheetRef.current?.expand();
      setSheetOpen(true);
      return;
    }
  };

  const onPressItem = (item: { id: string; name: string }) => {
    // something here
    sheetRef.current?.close();
    console.log(item);
  };

  return (
    <MenuPress.Provider
      value={{
        showMenu,
        sheetRef,
        menuArray,
        onPressItem,
        setSheetOpen,
        sheetOpen,
      }}
    >
      {children}
    </MenuPress.Provider>
  );
};

export { MenuPressContext };

export const useMenuPressContext = () => useContext(MenuPress);
