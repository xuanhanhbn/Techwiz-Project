import * as yup from "yup";

export const listTitle = [
  { icon: "home", title: "Account Overview", type: "generalAccountModal" },
  { icon: "user", title: "Edit Profile", type: "updateUserModal" },
  { icon: "lock", title: "Change Password.", type: "changePasswordModal" },
  // { icon: "log-out", title: "Đăng xuất", type: "logoutModal" },
];

export const listSupport = [
  // { icon: "book-open", title: "Quy định & Chính sách", type: "policy" },
  // { icon: "home", title: "Bảng giá dịch vụ", type: "" },
  { icon: "info", title: "Contact us", type: "representation" },
];

export const inputDisableAccount = [
  {
    field: "name",
    label: "Email",
  },
  {
    field: "password",
    label: "Password",
  },
];
// chứa ít nhất 1 kí tự viết hoa
yup.addMethod(yup.string, "containUpperCase", function (message) {
  return this.matches(/[A-Z]+/, {
    message,
  });
});

// chứa ít nhất 1 kí tự viết thường
yup.addMethod(yup.string, "containLowerCase", function (message) {
  return this.matches(/[a-z]+/, {
    message,
  });
});

// chứa ít nhất 1 kí tự đặc biệt
yup.addMethod(yup.string, "containSymbol", function (message) {
  return this.matches(/[\W_]+/, {
    message,
  });
});

// chứa ít nhất 1 số
yup.addMethod(yup.string, "containNumber", function (message) {
  return this.matches(/\d+/, {
    message,
  });
});

export const updateUserSchema = yup.object({
  name: yup
    .string()
    .max(40, "Full name not exceeding 40 characters.")
    .required("Please enter your full name"),
  birthday: yup.string().required("Please choose birth day"),
  tel: yup
    .string()
    .matches(/^(84|0[3|5|7|8|9])+([0-9]{8})\b$/, "Invalid phone number")
    .required("Please enter your phone number"),
  address: yup
    .string()
    .max(40, "Adress not exceeding 40 characters.")
    .required("Please enter your Adress"),
  city: yup
    .string()
    .max(40, "City not exceeding 40 characters.")
    .required("Please enter your City"),
  country: yup
    .string()
    .max(40, "Country not exceeding 40 characters.")
    .required("Please enter your Country"),
  email: yup
    .string()
    .matches(
      /^[a-z0-9]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z])?$/,
      "Email sai định dạng"
    )
    .required("Vui lòng nhập Địa chỉ Email"),
});

export const changePasswordSchema = yup.object({
  oldPassword: yup.string().required("Please enter your password"),
  newPassword: yup
    .string()
    .containUpperCase("The password must start with an uppercase letter")
    .containLowerCase("Must contain at least 1 lowercase character")
    .containSymbol("Must contain at least 1 special character")
    .containNumber("Must contain at least 1 digit")
    .min(8, "The password must be at least 8 characters ")
    .max(32, "The password can be up to 32 characters")
    .required("Please enter your new password"),
  confirmPassword: yup
    .string()
    .required("Please enter your password")
    .oneOf(
      [yup.ref("newPassword"), null],
      "The entered password does not match. Please re-enter"
    ),
});
