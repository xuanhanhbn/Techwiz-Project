import { useTheme } from "@/Hooks";
import { Input } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import IconIonic from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductActions,
  makeSelectListProduct,
} from "../ListProduct/listProductSlice";
import { useFocusEffect } from "@react-navigation/native";
import { getApi, postApi } from "./api";
import ViewTypeGrid from "./components/ViewTypeGrid";
import { getApiProvider } from "../ListProduct/api";

function ListProvinder() {
  const { Layout, Colors, Gutters, FontSizeResponsive } = useTheme();
  const dispatch = useDispatch();
  const getDataProvinder = useSelector(makeSelectListProduct);
  const dataProvinder = getDataProvinder?.dataProvinder || [];
  const isLoading = getDataProvinder?.isLoading;
  const flatListRef = useRef(null);

  const baseDataRequest = {
    name: "",
    page: 0,
    limit: 8,
  };

  const [dataRequest, setDataRequest] = useState(baseDataRequest);
  const [currentData, setCurrentData] = useState([]);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log("focus: ");
  //   }, [])
  // );
  useEffect(() => {
    if (dataProvinder) {
      setCurrentData(dataProvinder?.data);
    }
  }, [dataProvinder]);

  const handleSearch = (data) => {
    dispatch(listProductActions.getListProvinder(data));
  };

  const handleGetData = async (data) => {
    try {
      const { page, limit, name } = data;
      const url = `/provider/get?limit=${limit}`;
      const res = await getApiProvider(url, data);
      if (res && res.status === 200) {
        setDataRequest(data);
        setCurrentData(res.data.data);
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
    if (config.field === "filter") {
      const newDataRequest = {
        ...dataRequest,
        filter: data,
      };
      return setDataRequest(newDataRequest);
    }
    const newDataRequest = {
      ...dataRequest,
      filter: "",
    };
    return setDataRequest(newDataRequest);
  };

  const handleSearchData = (config) => {
    console.log("config: ", config);
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
      <View style={[Gutters.regularVMargin, { justifyContent: "center" }]}>
        <Input
          style={[FontSizeResponsive.textSmall, { color: Colors.white }]}
          placeholder="Look Provinder"
          placeholderTextColor={Colors.white}
          value={dataRequest.filter}
          onChangeText={(value) =>
            handleUpdateDataRequest(value, { field: "filter" })
          }
          onEndEditing={() => handleSearchData({ field: "filter" })}
          h={50}
          InputRightElement={getRightIcon()}
          backgroundColor={Colors.inputBackground}
        />
      </View>
      <ViewTypeGrid
        ref={flatListRef}
        isLoading={isLoading}
        onLoadMoreData={handleLoadMoreData}
        handleRefresh={() => handleRefreshData()}
        value={currentData || []}
      />
    </View>
  );
}

export default ListProvinder;
