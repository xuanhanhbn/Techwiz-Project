import {
  NotificationContainer,
  LoginPageContainer,
  RegisterAccountContainer,
  UpdateAccountContainer,
  ActiveAccountContainer,
  SettingContainer,
  ListProductContainer,
  DetailProductContainer,
  ListProvinderContainer,
  ListFavoritesListContainer,
} from "@/Containers";

export default [
  {
    name: "LIST_PRODUCT",
    title: "Home",
    KEY: "LIST_PRODUCT",
    path: "/",
    icon: {
      type: "FEATHER",
      name: "home",
    },
    component: ListProductContainer,
    isShowBottom: true,
  },
  {
    name: "DETAILS_PRODUCT",
    title: "Details Product",
    KEY: "DETAILS_PRODUCT",
    path: "/",
    icon: {
      type: "FEATHER",
      name: "bell",
    },
    component: DetailProductContainer,
    // isShowBottom: true,
  },
  {
    name: "LIST_PROVINDER",
    title: "List Provinder",
    KEY: "LIST_PROVINDER",
    path: "/",
    icon: {
      type: "IONIC",
      name: "newspaper-outline",
    },
    component: ListProvinderContainer,
    isShowBottom: true,
  },
  {
    name: "LIST_FAVORITES",
    title: "List Favorites",
    KEY: "LIST_FAVORITES",
    path: "/",
    icon: {
      type: "FEATHER",
      name: "heart",
    },
    component: ListFavoritesListContainer,
    isShowBottom: true,
  },
  // {
  //   name: "NOTIFICATION",
  //   title: "Thông Báo",
  //   KEY: "NOTIFICATION",
  //   path: "/",
  //   icon: {
  //     type: "FEATHER",
  //     name: "bell",
  //   },
  //   component: NotificationContainer,
  //   isShowBottom: true,
  //   isBadge: true,
  // },
  {
    name: "SETTING",
    title: "Cài đặt",
    key: "SETTING",
    path: "/",
    icon: {
      type: "FEATHER",
      name: "settings",
    },
    component: SettingContainer,
    isShowBottom: true,
  },

  {
    name: "REGISTER_ACCOUNT",
    title: "Đăng kí tài khoản",
    key: "REGISTER",
    path: "/",
    icon: {
      type: "IONIC",
      name: "person-outline",
    },
    component: RegisterAccountContainer,
    // isShowBottom: true,
  },

  {
    name: "UPDATE_INFO_ACCOUNT",
    title: "Cập nhật tài khoản",
    key: "UPDATE",
    path: "/",
    icon: {
      type: "IONIC",
      name: "person-outline",
    },
    component: UpdateAccountContainer,
  },
  {
    name: "ACTIVE_ACCOUNT",
    title: "Kích hoạt tài khoản",
    key: "ACTIVE",
    path: "/",
    icon: {
      type: "IONIC",
      name: "person-outline",
    },
    component: ActiveAccountContainer,
  },

  {
    name: "LOGIN",
    title: "Đăng Nhập",
    key: "LOGIN",
    path: "/",
    icon: {
      type: "FEATHER",
      name: "menu",
    },
    component: LoginPageContainer,
  },
];
