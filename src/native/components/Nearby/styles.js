import colors from '../../values/colors';

const fontSize = {
    subNavItem: 20,
    subNavItemActive: 22
};
const MINIMAL_SPACE = 10;
const BADGE_BORDER_RADIUS = 20;
const FONT_SIZE = 18;
const LOCATION_BUTTONS_ICON_SIZE = 30;
const SUBNAV_ITEM_OPACITY = 0.4;

export default styles = {
    container: {
        flex: 1
    },
    subNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: MINIMAL_SPACE
    },
    subNavItem: {
        color: colors.theme.MAIN_DARK,
        opacity: SUBNAV_ITEM_OPACITY,
        fontSize: fontSize.subNavItem
    },
    subNavItemActive: {
        color: colors.theme.MAIN_DARK,
        fontSize: fontSize.subNavItemActive,
        fontWeight: 'bold'
    },
    content: {
        flex: 1
    },
    location: {
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginHorizontal: MINIMAL_SPACE
        },
        badge: {
            paddingHorizontal: MINIMAL_SPACE,
            borderRadius: BADGE_BORDER_RADIUS,
            backgroundColor: colors.theme.MAIN,
            color: colors.theme.LIGHT,
            fontSize: FONT_SIZE
        },
        buttonsContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        button: {
            fontSize: LOCATION_BUTTONS_ICON_SIZE,
            color: colors.theme.MAIN,
            marginLeft: MINIMAL_SPACE
        }
    },
    viewPager: {
        width: '100%',
        flex: 1
    },
    viewPagerItem: {
        paddingHorizontal: MINIMAL_SPACE
    }
};