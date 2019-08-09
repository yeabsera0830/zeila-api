import colors from '../../../values/colors';

const MINIMAL_SPACE = 5;
const MODERATE_SPACE = 10;
const BORDER_RADIUS = 30;
const FONT_SIZE = 20;

export default styles = {
    container: {
        flexDirection: 'row',
        backgroundColor: colors.theme.MAIN,
        padding: MODERATE_SPACE
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: MODERATE_SPACE,
        paddingHorizontal: MODERATE_SPACE,
        paddingVertical: MINIMAL_SPACE,
        borderRadius: BORDER_RADIUS,
        backgroundColor: colors.theme.MAIN_SLIGHTLY_DARK,
    },
    searchIcon: {
        color: colors.input.MAIN,
    },
    searchBarInput: {
        flex: 1,
        paddingLeft: MODERATE_SPACE,
        color: colors.input.MAIN,
        fontSize: FONT_SIZE
    },
    searchBarPlaceholderColor: colors.input.PLACEHOLDER_LIGHT
};