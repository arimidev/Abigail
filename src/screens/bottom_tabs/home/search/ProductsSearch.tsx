import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import colors from "../../../../utils/colors";
import _styles from "../../../../utils/_styles";
import { IonIcons } from "../../../../components/icons/IonIcons";
import { FilterSheet } from "./components/FilterSheet";
import { FilterOptions } from "./components/FilterOptions";
import { useSearchProductsMutation } from "../../../../redux_utils/api_slice";
import { useDispatch } from "react-redux";
import { useCrossCheckPosts } from "../../../../hooks/useCrossCheckPosts";
import { add_post } from "../../../../redux_utils/features/seen_posts";
import { ProductView } from "../../../../components/posts/ProductView";
import { ListLoader } from "../../../../components/loadingDisplay/ListLoader";
import spacing from "../../../../utils/spacing";

const SectionHeader = ({
  data,
  // setActiveOption,
  // setSubData,
  activeOption,
  filterComp,
  onPressItem,
}: {
  data: Array<any>;
  filterComp: JSX.Element;
  activeOption: number;
  onPressItem: (val: { item: any; index: number }) => void;
  // setSubData: (val: any) => void;
  // setActiveOption: (val: number) => void;
}) => (
  <View style={[_styles.flex_row, { marginTop: 25, marginBottom: 10 }]}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 15, paddingHorizontal: 20 }}
    >
      {data.map((item, index) => (
        <FilterOptions
          active={index == activeOption}
          label={item.label}
          value={item.value}
          onPress={() => {
            // setActiveOption(index);
            // setSubData(item.sub);
            onPressItem({ item, index });
          }}
          key={index}
        />
      ))}
    </ScrollView>
    {filterComp}
  </View>
);

const headerOptions = [
  {
    label: "All",
    value: "all",
    sub: [
      { label: "Smartphones", value: "smartphones" },
      { label: "Laptops", value: "laptops" },
      { label: "Tablets", value: "tablets" },
      { label: "Accessories", value: "accessories" },
    ],
  },
  {
    label: "Electronics",
    value: "electronice",
    sub: [
      { label: "Smartphones", value: "smartphones" },
      { label: "Laptops", value: "laptops" },
      { label: "Tablets", value: "tablets" },
      { label: "Accessories", value: "accessories" },
    ],
  },
  {
    label: "Fashion",
    value: "fashion",
    sub: [
      { label: "Smartphones", value: "smartphones" },
      { label: "Laptops", value: "laptops" },
      { label: "Tablets", value: "tablets" },
      { label: "Accessories", value: "accessories" },
    ],
  },
  {
    label: "Health & Wellness",
    value: "health_and_ellness",
    sub: [
      { label: "Smartphones", value: "smartphones" },
      { label: "Laptops", value: "laptops" },
      { label: "Tablets", value: "tablets" },
      { label: "Accessories", value: "accessories" },
    ],
  },
  {
    label: "Sports & Outdoors",
    value: "sports_and_outdoors",
    sub: [
      { label: "Smartphones", value: "smartphones" },
      { label: "Laptops", value: "laptops" },
      { label: "Tablets", value: "tablets" },
      { label: "Accessories", value: "accessories" },
    ],
  },
];

export const ProductsSearch = ({ query }) => {
  const [activeOption, setActiveOption] = useState(0);
  const sheetRef = useRef();
  const [activeSubData, setSubData] = useState([]);

  const [products, setProducts] = useState([]);
  const [isDataAvailable, setDataAvailable] = useState(true);
  const [productsPage, setProductsPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // api hooks

  const [searchProducts, { isLoading, isError }] = useSearchProductsMutation();

  // hooks
  const { crossCheckedPosts } = useCrossCheckPosts();
  const dispatch = useDispatch();

  // functions

  async function getProductsFunc(page) {
    try {
      const res = await searchProducts({
        page,
        query,
      }).unwrap();
      res.results.map((item) => {
        dispatch(add_post(item));
      });
      setDataAvailable(res.results.length > 0 && res.totalPages > productsPage);
      return res.results;
    } catch (error) {
      // do sum here
    }
  }

  function setNextPage(data) {
    setProducts([...products, ...data]);
    setProductsPage(productsPage + 1);
  }

  const refreshFunc = useCallback(() => {
    setRefreshing(true);
    getProductsFunc(1).then((res) => {
      setProducts([...res, ...products]);
    });
    setRefreshing(isLoading);
  }, [isLoading]);

  const uniqueProducts: Array<ProductProps> = Array.from(
    crossCheckedPosts(products)
      .reduce((map, obj) => map.set(obj._id, obj), new Map())
      .values()
  );

  useEffect(() => {
    getProductsFunc(1).then((data) => {
      setProducts([...data]);
      setProductsPage(2);
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
          data={uniqueProducts}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{
            paddingBottom: 50,
            gap: 15,
          }}
          ListHeaderComponent={
            <SectionHeader
              data={headerOptions}
              activeOption={activeOption}
              onPressItem={(val) => {
                setActiveOption(val.index);
                setSubData(val.item.sub);
                // handle item here
              }}
              filterComp={
                <Pressable
                  style={{ paddingHorizontal: 10, paddingLeft: 15 }}
                  onPress={() => sheetRef.current?.expand()}
                >
                  <IonIcons name="filter-outline" color="#000" size={20} />
                </Pressable>
              }
            />
          }
          numColumns={2}
          renderItem={({ item, index }) => (
            <View style={{ paddingLeft: index % 2 == 0 ? 20 : 0 }}>
              <ProductView display_type="pair" item={item} index={index} />
            </View>
          )}
          ListFooterComponent={isLoading ? <ListLoader /> : <View />}
          onEndReached={() => {
            if (isDataAvailable == true && !isLoading && !isError) {
              getProductsFunc(productsPage).then(setNextPage);
            }
          }}
        />
      )}
      <FilterSheet ref={sheetRef} data={activeSubData} />
    </View>
  );
};

const styles = StyleSheet.create({});
