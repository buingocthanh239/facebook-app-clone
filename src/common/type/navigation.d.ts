/* eslint-disable no-unused-vars */
type AppNavigationType = {
  AuthNavigation: { screen: AuthNavigationName };
  TabNavigation: { screen: TabNavigationName };
  SettingNavigation: { screen: SettingNavigationName };
  FriendNavigation: { screen: FriendNavigationName };
  ProfileNavigation:
    | { screen: ProfileNavigationName.Profile; params: { user_id: string } }
    | { screen: ProfileNavigationName.EditProfile };
  PostNavigation: { screen: PostNavigationName };
  SearchNavigation: { screen: SearchNavigationName };
  ReportNavigation: { screen: ReportNavigationName; params: { id: string } };
  ChatNavigation: { screen: ChatNavigationName };
  VerifyOTPAfterLogin: undefined;
  ChangeProfileAfterSign: undefined;
  NotFoundScreen: undefined;
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
  ForgetPasswordScreen: undefined;
};

type PropfileNavigationType = {
  Profile: { user_id: string };
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
  SuggestionsScreen: undefined;
  AllFriendScreen: undefined;
};
type PostNavigationType = {
  CreatePostScreen: { selectedItem: CardData } | undefined;
  EnAScreen: undefined;
};

type TabNavigationType = {
  Home: undefined;
  Video: undefined;
  Friend: undefined;
  Notification: undefined;
  Setting: undefined;
};

type SearchNavigationType = {
  SearchScreen: undefined;
};

type ChatNavigationType = {
  InboxScreen: undefined;
  InboxListScreen: undefined;
};
