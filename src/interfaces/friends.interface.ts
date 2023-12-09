export interface IGetRequestedFriends {
  index: string;
  count: string;
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
