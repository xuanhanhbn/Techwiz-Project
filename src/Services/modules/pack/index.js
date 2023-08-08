import { api } from '@/Services/api';
import fetchPack from './fetchPack';

export const packApi = api.injectEndpoints({
    endpoints: (build) => ({
      fetchPack: fetchPack(build),
    }),
    overrideExisting: true,
  })
  
  export const { useFetchPackQuery } = packApi;
  