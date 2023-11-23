import VideoPlayer, { VideoPlayerProps } from 'react-native-video-player';
export type BaseVideoProps = VideoPlayerProps;
const defaultProps: Partial<BaseVideoProps> = {
  videoHeight: 900,
  videoWidth: 1600,
  autoplay: true,
  showDuration: true,
  defaultMuted: true,
  disableFullscreen: false,
  pauseOnPress: true,
  resizeMode: 'contain'
};
function BaseVideo(props: VideoPlayerProps) {
  const { video, thumbnail, ...propsRemain } = props;
  return video ? <VideoPlayer {...propsRemain} video={video} thumbnail={thumbnail} /> : null;
}
BaseVideo.defaultProps = defaultProps;
export default BaseVideo;
