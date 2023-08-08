import { apiShare } from "@/Services/api";
import {
  getProductType,
  getDistrict,
  getSubDistrict,
  getProvince,
} from "./FetchSearch";

export const SearchApi = apiShare.injectEndpoints({
  endpoints: (build) => ({
    getProductType: getProductType(build),
    getProvince: getProvince(build),
    getDistrict: getDistrict(build),
    getSubDistrict: getSubDistrict(build),
  }),
  overrideExisting: true,
});

export const {
  useGetProductTypeQuery,
  useGetProvinceQuery,
  useGetDistrictQuery,
  useGetSubDistrictQuery,
} = SearchApi;
