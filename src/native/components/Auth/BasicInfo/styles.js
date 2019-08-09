import { Dimensions } from 'react-native';
import colors from '../../../values/colors';

const WINDOW_SIZE = Dimensions.get('window');
const MINIMAL_SPACE = 10;
const PADDING_HORIZONTAL_RATIO = 0.1;
const PADDING_TOP_RATIO = 0.15;
const PADDING_BOTTOM_RATIO = 0.35;
const BORDER_RADIUS_ROUND = 500;
const BORDER_WIDTH = 3;
const IMAGE_SIZE = 150;
const CAMERA_ICON_SIZE = 50;
const OVERLAY_ICONS_SIZE = 35;
const TRANSLUCENT_OPACITY = 0.5;
const FONT_SIZE = 20;
const INPUT_PADDING_HORIZONTAL = 30;
const button = {
    borderRadius: BORDER_RADIUS_ROUND,
    padding: MINIMAL_SPACE
};

export default styles = {
    container: {
        flex: 1,
        backgroundColor: colors.theme.MAIN,
        paddingHorizontal: PADDING_HORIZONTAL_RATIO * WINDOW_SIZE.width,
        paddingTop: PADDING_TOP_RATIO * WINDOW_SIZE.height,
        paddingBottom: PADDING_BOTTOM_RATIO * WINDOW_SIZE.height,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pictureContainer: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        borderWidth: BORDER_WIDTH,
        borderColor: colors.theme.MAIN_SLIGHTLY_DARK,
        borderRadius: BORDER_RADIUS_ROUND
    },
    profilePicture: {
        width: '100%',
        height: '100%',
        borderRadius: IMAGE_SIZE / 2
    },
    translucent: {
        zIndex: 1,
        backgroundColor: colors.theme.DARK,
        position: 'absolute',
        opacity: TRANSLUCENT_OPACITY,
        height: '100%',
        width: '100%',
        borderRadius: BORDER_RADIUS_ROUND
    },
    uploadPhotoContainer: {
        zIndex: 2,
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    uploadPhotoIcon: {
        color: colors.theme.LIGHT,
        fontSize: CAMERA_ICON_SIZE
    },
    overlayContainer: {
        flexDirection: 'row'
    },
    overlayIconContainer: {
        margin: MINIMAL_SPACE,
        alignItems: 'center'
    },
    overlayIcon: {
        color: colors.theme.MAIN_DARK,
        fontSize: OVERLAY_ICONS_SIZE
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: colors.theme.MAIN_SLIGHTLY_DARK,
        paddingHorizontal: INPUT_PADDING_HORIZONTAL,
        paddingVertical: MINIMAL_SPACE,
        borderRadius: MINIMAL_SPACE
    },
    input: {
        flex: 1,
        fontSize: FONT_SIZE,
        color: colors.input.MAIN
    },
    inputPlaceholderTextColor: colors.input.PLACEHOLDER_LIGHT,
    button: {
        ...button,
        backgroundColor: colors.theme.LIGHT
    },
    buttonDisabled: {
        ...button,
        backgroundColor: colors.button.disabledBackground
    },
    buttonText: {
        color: colors.theme.MAIN_DARK,
        fontSize: FONT_SIZE
    },
    buttonActivityIndicator: {
        color: colors.theme.MAIN_DARK
    }
};