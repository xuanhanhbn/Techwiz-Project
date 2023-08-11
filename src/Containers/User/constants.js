import * as yup from 'yup';

export const listTitle = [
  { icon: 'home', title: 'Tổng quan tài khoản', type: 'generalAccountModal' },
  { icon: 'user', title: 'Chỉnh sửa hồ sơ', type: 'updateUserModal' },
  { icon: 'lock', title: 'Đổi mật khẩu', type: 'changePasswordModal' },
  // { icon: "log-out", title: "Đăng xuất", type: "logoutModal" },
];

export const listSupport = [
  { icon: 'book-open', title: 'Quy định & Chính sách', type: 'policy' },
  // { icon: "home", title: "Bảng giá dịch vụ", type: "" },
  { icon: 'info', title: 'Về LAAND', type: 'representation' },
];

export const inputDisableAccount = [
  {
    field: 'name',
    label: 'Tên đăng nhập',
  },
  {
    field: 'password',
    label: 'Mật khẩu',
  },
];
// chứa ít nhất 1 kí tự viết hoa
yup.addMethod(yup.string, 'containUpperCase', function (message) {
  return this.matches(/[A-Z]+/, {
    message,
  });
});

// chứa ít nhất 1 kí tự viết thường
yup.addMethod(yup.string, 'containLowerCase', function (message) {
  return this.matches(/[a-z]+/, {
    message,
  });
});

// chứa ít nhất 1 kí tự đặc biệt
yup.addMethod(yup.string, 'containSymbol', function (message) {
  return this.matches(/[\W_]+/, {
    message,
  });
});

// chứa ít nhất 1 số
yup.addMethod(yup.string, 'containNumber', function (message) {
  return this.matches(/\d+/, {
    message,
  });
});

export const updateUserSchema = yup.object({
  displayName: yup
    .string()
    .max(40, 'Tên người dùng không quá 40 kí tự')
    .required('Vui lòng nhập tên người dùng'),
  birthday: yup.string().required('Vui lòng chọn ngày sinh'),
  phoneNumber: yup
    .string()
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/, 'Số điện thoại sai định dạng')
    .required('Vui lòng nhập số điện thoại'),
  email: yup
    .string()
    .matches(
      /^[a-z0-9]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z])?$/,
      'Email sai định dạng',
    )
    .required('Vui lòng nhập Địa chỉ Email'),
});

export const changePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    // .matches(
    //   /^(?=.*\D)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
    //   "Mật khẩu tối thiểu 8 kí tự phải bắt đầu bằng chữ hoa có ít nhất 1 kí tự đặc biệt"
    // )
    .min(8, 'Mật khẩu tối thiểu 8 kí tự ')
    .max(20, 'Mật khẩu tối đa 20 kí tự')
    .required('Vui lòng nhập mật khẩu'),
  newPassword: yup
    .string()
    .containUpperCase('Mật khẩu phải bắt đầu bằng chữ in hoa')
    .containLowerCase('Chứa ít nhất 1 ký tự viết thường')
    .containSymbol('Chứa ít nhất 1 ký tự đặc biệt')
    .containNumber('Chứa ít nhất 1 ký tự số')
    .min(8, 'Mật khẩu tối thiểu 8 kí tự ')
    .max(32, 'Mật khẩu tối đa 32 kí tự')
    .required('Vui lòng nhập mật khẩu mới'),
  confirmNewPassword: yup
    .string()
    .required('Vui lòng xác nhận mật khẩu')
    .oneOf([yup.ref('newPassword'), null], 'Mật khẩu không khớp'),
});
