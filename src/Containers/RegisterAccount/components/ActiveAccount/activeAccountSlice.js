import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  errorMessage: '',
  isSuccess: false,
  isError: false,
  dataActiveAccount: [],
  dataReActiveAccount: [],

  dataError: {},
}
const activeAccount = createSlice({
  name: 'active',
  initialState,
  reducers: {
    activeAccount(state) {
      state.isLoading = true
    },
    activeAccountFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    activeAccountSuccess(state, action) {
      state.isLoading = false
      state.dataActiveAccount = action.payload || []
      state.isSuccess = true
    },

    reActiveAccount(state) {
      state.isLoading = true
    },
    reActiveAccountFailed(state, action) {
      state.isLoading = false
      state.isError = true
      state.dataError = action.payload || {}
      state.errorMessage = ''
    },
    reActiveAccountSuccess(state, action) {
      state.isLoading = false
      state.dataReActiveAccount = action.payload || []
      // state.isSuccess = true;
    },

    clear(state) {
      // state.errorMessage = "";
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
    },
  },
})

export const activeAccountActions = activeAccount.actions

export const makeSelectLayout = state => state.activeAccount

export default activeAccount.reducer
