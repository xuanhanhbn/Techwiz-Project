import { api } from "@/Services/api";
import listBDS from "./listBDS";

export const listBDSApi = api.injectEndpoints({
  endpoints: (build) => ({
    listBDS: listBDS(build),
  }),
  overrideExisting: true,
});

export const { useListBDSQuery } = listBDSApi;
