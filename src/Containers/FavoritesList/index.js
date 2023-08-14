import { useTheme } from "@/Hooks";
import { Input } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import IconIonic from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
// import {
//   listProductActions,
//   makeSelectListProduct,
// } from "../ListProduct/listProductSlice";
import { useFocusEffect } from "@react-navigation/native";
import { getApi, postApi } from "./api";
// import { getApiProvider } from "../ListProduct/api";
import {
  listProductActions,
  makeSelectListProduct,
} from "../ListProduct/listProductSlice";
import { getApiProvider } from "../ListProduct/api";
import DisplayTypeMenu from "./DisplayTypeMenu";
import { favoritesActions, makeSelectFavorites } from "./favoritesSlice";

function FavoritesList() {
  const { Layout, Colors, Gutters, FontSizeResponsive } = useTheme();
  const dispatch = useDispatch();

  const getDataFavoritesList = useSelector(makeSelectFavorites);
  const currentData = getDataFavoritesList?.dataFavorites?.productId;

  const isLoading = getDataFavoritesList?.isLoading;
  const flatListRef = useRef(null);

  const baseDataRequest = {
    name: "",
    page: 1,
    limit: 8,
  };

  const [dataRequest, setDataRequest] = useState(baseDataRequest);
  // const [currentData, setCurrentData] = useState([]);

  // useEffect(() => {
  //   if (dataProvinder) {
  //     setCurrentData(dataProvinder?.data);
  //   }
  // }, [dataProvinder]);
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = (data) => {
    dispatch(favoritesActions.getListFavorites());
  };

  const handleGetData = async (data) => {
    try {
      const { page, limit, name } = data;
      const url = `/provider/get?page=${page}&limit=${limit}&name=${name}`;
      const res = await getApiProvider(url, data);
      if (res && res.status === 200) {
        setDataRequest(data);
        // setCurrentData(res.data.data);
      }
    } catch (error) {
      return handleShowToast("Error");
    }
  };

  const handleRefreshData = () => {
    handleSearch({ ...dataRequest, limit: 8 });
    setDataRequest({ ...dataRequest, limit: 8 });
  };

  const handleLoadMoreData = () => {
    const newDataRequest = {
      ...dataRequest,
      limit: dataRequest.limit + 8,
    };
    handleGetData(newDataRequest);
  };

  const handleUpdateDataRequest = (data, config) => {
    if (config.field === "name") {
      const newDataRequest = {
        ...dataRequest,
        name: data,
      };
      return setDataRequest(newDataRequest);
    }
    const newDataRequest = {
      ...dataRequest,
      name: "",
    };
    return setDataRequest(newDataRequest);
  };

  const handleSearchData = (config) => {
    const newDataRequest = {
      ...dataRequest,
    };
    handleGetData(newDataRequest);
  };

  const getRightIcon = () => {
    return (
      <IconIonic
        name="search"
        size={18}
        color={Colors.white}
        style={[Gutters.regularRMargin]}
      />
    );
  };
  return (
    <View style={[Layout.fill]}>
      {/* INPUT */}
      {/* <View style={[Gutters.regularVMargin, { justifyContent: "center" }]}>
        <Input
          style={[FontSizeResponsive.textSmall, { color: Colors.white }]}
          placeholder="Look Provinder"
          placeholderTextColor={Colors.white}
          value={dataRequest.name}
          onChangeText={(value) =>
            handleUpdateDataRequest(value, { field: "name" })
          }
          onEndEditing={() => handleSearchData({ field: "name" })}
          h={50}
          InputRightElement={getRightIcon()}
          backgroundColor={Colors.inputBackground}
        />
      </View> */}
      <DisplayTypeMenu
        ref={flatListRef}
        isLoading={isLoading}
        onLoadMoreData={handleLoadMoreData}
        handleRefresh={() => handleRefreshData()}
        value={currentData || []}
      />
    </View>
  );
}

export default FavoritesList;
