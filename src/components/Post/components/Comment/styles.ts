import { StyleSheet } from 'react-native';
import { color } from 'src/common/constants/color';
const styles = StyleSheet.create({
  searchheader: {
    height: 34,
    zIndex: 1
    // marginTop: 0,

    // width: 360,
  },
  searchInput: {
    height: 34,
    zIndex: 0,
    width: 240,
    // paddingLeft: 12,
    // paddingRight:12,
    border: 'none',
    borderRadius: 50

    // marginLeft:0,
  },

  container: {
    justifyContent: 'flex-start',
    margin: 0,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: 'white'
  },

  icon: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center'
  },
  numbericon: {
    fontWeight: '700',
    color: '#000',
    fontSize: 14
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 43
    // paddingTop: 20
  },
  like: {
    // width:18,
    // height:10
    position: 'relative'
  },
  heart: {
    position: 'relative'
  },
  laugh: {
    position: 'relative'
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    color: color.textColor
  },
  bio: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
    marginBottom: 20
  },
  section: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  nearlyall: {
    marginTop: 10
  },

  nearly: {
    marginLeft: 20,
    color: '#050505',
    fontWeight: '700',
    fontSize: 16
  },

  seeall: {
    fontSize: 16,
    marginRight: 20,
    color: '#0064d1'
  },
  button: {
    marginHorizontal: 20,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  coverPhoto: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  avatarWrapper: {
    display: 'flex',
    position: 'absolute',
    top: 150,
    borderRadius: 105,
    borderWidth: 5,
    borderColor: 'white',
    overflow: 'hidden'
  },
  infomation: {
    marginTop: 40
  },
  cameraIconWrapper: {
    position: 'absolute',
    top: 200,
    right: 0
  },
  cameraIcon: {
    padding: 10
  },
  cameraIconAvatar: {
    position: 'relative',
    top: 40,
    left: 70
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20
  },
  closeButtonText: {
    fontSize: 18,
    color: 'black'
  },
  detailsContainer: {
    marginTop: 20,
    marginLeft: 20
  },
  detailLabel: {
    fontSize: 18,
    marginRight: 5,
    marginLeft: 10
  },
  detailText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.textColor
  },
  editPublicButton: {
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#E9F1FE',
    padding: 10,
    borderRadius: 7
  },
  editPublicButtonText: {
    color: color.primary,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  option: {
    paddingVertical: 0
  }
});
export default styles;
