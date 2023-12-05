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
  VerifyOTPScreen: { verifyCode: string; email: string };
  SaveInfoAccountScreen: undefined;
};

type PropfileNavigationType = {
  Profile: undefined;
  EditProfile: undefined;
};

type SettingNavigationType = {
  SettingScreen: undefined;
  SettingInfo: undefined;
  BlockFriendScreen: undefined;
  SettingNotification: undefined;
  SettingPassword: undefined;
  SettingPushNotification: undefined;
  SettingSecurityLogin: undefined;
  SettingInfoName: undefined;
};

type FriendNavigationType = {
  FriendTab: undefined;
  SuggestionsScreen: undefined;
  AllFriendScreen: undefined;
};
type CreatePostNavigationType = {
  CreatePostScreen: undefined;
  EnAScreen: undefined;
};
