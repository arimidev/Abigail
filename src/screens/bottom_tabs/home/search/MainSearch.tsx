import { StyleSheet, Text, View } from "react-native";
import React, { useCallback, useState } from "react";
import colors from "../../../../utils/colors";
import { SearchBox } from "../../../../components/SearchBox";
import { TopTabs } from "./TopTabs";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import { updateSearches } from "../../../../redux_utils/features/savedSearches";

export const MainSearch = ({ navigation, route }) => {
  const { passedData } = route.params;
  const [textInput, setInput] = useState(passedData);
  const [debounce_value] = useDebounce(textInput, 3000);
  const dispatch = useDispatch();
  const searchItem = useCallback(
    (str: string) => {
      setInput(str);
      if (str == "" || str == null) {
        return;
      }
      // do something here
      dispatch(updateSearches(str));
    },
    [debounce_value]
  );
  return (
    <View style={[{ flex: 1, backgroundColor: colors.color_1 }]}>
      <SearchBox
        onChangeText={setInput}
        onSubmit={() => searchItem(textInput)}
        placeholder="Wetin you dey find?"
        defaultText={passedData}
      />
      <View style={{ flex: 1, paddingTop: 10 }}>
        <TopTabs query={debounce_value} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
