export interface IVideo {
  videoUri: string;
  thumnail: string;
}

export interface IListItem {
  title: string;
  subtitle?: string;
  iconName?: string;
  onPress?: () => any;
}
