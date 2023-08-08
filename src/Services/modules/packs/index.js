import { apiProduct } from '@/Services/api'
import fetchPack from './fetchPack';

export const packApi = apiProduct.injectEndpoints({
  endpoints: build => ({
    fetchPack: fetchPack(build),
  }),
  overrideExisting: false,
})

export const { useFetchPackQuery } = packApi;
