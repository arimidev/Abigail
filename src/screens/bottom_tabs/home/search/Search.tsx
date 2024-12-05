import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useCallback, useState } from "react";
import colors from "../../../../utils/colors";
import _styles from "../../../../utils/_styles";
import { IonIcons } from "../../../../components/icons/IonIcons";
import spacing from "../../../../utils/spacing";
import { SearchBox } from "../../../../components/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSearches,
  updateSearches,
} from "../../../../redux_utils/features/savedSearches";
import { MainContainer } from "../../../../components/MainContainer";

// const dummyData = ["React native", "Normani"];
const dummyData2 = [
  "Hawk Tuah",
  "Baddie",
  "Jorja smith",
  "iphone 11",
  "Shoulder bag",
  "Vikings",
  "Chuks okereke",
];

const SearchItem = ({ item, index, onPress }) => {
  return (
    <Pressable style={[_styles.flex_row, styles.recentItem]} onPress={onPress}>
      <IonIcons name="search-outline" size={17} color={colors.color_6} />
      <Text style={[_styles.font_12_semi_bold, { color: colors.color_6 }]}>
        {item}
      </Text>
    </Pressable>
  );
};

export const Search = ({ navigation }) => {
  const [textInput, setInput] = useState("");

  const searchArr: Array<string> = useSelector(selectSearches);
  const dispatch = useDispatch();

  const searchItem = useCallback(
    (str: string) => {
      setInput(str);
      if (str == "" || str == null) {
        return;
      }
      dispatch(updateSearches(str));
      navigation.navigate("main-search", { passedData: str });
    },
    [textInput]
  );

  return (
    <MainContainer>
      <View style={{ flex: 1, backgroundColor: colors.color_1 }}>
        <SearchBox
          onChangeText={setInput}
          onSubmit={() => searchItem(textInput)}
          placeholder="Wetin you dey find?"
        />
        {searchArr.length > 0 && (
          <View
            style={{
              marginTop: 20,
              paddingHorizontal: spacing.padding_horizontal,
            }}
          >
            <Text
              style={[_styles.font_18_semi_bold, { color: colors.color_6 }]}
            >
              Recent searches
            </Text>
            <View style={[_styles.flex_row, styles.recentItemCont]}>
              {searchArr.slice(0, 7).map((item, index) => (
                <SearchItem
                  item={item}
                  index={index}
                  key={index}
                  onPress={() => searchItem(item)}
                />
              ))}
            </View>
          </View>
        )}
        <View
          style={{
            marginTop: 30,
            paddingHorizontal: spacing.padding_horizontal,
          }}
        >
          <Text style={[_styles.font_18_semi_bold, { color: colors.color_6 }]}>
            Trending
          </Text>
          <View style={[_styles.flex_row, styles.recentItemCont]}>
            {dummyData2.map((item, index) => (
              <SearchItem
                item={item}
                index={index}
                key={index}
                onPress={() => searchItem(item)}
              />
            ))}
          </View>
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  recentItem: {
    gap: 5,
    backgroundColor: colors.color_7,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 9,
    maxWidth: 250,
  },
  recentItemCont: {
    flexWrap: "wrap",
    marginTop: 20,
    gap: 15,
  },
});
