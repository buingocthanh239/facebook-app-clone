export interface IGetRequestedFriends {
  index: string;
  count: string;
}
export interface IGetUserFriends {
  index: string;
  count: string;
  user_id: string;
}
export interface ISetAcceptFriend {
  user_id: string;
  is_accept: string;
}

export interface IRequestedFriends {
  id: string;
  username: string;
  avatar: string;
  same_friends: string;
  created: string;
}

export interface IUserFriends {
  id: string;
  username: string;
  avatar: string;
  same_friends: string;
  created: string;
}
