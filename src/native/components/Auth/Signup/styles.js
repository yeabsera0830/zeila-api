import { Dimensions } from 'react-native';
import colors from '../../../values/colors';

const WINDOW_SIZE = Dimensions.get('window');
const MINIMAL_SPACE = 10;
const PADDING_TOP_RATIO = 0.25;
const PADDING_BOTTOM_RATIO = 0.15;
const PADDING_HORIZONTAL_RATIO = 0.1;
const FONT_SIZE = 20;
const INPUT_PADDING_HORIZONTAL = 30;
const INPUT_PADDING_VERTICAL = 10;
const INPUT_BORDER_RADIUS = 50;
const BUTTON_WIDTH_RATIO = 0.4;
const BUTTON_BORDER_RADIUS = 30;
const signupButton = {
    borderRadius: BUTTON_BORDER_RADIUS,
    width: BUTTON_WIDTH_RATIO * WINDOW_SIZE.width,
    paddingVertical: MINIMAL_SPACE
};

export default styles = {
    container: {
        flex: 1,
        backgroundColor: colors.theme.MAIN,
        paddingTop: PADDING_TOP_RATIO * WINDOW_SIZE.height,
        paddingBottom: PADDING_BOTTOM_RATIO * WINDOW_SIZE.height,
        paddingHorizontal: PADDING_HORIZONTAL_RATIO * WINDOW_SIZE.width,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    signupWithFbButton: {
        backgroundColor: colors.facebook.PRIMARY,
        paddingHorizontal: MINIMAL_SPACE
    },
    fbIcon: {
        color: colors.facebook.SECONDARY
    },
    fbButtonText: {
        marginLeft: MINIMAL_SPACE
    },
    signupWithFbText: {
        color: colors.facebook.SECONDARY
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
    signupButton: {
        ...signupButton,
        backgroundColor: colors.theme.LIGHT
    },
    signupButtonDisabled: {
        ...signupButton,
        backgroundColor: colors.button.disabledBackground
    },
    signupButtonText: {
        color: colors.theme.MAIN_DARK,
        fontSize: FONT_SIZE,
        textAlign: 'center'
    },
    signupButtonActivityIndicator: {
        color: colors.theme.MAIN_DARK
    },
    termsOfServiceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    checkBoxContainerStyle: {
        padding: 0,
        margin: 0
    },
    termsOfServiceCheckboxColor: colors.theme.MAIN_DARK,
    acceptLegalConditionsText: {
        color: colors.theme.LIGHT,
        flexShrink: 1
    },
    legalConditionsButtonText: {
        textDecorationLine: 'underline'
    }
};