import colors from '../../../values/colors';

const MINIMAL_SPACE = 10;
const FONT_SIZE = 20;
const EDIT_ICON_SIZE = 30;
const GRID_ICON_SIZE = 60;
const ANIMATED_ICON_TRANSFORM_DEGREE = 3;
const gridIcon = {
    color: colors.theme.MAIN_DARK,
    fontSize: GRID_ICON_SIZE
};

export default styles = {
    container: {
        flex: 1
    },
    titleContainer: {
        margin: MINIMAL_SPACE,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: FONT_SIZE
    },
    editIconsContainer: {
        flexDirection: 'row'
    },
    editIcons: {
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: EDIT_ICON_SIZE,
        marginLeft: MINIMAL_SPACE
    },
    row: {
        flexDirection: 'row',
        marginVertical: MINIMAL_SPACE
    },
    gridIcon: {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        },
        editableContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: MINIMAL_SPACE
        },
        icon: {
            ...gridIcon
        },
        animatedIcon: {
            ...gridIcon,
            transform: [{ rotate: `${ANIMATED_ICON_TRANSFORM_DEGREE} deg` }]
        },
        text: {
            color: colors.theme.MAIN_DARK
        }
    }
};