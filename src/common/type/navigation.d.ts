/* eslint-disable no-unused-vars */
type AppNavigationType = {
  AuthNavigation: undefined;
};

type AuthNavigationType = {
  HomeAuth: undefined;
  Login: undefined;
  NameScreen: undefined;
  BirthdayScreen: { firstname: string; lastname: string };
  GenderScreen: { firstname: string; lastname: string; dob: Date };
  EmailScreen: { firstname: string; lastname: string; dob: Date; gender: Gender };
  PasswordScreen: { firstname: string; lastname: string; dob: Date; gender: Gender; email: string };
  ConfirmPolicyScreen: {
    firstname: string;
    lastname: string;
    dob: Date;
    gender: Gender;
    email: string;
    password: string;
  };
  VerifyOTPScreen: undefined;
  SaveInfoAccountScreen: undefined;
};
