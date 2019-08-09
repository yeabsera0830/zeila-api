import colors from '../../../values/colors';

const MINIMAL_SPACE = 5;
const MODERATE_SPACE = 10;
const LOCATION_BADGE_BORDER_RADIUS = 50;
const iconSize = {
    edit: 30,
    category: 27
};
const fontSize = {
    title: 22,
    popupText: 20,
    badge: 18,
};

export default styles = {
    container: {
        paddingVertical: MODERATE_SPACE
    },
    titleText: {
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: fontSize.title
    },
    editIcon: {
        color: colors.theme.MAIN_SLIGHTLY_DARK,
        fontSize: iconSize.edit
    },
    filtersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    badge: {
        margin: MINIMAL_SPACE,
        paddingHorizontal: MODERATE_SPACE,
        borderRadius: LOCATION_BADGE_BORDER_RADIUS,
        backgroundColor: colors.theme.MAIN_SLIGHTLY_DARK,
        color: colors.theme.LIGHT,
        fontSize: fontSize.badge
    },
    categoryBadge: {
        alignSelf: 'baseline',
        margin: MINIMAL_SPACE,
        paddingHorizontal: MODERATE_SPACE,
        paddingVertical: MINIMAL_SPACE,
        borderRadius: MINIMAL_SPACE,
        backgroundColor: colors.theme.MAIN,
        flexDirection: 'row',
        alignItems: 'center'
    },
    categoryIcon: {
        color: colors.theme.MAIN_DARK,
        fontSize: iconSize.category
    },
    categoryText: {
        color: colors.theme.LIGHT,
        marginLeft: MODERATE_SPACE,
        fontSize: fontSize.popupText
    },
    popupOptionText: {
        fontSize: fontSize.popupText,
        paddingVertical: MINIMAL_SPACE,
        fontWeight: 'normal'
    },
    checkBoxContainerStyle: {
        borderWidth: 0,
        padding: 0,
        margin: 0,
        backgroundColor: 'transparent'
    },
    checkBoxColor: colors.theme.MAIN,
    checkBoxPopupOkButton: {
        color: colors.theme.MAIN,
        fontSize: fontSize.popupText,
        alignSelf: 'center',
        marginVertical: MINIMAL_SPACE,
        fontWeight: 'bold'
    }
};