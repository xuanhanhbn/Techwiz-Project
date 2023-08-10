import * as yup from "yup";

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

export const loginSchema = yup.object({
  username: yup.string().required("Please enter your Username/Email"),
  password: yup.string().required("Please enter your Password"),
});

export const confirmEmailSchema = yup.object({
  email: yup
    .string()
    .matches(
      /^[a-z0-9]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z])?$/,
      "Email is valid"
    )
    .required("Please enter your Email"),
});

export const confirmCodeSchema = yup.object({
  token: yup
    .string()
    .required("Please enter your code")
    .max(50, "Code is max 50 characters"),
});

export const resetPasswordSchema = yup.object({
  newPassword: yup
    .string()
    .containUpperCase("The password must start with an uppercase letter")
    .containLowerCase("Must contain at least 1 lowercase character")
    .containSymbol("Must contain at least 1 special character")
    .containNumber("Must contain at least 1 digit")
    .min(8, "The password must be at least 8 characters ")
    .max(32, "The password can be up to 32 characters")
    .required("Please enter your new password"),
  confirmNewPassword: yup
    .string()
    .required("Please enter your password")
    .oneOf(
      [yup.ref("newPassword"), null],
      "The entered password does not match. Please re-enter"
    ),
});
