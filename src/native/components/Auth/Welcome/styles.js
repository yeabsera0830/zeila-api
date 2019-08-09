import { Dimensions } from 'react-native';
import colors from '../../../values/colors';

const WINDOW_SIZE = Dimensions.get('window');
const MINIMAL_SPACE = 10;
const MODERATE_SPACE = 20;
const PADDING_TOP_RATIO = 0.4;
const PADDING_BOTTOM_RATIO = 0.2;
const PADDING_HORIZONTAL_RATIO = 0.15;
const BUTTON_BORDER_RADIUS = 50;
const fontSize = {
    welcomeText: 30,
    normal: 20
};
const button = {
    borderRadius: BUTTON_BORDER_RADIUS,
    paddingVertical: MINIMAL_SPACE,
    paddingHorizontal: MODERATE_SPACE
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
    image: {
        position: 'absolute',
        zIndex: 10,
        top: 50,
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    welcomeText: {
        color: colors.theme.LIGHT,
        fontSize: fontSize.welcomeText,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    createAccountButton: {
        ...button,
        backgroundColor: colors.theme.MAIN_SLIGHTLY_DARK
    },
    buttonText: {
        fontSize: fontSize.normal,
    },
    alreadyAUserText: {
        color: colors.theme.MAIN_DARK,
        textAlign: 'center',
        fontSize: fontSize.normal
    },
    loginButton: {
        ...button,
        backgroundColor: colors.theme.MAIN_DARK
    }
};