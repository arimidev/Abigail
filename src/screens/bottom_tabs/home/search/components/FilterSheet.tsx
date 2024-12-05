import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { CustomBackdrop } from "../../../../../components/CustomBacdrop";
import { FilterOptions } from "./FilterOptions";
import _styles from "../../../../../utils/_styles";
import colors from "../../../../../utils/colors";

export const FilterSheet = forwardRef(({ data }: { data: Array<any> }, ref) => {
  const [activeOption, setActiveOption] = useState(null);
  const localRef = useRef<BottomSheet>();
  useImperativeHandle(ref, () => ({
    expand: () => localRef.current?.expand(),
    close: () => localRef.current?.close(),
  }));

  // functions

  function handleSelect({ item, index }: { item: any; index: number }) {
    setActiveOption(index);
  }
  return (
    <BottomSheet
      index={-1}
      snapPoints={[300]}
      backdropComponent={CustomBackdrop}
      ref={localRef}
      enablePanDownToClose
    >
      <BottomSheetView style={{ flex: 1, backgroundColor: colors.color_1 }}>
        <BottomSheetScrollView style={{ padding: 20 }}>
          {data ? (
            <View style={[_styles.flex_row, { flexWrap: "wrap", gap: 15 }]}>
              {data.map((item, index) => (
                <FilterOptions
                  key={index}
                  label={item.label}
                  value={item.value}
                  onPress={() => handleSelect({ index, item })}
                  active={activeOption == index}
                />
              ))}
            </View>
          ) : (
            <View style={[_styles.flex_1, _styles.all_center]}>
              <ActivityIndicator color={colors.color_2} size={40} />
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({});
