/* eslint-disable no-unused-vars */
export enum Gender {
  male = 'male',
  female = 'female',
  other = 'other'
}

export enum NotificationType {
  FIREND_SUGGESTION = 'FIREND_SUGGESTION',
  POST_NOTFICATION = 'POST_NOTFICATION',
  BIRTHDAY = 'BIRTHDAY',
  COMMENT = 'COMMENT',
  VIDEO_AVAILABALE = ' VIDEO_AVAILABALE',
  SECURITY_NOTIFICATION = 'SECURITY_NOTIFICATION'
}

export enum AccountStatus {
  Pending = '-1',
  Inactive = '0',
  Active = '1',
  Banned = '2'
}

export enum CategoryType {
  Posts = 0,
  Friends = 1,
  Videos = 2,
  Notifications = 3,
  Settings = 4
}

export const Costs = {
  reatePost: 10,
  editPost: 10,
  deletePost: 10,
  createMark: 2,
  createFeel: 1
};

export enum DevTokenType {
  Android = 1,
  Ios = 0
}

export enum FeelType {
  Kudos = 1,
  Disappointed = 0
}

export enum MarkType {
  Trust = 1,
  Fake = 0
}

export enum NotificationType {
  FriendRequest = 1,
  FriendAccepted = 2,
  PostAdded = 3,
  PostUpdated = 4,
  PostFelt = 5,
  PostMarked = 6,
  MarkCommented = 7,
  VideoAdded = 8
}

export enum VerifyCodeStatus {
  Inactive = 0,
  Active = 1
}
