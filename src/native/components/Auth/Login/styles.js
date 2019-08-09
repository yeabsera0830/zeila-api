import { Dimensions } from 'react-native';
import colors from '../../../values/colors';

const WINDOW_SIZE = Dimensions.get('window');
const MINIMAL_SPACE = 10;
const PADDING_VERTICAL_RATIO = 0.25;
const PADDING_HORIZONTAL_RATIO = 0.1;
const BUTTON_WIDTH_RATIO = 0.4;
const BUTTON_BORDER_RADIUS = 30;
const FONT_SIZE = 20;
const INPUT_PADDING_HORIZONTAL = 30;
const INPUT_PADDING_VERTICAL = 10;
const INPUT_BORDER_RADIUS = 50;
const loginButton = {
    borderRadius: BUTTON_BORDER_RADIUS,
    width: BUTTON_WIDTH_RATIO * WINDOW_SIZE.width,
    paddingVertical: MINIMAL_SPACE
};

export default styles = {
    container: {
        flex: 1,
        backgroundColor: colors.theme.MAIN,
        paddingVertical: PADDING_VERTICAL_RATIO * WINDOW_SIZE.height,
        paddingHorizontal: PADDING_HORIZONTAL_RATIO * WINDOW_SIZE.width,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    loginWithFbButton: {
        backgroundColor: colors.facebook.PRIMARY,
        padding: MINIMAL_SPACE
    },
    fbIcon: {
        color: colors.facebook.SECONDARY
    },
    fbButtonText: {
        marginLeft: MINIMAL_SPACE
    },
    orText: {
        color: colors.theme.LIGHT,
        textAlign: 'center',
        fontSize: FONT_SIZE
    },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: colors.theme.MAIN_SLIGHTLY_DARK,
        paddingHorizontal: INPUT_PADDING_HORIZONTAL,
        paddingVertical: INPUT_PADDING_VERTICAL,
        borderRadius: INPUT_BORDER_RADIUS
    },
    input: {
        flex: 1,
        fontSize: FONT_SIZE,
        color: colors.input.MAIN
    },
    inputPlaceholderTextColor: colors.input.PLACEHOLDER_LIGHT,
    forgotPassword: {
        textAlign: 'center',
        color: colors.theme.LIGHT,
        fontSize: FONT_SIZE
    },
    loginButton: {
        ...loginButton,
        backgroundColor: colors.theme.LIGHT
    },
    loginButtonDisabled: {
        ...loginButton,
        backgroundColor: colors.button.disabledBackground
    },
    loginButtonText: {
        color: colors.theme.MAIN_DARK,
        fontSize: FONT_SIZE
    },
    loginButtonActivityIndicator: {
        color: colors.theme.MAIN_DARK
    }
};