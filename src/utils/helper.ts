export const getAvatarUri = (uri: string) =>
  uri ? { uri: uri } : require('src/assets/avatar-default.png');
