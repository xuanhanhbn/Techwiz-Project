import * as yup from 'yup';

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

export const loginSchema = yup.object({
  username: yup.string().matches(
    /^\s*[^\W_]{0,40}\s*$/,
    'Tên đăng nhập chỉ chứa chữ và số'
  )
    .max(40, 'Tên đăng nhập không quá 40 kí tự')
    .required('Vui lòng nhập tên đăng nhập'),
  password: yup.string()
  .required('Vui lòng nhập mật khẩu')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/,
    'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 kí tự đặc biệt'
  )
    .min(8, 'Mật khẩu tối thiểu 8 kí tự ')
    .max(32, 'Mật khẩu tối đa 32 kí tự'),
});

export const confirmEmailSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^[a-z0-9]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z])?$/,
      'Email không đúng định dạng'
    )
    .required('Vui lòng nhập email'),
});

export const confirmCodeSchema = yup.object({
  token: yup
    .string()
    .required('Vui lòng nhập mã xác nhận')
    .max(50, 'Mã xác nhận tối đa 50 kí tự'),
});

export const resetPasswordSchema = yup.object({
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
    .required('Vui lòng nhập lại mật khẩu')
    .oneOf([yup.ref('newPassword'), null], 'Nhập lại mật khẩu không đúng. Vui lòng nhập lại'),
});
